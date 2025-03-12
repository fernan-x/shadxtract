import { Node } from '@xyflow/react';
import { TaskType } from './task';

export type AppNodeData = {
    type: TaskType;
    inputs: Record<string, string>;
    [key: string]: unknown;
}

export type AppNode = Node<AppNodeData>;