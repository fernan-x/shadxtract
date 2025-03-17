import { Workflow } from "./workflow.entity";
import { generateDefaultDefinition } from "@/lib/workflow/generateDefaultDefinition";

export const WorkflowFactory = {
  create: (data?: Partial<Workflow>): Workflow => {
    return {
      id: "",
      userId: "",
      name: "Untitled Workflow",
      definition: generateDefaultDefinition(),
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: null,
      ...data,
    };
  },
};
