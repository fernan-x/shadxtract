import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { DeleteWorkflowUseCase } from './deleteWorkflow.usecase';
import { WorkflowRepositoryInMemory } from '@/infra/repositories/workflow/workflow.repository.in-memory';

describe('USECASE: DeleteWorkflowUseCase', () => {
    let useCase: DeleteWorkflowUseCase;
    let inMemoryRepository: WorkflowRepository;
    let defaultRepositoryLenght: number;

    beforeEach(async () => {
        inMemoryRepository = new WorkflowRepositoryInMemory();
        useCase = new DeleteWorkflowUseCase(inMemoryRepository);
        defaultRepositoryLenght = (await inMemoryRepository.getAll()).length;
    });

    it('should delete a workflow', async () => {
        const workflowId = '1';
        await inMemoryRepository.delete(workflowId);
        const workflows = await inMemoryRepository.getAll();

        expect(workflows.length).toBe(defaultRepositoryLenght - 1);
        expect(workflows.find(w => w.id === workflowId)).toBeUndefined();
    });
});