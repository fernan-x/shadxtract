import { Workflow } from "@/core/domain/workflow/workflow.entity";
import { WorkflowRepository } from "@/core/domain/workflow/workflow.repository";

export class GetWorkflowsUseCase {
  constructor(private repository: WorkflowRepository) {}

  async execute(): Promise<Workflow[]> {
    return this.repository.getAll();
  }
}
