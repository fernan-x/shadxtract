import { AppNode, TaskType } from '@/ui/types/app-node';

export const createFlowNode = (nodeType: TaskType, position?: {x: number, y: number}): AppNode => {
    return {
        id: crypto.randomUUID(),
        type: 'ShadXTractNode',
        data: {
            type: nodeType,
            inputs: {},
        },
        position: position || { x: 0, y: 0 },
    }
}