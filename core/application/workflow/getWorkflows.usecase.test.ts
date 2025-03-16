import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { WorkflowRepositoryInMemory } from '@/infra/repositories/workflow/workflow.repository.in-memory';
import { GetWorkflowsUseCase } from './getWorkflows.usecase';

describe('USECASE: GetWorkflowsUseCase', () => {
    let useCase: GetWorkflowsUseCase;
    let inMemoryRepository: WorkflowRepository;

    beforeEach(() => {
        inMemoryRepository = new WorkflowRepositoryInMemory();
        useCase = new GetWorkflowsUseCase(inMemoryRepository);
    });

    it('should get all workflows', async () => {
        const workflows = await useCase.execute();
        expect(workflows.length).toBe((await inMemoryRepository.getAll()).length);
    });
});