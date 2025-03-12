import { AppNode } from '@/ui/types/app-node';
import { ExecutionPlan, ExecutionPlanPhase } from '@/ui/types/execution-plan';
import { Edge, getIncomers } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

type FlowToExecutionPlanResult = {
    executionPlan?: ExecutionPlan;
}
export const flowToExecutionPlan = (nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanResult => {
    const entryPoint = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint);
    if (!entryPoint) {
        throw new Error('No entry point found');
    }

    const planned = new Set<string>();

    // We always start with the entry point
    const executionPlan: ExecutionPlan = [{
        phase: 1,
        nodes: [entryPoint],
    }];

    planned.add(entryPoint.id);

    // Add the rest of the nodes in the execution plan
    for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
        const nextPhase: ExecutionPlanPhase = { phase, nodes: [] };
        for (const currentNode of nodes) {
            if (planned.has(currentNode.id)) {
                // Node already in the execution plan
                continue;
            }

            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            if (invalidInputs.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every(incomer => planned.has(incomer.id))) {
                    // If all incomers are planned and there still are invalid inputs,
                    // the node has invalid inputs. The workflow is considered invalid.
                    console.error('Invalid inputs', currentNode.id, invalidInputs);
                    throw new Error('TODO: Handle error 1');
                } else {
                    continue;
                }
            }

            nextPhase.nodes.push(currentNode);
        }

        for (const node of nextPhase.nodes) {
            planned.add(node.id);
        }

        executionPlan.push(nextPhase);
    }

    return { executionPlan };
};

const getInvalidInputs = (node: AppNode, edges: Edge[], planned: Set<string>): string[] => {
    const invalidInputs: string[] = [];
    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length > 0;
        if (inputValueProvided) {
            continue;
        }

        // Check if the input is connected to an output of another node
        const incomingEdges = edges.filter(edge => edge.target === node.id);
        const inputLinkedToOutput = incomingEdges.find(edge => edge.targetHandle === input.name);
        const requiredInputProvidedByVisitedOutput = input.required && inputLinkedToOutput && planned.has(inputLinkedToOutput.source);

        if (requiredInputProvidedByVisitedOutput) {
            // Input is required and provided by an output of a planned task
            continue;
        } else if (!input.required) {
            // Make sure that a non required input linked has it's output already planned
            if (!inputLinkedToOutput) continue;
            if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) continue;
        }

        invalidInputs.push(input.name);
    }

    return invalidInputs;
}