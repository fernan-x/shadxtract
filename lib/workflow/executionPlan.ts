import { AppNode } from '@/ui/types/app-node';
import { ExecutionPlan } from '@/ui/types/execution-plan';
import { Edge } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

type FlowToExecutionPlanResult = {
    executionPlan?: ExecutionPlan;
}
export const flowToExecutionPlan = (nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanResult => {
    const entryPoint = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint);
    if (!entryPoint) {
        throw new Error('No entry point found');
    }

    const executionPlan: ExecutionPlan = [{
        phase: 1,
        nodes: [entryPoint],
    }];

    return { executionPlan };
};