import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';

export class UpdateWorkflowUseCase {
    constructor(private workflowRepository: WorkflowRepository) {};

    async execute(id: string, definition: string): Promise<void> {
        const workflow = await this.workflowRepository.get(id);
        if (!workflow) {
            throw new Error('Workflow not found');
        }

        if (workflow.status !== 'draft') {
            throw new Error('Cannot update workflow with status other than draft');
        }

        await this.workflowRepository.update(id, definition);
    }
}