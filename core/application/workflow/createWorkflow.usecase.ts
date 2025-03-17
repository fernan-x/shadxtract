import { Workflow } from "@/core/domain/workflow/workflow.entity";
import { WorkflowRepository } from "@/core/domain/workflow/workflow.repository";
import { generateDefaultDefinition } from "@/lib/workflow/generateDefaultDefinition";

export class CreateWorkflowUseCase {
  constructor(private readonly repository: WorkflowRepository) {}

  async execute(name: string, description?: string): Promise<Workflow> {
    if (!name.trim()) {
      throw new Error("Workflow name cannot be empty");
    }
    return this.repository.create(
      name,
      generateDefaultDefinition(),
      description,
    );
  }
}
