import { Workflow } from './workflow.entity';

export interface WorkflowRepository {
    getAll(): Promise<Workflow[]>;
    create(name: string, description?: string): Promise<Workflow>;
    delete(id: string): Promise<void>;
}