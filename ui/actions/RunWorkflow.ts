'use server';

import { auth } from '@clerk/nextjs/server';
import { ExecutionPlan } from '../types/execution-plan';
import { flowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { getWorkflowByIdUseCase } from '@/providers/workflow.provider';
import { prisma } from '@/lib/prisma';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { ExecutionPhaseStatus, WorkflowExecutionStatus, WorkflowExecutionTrigger } from '@/core/domain/workflow/workflow.entity';

export async function runWorkflow(form: { workflowId: string, flowDefinition?: string }) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthenticated');
    }

    const { workflowId, flowDefinition } = form;
    if (!workflowId) {
        throw new Error('Workflow ID is required');
    }

    const workflow = await getWorkflowByIdUseCase.execute(workflowId);

    if (!workflow) {
        throw new Error('Workflow not found');
    }

    let executionPlan: ExecutionPlan;
    if (!flowDefinition) {
        throw new Error('Flow definition is required');
    }

    const flow = JSON.parse(flowDefinition);
    const result = flowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
        throw new Error('Flow definition is invalid');
    }

    if (!result.executionPlan) {
        throw new Error('No execution plan generated');
    }

    executionPlan = result.executionPlan;

    // TODO : Create a usecase
    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.MANUAL,
            phases: {
                create: executionPlan.flatMap(phase => {
                    return phase.nodes.flatMap(node => {
                        return {
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        }
                    })
                })
            },
        },
        select: {
            id: true,
            phases: true,
        }
    });

    if (!execution) {
        throw new Error('Failed to create workflow execution');
    }

    return execution.id;
}