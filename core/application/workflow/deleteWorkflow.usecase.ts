import { Workflow } from '@/core/domain/workflow/workflow.entity';
import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';

export class DeleteWorkflowUseCase {
    constructor(private readonly repository: WorkflowRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}