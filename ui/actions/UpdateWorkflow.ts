"use server";

import { updateWorkflowUseCase } from "@/providers/workflow.provider";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  await updateWorkflowUseCase.execute(id, definition);
  revalidatePath("/workflows");
}
