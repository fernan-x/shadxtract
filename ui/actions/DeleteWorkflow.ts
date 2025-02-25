'use server'

import { deleteWorkflowUseCase } from '@/providers/workflow.provider';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function DeleteWorkflow(id: string) {
    await deleteWorkflowUseCase.execute(id);
    redirect('/workflows');
}