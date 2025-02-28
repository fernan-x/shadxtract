'use client'

import { cn } from '@/lib/utils'
import { TaskOutputType, TaskParamType } from '@/ui/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { ColorForHandle } from './common'

export function NodeOutputs({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col divide-y gap-1'>{children}</div>
  )
}

export function NodeOutput({ output, nodeId }: { output: TaskOutputType, nodeId: string }) {
  return (
    <div className='flex justify-end relative p-3 bg-secondary'>
      <p className='text-muted-foreground text-xs'>{output.name}</p>
      <Handle
        id={output.name}
        type='source'
        position={Position.Right}
        className={cn(
          '!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4',
          ColorForHandle[output.type],
        )}
      />
    </div>
  )
}

