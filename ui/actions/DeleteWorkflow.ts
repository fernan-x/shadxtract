'use server'

import { deleteWorkflowUseCase } from '@/providers/workflow.provider';
import { redirect } from 'next/navigation';

export async function DeleteWorkflow(id: string) {
    await deleteWorkflowUseCase.execute(id);
    redirect('/workflows');
}