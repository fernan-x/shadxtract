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
  const environment = { phases: {} };

  // Initialize workflow execution
  await initializeWorkflowExecution(executionId, execution.workflowId);

  // Initialize phases
  await initializePhaseStatuses(execution);

  // Execute phases
  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase);
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

const executeWorkflowPhase = async (phase: ExecutionPhase) => {
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  // Update phase status
  await prisma.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;
  console.log(`Executing phase ${phase.name} with ${creditsRequired} credits required`);

  // TODO : decrement user balance

  // Execute phase with simulation
  const success = await executePhase(phase, node);

  await finalizePhase(phase.id, success);

  return { success };
};

const finalizePhase = async (phaseId: string, success: boolean) => {
  const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: { id: phaseId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
    },
  });
}

const executePhase = async (phase: ExecutionPhase, node: AppNode) => {
  const runFc = ExecutorRegistry[node.data.type];
  if (!runFc) {
    return false;
  }

  return await runFc();
}
