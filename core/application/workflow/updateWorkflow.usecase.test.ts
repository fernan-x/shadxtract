import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { UpdateWorkflowUseCase } from './updateWorkflow.usecase';
import { WorkflowRepositoryInMemory } from '@/infra/repositories/workflow/workflow.repository.in-memory';

describe('USECASE: UpdateWorkflowUseCase', () => {
    let useCase: UpdateWorkflowUseCase;
    let inMemoryRepository: WorkflowRepository;

    beforeEach(() => {
        inMemoryRepository = new WorkflowRepositoryInMemory();
        useCase = new UpdateWorkflowUseCase(inMemoryRepository);
    });

    it('should throw error when workflow is not found', async () => {
        await expect(useCase.execute('unknown', 'Test Workflow')).rejects.toThrow('Workflow not found');
    });

    it('should throw error when workflow is not in draft status', async () => {
        await expect(useCase.execute('1', 'Test Workflow')).rejects.toThrow('Cannot update workflow with status other than draft');
    });

    it('should update workflow', async () => {
        await useCase.execute('3', 'Test Workflow');
        const workflow = await inMemoryRepository.get('3');
        expect(workflow?.definition).toBe('Test Workflow');
    });
});