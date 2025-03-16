import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { WorkflowRepositoryInMemory } from '@/infra/repositories/workflow/workflow.repository.in-memory';
import { GetWorkflowByIdUseCase } from './getWorkflowById.usecase';

describe('USECASE: GetWorkflowByIdUseCase', () => {
    let useCase: GetWorkflowByIdUseCase;
    let inMemoryRepository: WorkflowRepository;

    beforeEach(() => {
        inMemoryRepository = new WorkflowRepositoryInMemory();
        useCase = new GetWorkflowByIdUseCase(inMemoryRepository);
    });

    it('should get a workflow by id', async () => {
        const workflow = await useCase.execute('1');
        expect(workflow).toBeDefined();
        expect(workflow?.id).toBe('1');
    });
});