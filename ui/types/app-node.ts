import { Node } from '@xyflow/react';

export enum TaskType {
    LAUNCH_BROWSER = 'LAUNCH_BROWSER',
}

export type AppNodeData = {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: unknown;
}

export type AppNode = Node & {
    data: AppNodeData;
}