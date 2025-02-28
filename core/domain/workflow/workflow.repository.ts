import { Workflow } from './workflow.entity';

export interface WorkflowRepository {
    getAll(): Promise<Workflow[]>;
    get(id: string): Promise<Workflow | null>;
    create(name: string, definition: string, description?: string): Promise<Workflow>;
    delete(id: string): Promise<void>;
    update(id: string, definition: string): Promise<Workflow>;
}