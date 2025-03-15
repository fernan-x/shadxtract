import { AppNode, AppNodeInvalidInputs } from '@/ui/types/app-node';
import { ExecutionPlan, ExecutionPlanPhase } from '@/ui/types/execution-plan';
import { Edge } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

export enum FlowToExecutionPlanValidationError {
    NO_ENTRY_POINT = 'NO_ENTRY_POINT',
    INVALID_INPUTS = 'INVALID_INPUTS',
}

type FlowToExecutionPlanResult = {
    executionPlan?: ExecutionPlan;
    error?: {
        type: FlowToExecutionPlanValidationError;
        invalidElements?: AppNodeInvalidInputs[];
    }
}

export const flowToExecutionPlan = (nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanResult => {
    const entryPoint = nodes.find(node => TaskRegistry[node.data.type].isEntryPoint);
    if (!entryPoint) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
            }
        }
    }

    const inputsWithErrors: AppNodeInvalidInputs[] = [];
    const planned = new Set<string>();

    const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
    if (invalidInputs.length > 0) {
        inputsWithErrors.push({
            nodeId: entryPoint.id,
            invalidInputs,
        });
    }

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
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        invalidInputs,
                    });
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

    if (inputsWithErrors.length > 0) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                invalidElements: inputsWithErrors,
            }
        }
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

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]): AppNode[] {
    if (!node.id) {
        return [];
    }
    const incomersIds = new Set();
    edges.forEach(edge => {
        if (edge.target === node.id) {
            incomersIds.add(edge.source);
        }
    });

    return nodes.filter(n => incomersIds.has(n.id));
}