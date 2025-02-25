import { getWorkflowByIdUseCase } from '@/providers/workflow.provider';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

async function page({ params }: { params: { workflowId: string } }) {
    const { workflowId } = params;

    const worflow = await getWorkflowByIdUseCase.execute(workflowId);
    if (!worflow) {
        return <div>Workflow not found</div>
    }

    return (
        <pre className='h-screen'>{JSON.stringify(worflow, null, 2)}</pre>
    )
}

export default page