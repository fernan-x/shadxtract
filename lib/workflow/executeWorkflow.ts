import "server-only";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/core/domain/workflow/workflow.entity";
import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "@/ui/types/app-node";
import { TaskRegistry } from "./task/registry";
import { waitFor } from "../helpers/wait-for";
import { ExecutorRegistry } from "./executor/registry";
import { Environment, ExecutionEnvironment } from "@/ui/types/executor";
import { TaskParamType } from "@/ui/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/ui/types/log";
import { createLogCollector } from "../log";

// TODO : Unit test this
export const executeWorkflow = async (executionId: string) => {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: {
      phases: true,
      workflow: true,
    },
  });

  if (!execution) {
    throw new Error("Execution not found");
  }

  // Setup execution environment
  const edges = JSON.parse(execution.definition).edges as Edge[];
  const environment = { phases: {} };

  // Initialize workflow execution
  await initializeWorkflowExecution(executionId, execution.workflowId);

  // Initialize phases
  await initializePhaseStatuses(execution);

  // Execute phases
  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
      execution.userId,
    );

    creditsConsumed += phaseExecution.creditsConsumed;

    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
    // creditsConsumed += phaseExecution.creditsConsumed;
  }

  // Finalize execution
  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed,
  );

  // Clean up execution environment
  await cleanupEnvironment(environment);

  revalidatePath("/workflow/runs");
};

const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
) => {
  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: { id: workflowId },
    data: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
    },
  });
};

const initializePhaseStatuses = async (execution: any) => {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
};

const finalizeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number,
) => {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => null);
};

const executeWorkflowPhase = async (
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[],
  userId: string,
) => {
  const logCollector = createLogCollector();
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  setupEnvironmentForPhase(node, environment, edges);

  // Update phase status
  await prisma.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;

  let success = await decrementCredits(userId, creditsRequired, logCollector);
  const creditsConsumed = success ? creditsRequired : 0;
  if (success) {
    // Execute phase if balance is sufficient
    success = await executePhase(phase, node, environment, logCollector);
  }

  const outputs = environment.phases[node.id].outputs;

  await finalizePhase(
    phase.id,
    success,
    outputs,
    logCollector,
    creditsConsumed,
  );

  return { success, creditsConsumed };
};

const finalizePhase = async (
  phaseId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector,
  creditsConsumed: number,
) => {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: { id: phaseId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      creditsConsumed,
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            logLevel: log.level,
            message: log.message,
            timestamp: log.timestamp,
          })),
        },
      },
    },
  });
};

const executePhase = async (
  phase: ExecutionPhase,
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector,
) => {
  const runFc = ExecutorRegistry[node.data.type];
  if (!runFc) {
    return false;
  }

  const executionEnvironment = createExecutionEnvironment(
    node,
    environment,
    logCollector,
  );

  return await runFc(executionEnvironment);
};

const setupEnvironmentForPhase = (
  node: AppNode,
  environment: Environment,
  edges: Edge[],
) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) continue;
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value from the outputs of the previous node
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name,
    );
    if (!connectedEdge) {
      console.error(
        `[SetupEnvironmentForPhase] No connected edge found for input ${input.name} of node ${node.id}`,
      );
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];
    environment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const createExecutionEnvironment = (
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector,
): ExecutionEnvironment<any> => {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => {
      environment.browser = browser;
    },
    getPage: () => environment.page,
    setPage: (page: Page) => {
      environment.page = page;
    },
    log: logCollector,
  };
};

const cleanupEnvironment = async (environment: Environment) => {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((err) => console.error("Error closing browser", err));
  }
};

const decrementCredits = async (
  userId: string,
  amount: number,
  logCollector: LogCollector,
) => {
  try {
    await prisma.userBalance.update({
      where: { userId, credits: { gte: amount } },
      data: {
        credits: {
          decrement: amount,
        },
      },
    });
    console.info(
      `[DecrementCredits] Decremented ${amount} credits for user ${userId}`,
    );
    return true;
  } catch (error) {
    console.error("[DecrementCredits] Error decrementing credits", error);
    logCollector.error("Insufficient credits");
    return false;
  }
};
