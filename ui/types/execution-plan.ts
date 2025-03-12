import { AppNode } from './app-node';

export type ExecutionPlan = {
    phase: number;
    nodes: AppNode[];
}[];