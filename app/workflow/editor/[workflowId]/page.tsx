import { getWorkflowByIdUseCase } from '@/providers/workflow.provider';
import React from 'react'
import Editor from '../../_components/Editor';

async function page({ params }: { params: { workflowId: string } }) {
    const { workflowId } = params;

    const worflow = await getWorkflowByIdUseCase.execute(workflowId);
    if (!worflow) {
        return <div>Workflow not found</div>
    }

    return (
        <Editor workflow={worflow} />
    )
}

export default page