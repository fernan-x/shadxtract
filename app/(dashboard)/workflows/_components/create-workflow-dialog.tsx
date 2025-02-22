'use client'

import CustomDialogHeader from '@/ui/components/CustomDialogHeader'
import { Button } from '@/ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/ui/components/ui/dialog'
import { Layers2Icon } from 'lucide-react'
import React, { useState } from 'react'

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {triggerText ?? 'Create Workflow'}
                </Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title='Create Workflow'
                    subtitle='Start building your workflow'
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog