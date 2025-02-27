'use client'

import { Button } from '@/ui/components/ui/button'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'

function SaveButton({ workflowId }: { workflowId: string }) {
    const { toObject } = useReactFlow();

    return (
        <Button
            variant='outline'
            className='flex items-center gap-2'
            onClick={() => {}}
        >
            <CheckIcon size={16} className='stroke-green-400' />
            Save
        </Button>
    )
}

export default SaveButton