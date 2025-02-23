import { getWorkflowsUseCase } from '@/providers/workflow.provider';
import { Alert, AlertDescription, AlertTitle } from '@/ui/components/ui/alert';
import { Skeleton } from '@/ui/components/ui/skeleton'
import { AlertCircle, InboxIcon, Workflow } from 'lucide-react';
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/create-workflow-dialog';
import WorkflowCard from './_components/workflow-card';

export default function page() {
  return (
    <div className='flex-1 flex flex-col h-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-3xl font-bold'>Workflows</h1>
            <p className='text-muted-foreground'>
              Manage your workflows
            </p>
          </div>
          <CreateWorkflowDialog />
        </div>

        <div className="h-full py-6">
          <Suspense fallback={<UserWorkflowsSkeleton />}>
            <UserWorkflows />
          </Suspense>
        </div>
    </div>
  )
}

function UserWorkflowsSkeleton() {
  return (
    <div className='space-y-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={`UserWorkflowsSkeleton_${i}`} className='h-32 w-full' />
      ))}
    </div>
  )
}

async function UserWorkflows() {
  try {
    const workflows = await getWorkflowsUseCase.execute();
    if (!workflows) {
      throw new Error('Cannot fetch workflows');
    }

    if (workflows.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center gap-4 h-full'>
          <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
            <InboxIcon size={40} className='stroke-primary'/>
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <p className='font-bold'>No workflows created yet</p>
            <p className='text-sm text-muted-foreground'>
              Click the button below to create your first workflow
            </p>
          </div>
          <CreateWorkflowDialog triggerText='Create your first workflow'/>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {workflows.map(workflow => workflow && <WorkflowCard key={workflow.getId()} workflow={workflow.toJSON()} />)}
      </div>
    );
  } catch (error) {
    console.error(error);

    let errorMessage = 'Something went wrong. Please try again later.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <Alert variant='destructive'>
        <AlertCircle className='w-4 h-4'/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {errorMessage}
        </AlertDescription>
      </Alert>
    )
  }
}