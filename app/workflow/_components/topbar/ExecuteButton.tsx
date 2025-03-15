'use client'

import { runWorkflow } from '@/ui/actions/RunWorkflow';
import { Button } from '@/ui/components/ui/button'
import useExecutionPlan from '@/ui/hooks/use-execution-plan';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success('Execution started', { id: 'flow-execution'});
    },
    onError: () => {
      toast.error('Failed to execute workflow', { id: 'flow-execution'});
    }
  });

  const onHandleClick = () => {
    const plan = generate();
    if (!plan) {
      // Client side validation
      return;
    }

    mutation.mutate({ workflowId, flowDefinition: JSON.stringify(toObject()) });
  }

  return (
    <Button
      variant='outline'
      className='flex items-center gap-2'
      onClick={onHandleClick}
      disabled={mutation.isPending}
    >
        <PlayIcon size={16} className='stroke-orange-400' />
        Execute
    </Button>
  )
}

export default ExecuteButton