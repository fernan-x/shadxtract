import { Workflow } from '@/core/domain/workflow/workflow.entity';
import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';

export class GetWorkflowByIdUseCase {
    constructor(private readonly repository: WorkflowRepository) {}

    async execute(id: string): Promise<Workflow | null> {
        return this.repository.get(id);
    }
}