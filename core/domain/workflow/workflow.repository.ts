import { Workflow } from './workflow.entity';

export interface WorkflowRepository {
    getAll(): Promise<Workflow[]>;
}