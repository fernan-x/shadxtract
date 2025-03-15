'use server';

import { auth } from '@clerk/nextjs/server';
import { ExecutionPlan } from '../types/execution-plan';
import { flowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { getWorkflowByIdUseCase } from '@/providers/workflow.provider';

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
    console.log(executionPlan);
}