import TooltipWrapper from '@/ui/components/TooltipWrapper'
import { Button } from '@/ui/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/components/ui/dropdown-menu'
import { MoreVerticalIcon, Trash, TrashIcon } from 'lucide-react'
import React from 'react'

function WorkflowActions() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='px-0'>
                <TooltipWrapper content='More actions'>
                    <div className="flex items-center justify-center w-full h-full px-3">
                        <MoreVerticalIcon size={18} />
                    </div>
                </TooltipWrapper>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive flex items-center gap-2'>
                <TrashIcon size={16} />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkflowActions