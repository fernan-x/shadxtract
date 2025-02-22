import { WorkflowRepositoryImpl } from '@/infra/repositories/workflow/workflow.repository.impl';
import { GetWorkflowsUseCase } from '@/core/application/workflow/getWorkflows.usecase';

// Instantiate repository
const workflowRepository = new WorkflowRepositoryImpl();

// Instantiate use case with repository
export const getWorkflowsUseCase = new GetWorkflowsUseCase(workflowRepository);
