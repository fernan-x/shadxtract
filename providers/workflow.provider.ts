import { WorkflowRepositoryPrisma } from '@/infra/repositories/workflow/workflow.repository.prisma';
import { GetWorkflowsUseCase } from '@/core/application/workflow/getWorkflows.usecase';
import { WorkflowRepositoryMemory } from '@/infra/repositories/workflow/workflow.repository.memory';
import { CreateWorkflowUseCase } from '@/core/application/workflow/createWorkflow.usecase';
import { DeleteWorkflowUseCase } from '@/core/application/workflow/deleteWorkflow.usecase';
import { GetWorkflowByIdUseCase } from '@/core/application/workflow/getWorkflowById.usecase';
import { UpdateWorkflowUseCase } from '@/core/application/workflow/updateWorkflow.usecase';

// Instantiate repository
const workflowRepository = new WorkflowRepositoryPrisma();
// const workflowRepository = new WorkflowRepositoryMemory();

// Instantiate use case with repository
export const getWorkflowsUseCase = new GetWorkflowsUseCase(workflowRepository);
export const createWorkflowUseCase = new CreateWorkflowUseCase(workflowRepository);
export const deleteWorkflowUseCase = new DeleteWorkflowUseCase(workflowRepository);
export const getWorkflowByIdUseCase = new GetWorkflowByIdUseCase(workflowRepository);
export const updateWorkflowUseCase = new UpdateWorkflowUseCase(workflowRepository);