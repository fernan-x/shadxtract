'use server'

import { updateWorkflowUseCase } from '@/providers/workflow.provider';

export async function UpdateWorkflow({ id, definition }: { id: string, definition: string }) {
    await updateWorkflowUseCase.execute(id, definition);
}