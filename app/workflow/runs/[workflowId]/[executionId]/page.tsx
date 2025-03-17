import TopBar from '@/app/workflow/_components/topbar/TopBar';
import { GetWorkflowExecution } from '@/ui/actions/GetWorkflowExecution';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import ExecutionViewer from './_components/ExecutionViewer';

export default function ExecutionViewerPage({ params }: { params: { workflowId: string, executionId: string } }) {
    return (
        <div className='flex flex-col h-screen w-full overflow-hidden'>
            <TopBar
                workflowId={params.workflowId}
                title='Workflow run details'
                subtitle={`Run ID: ${params.executionId}`}
                hideButtons
            />
            <section className='flex h-full overflow-auto'>
                <Suspense fallback={
                    <div className='flex-1 flex items-center justify-center'>
                        <Loader2Icon className='w-10 h-10 animate-spin stroke-primary' />
                    </div>
                }>
                    <ExecutionViewerWrapper executionId={params.executionId} />
                </Suspense>
            </section>
        </div>
    )
}

async function ExecutionViewerWrapper({ executionId }: { executionId: string }) {
    const workflowExecution = await GetWorkflowExecution(executionId);
    if (!workflowExecution) {
        return <div>Workflow execution not found</div>
    }

    return <ExecutionViewer execution={workflowExecution} />;
}