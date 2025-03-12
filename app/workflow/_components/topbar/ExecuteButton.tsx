'use client'

import { Button } from '@/ui/components/ui/button'
import useExecutionPlan from '@/ui/hooks/use-execution-plan';
import { PlayIcon } from 'lucide-react'
import React from 'react'

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();

  const onHandleClick = () => {
    const plan = generate();
    console.log(plan);
  }

  return (
    <Button
      variant='outline'
      className='flex items-center gap-2'
      onClick={onHandleClick}
    >
        <PlayIcon size={16} className='stroke-orange-400' />
        Execute
    </Button>
  )
}

export default ExecuteButton