import { CreateWorkflowUseCase } from './createWorkflow.usecase';
import { WorkflowRepository } from '@/core/domain/workflow/workflow.repository';
import { WorkflowRepositoryInMemory } from '@/infra/repositories/workflow/workflow.repository.in-memory';
import { generateDefaultDefinition } from '@/lib/workflow/generateDefaultDefinition';

describe('CreateWorkflowUseCase', () => {
    let useCase: CreateWorkflowUseCase;
    let inMemoryRepository: WorkflowRepository;

    beforeEach(() => {
        // Initialize a fresh in-memory repository for each test
        inMemoryRepository = new WorkflowRepositoryInMemory();
        useCase = new CreateWorkflowUseCase(inMemoryRepository);
    });

    it('should create a workflow successfully', async () => {
        // Arrange
        const name = 'Test Workflow';
        const description = 'Test Description';

        // Act
        const result = await useCase.execute(name, description);

        // Assert
        expect(result.name).toBe(name);
        expect(result.description).toBe(description);
        expect(result.definition).toEqual(generateDefaultDefinition());

        // Verify it's actually in the repository
        const stored = await inMemoryRepository.get(result.id);
        expect(stored).toEqual(result);
    });

    it('should create a workflow without description', async () => {
        // Arrange
        const name = 'Test Workflow';

        // Act
        const result = await useCase.execute(name);

        // Assert
        expect(result.name).toBe(name);
        expect(result.description).toBeUndefined();
        expect(result.definition).toEqual(generateDefaultDefinition());
    });

    it('should throw error when name is empty', async () => {
        // Arrange
        const emptyName = '   ';
        const workflows = await inMemoryRepository.getAll();
        const defaultLength = workflows.length;

        // Act & Assert
        await expect(useCase.execute(emptyName)).rejects.toThrow('Workflow name cannot be empty');

        // Verify nothing was stored in the repository
        const allWorkflows = await inMemoryRepository.getAll();
        expect(allWorkflows).toHaveLength(defaultLength);
    });
});