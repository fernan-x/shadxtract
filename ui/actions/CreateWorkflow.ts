'use server'

import { z } from 'zod';
import { createWorkflowSchema } from '../schema/workflow';
import { createWorkflowUseCase } from '@/providers/workflow.provider';
import { redirect } from 'next/navigation';


export async function CreateWorkflow(form: z.infer<typeof createWorkflowSchema>) {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error('Invalid form data');
    }

    const result = await createWorkflowUseCase.execute(data.name, data.description);
    redirect(`/workflow/editor/${result.getId()}`);
}