import { WorkflowRepositoryPrisma } from '@/infra/repositories/workflow/workflow.repository.prisma';
import { GetWorkflowsUseCase } from '@/core/application/workflow/getWorkflows.usecase';
import { WorkflowRepositoryMemory } from '@/infra/repositories/workflow/workflow.repository.memory';
import { CreateWorkflowUseCase } from '@/core/application/workflow/createWorkflow.usecase';

// Instantiate repository
// const workflowRepository = new WorkflowRepositoryPrisma();
const workflowRepository = new WorkflowRepositoryMemory();

// Instantiate use case with repository
export const getWorkflowsUseCase = new GetWorkflowsUseCase(workflowRepository);
export const createWorkflowUseCase = new CreateWorkflowUseCase(workflowRepository);
