'use client'

import CustomDialogHeader from '@/ui/components/CustomDialogHeader'
import { Button } from '@/ui/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/ui/components/ui/dialog'
import { createWorkflowSchema } from '@/ui/schema/workflow'
import { Layers2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui/components/ui/form'
import { Input } from '@/ui/components/ui/input'
import { Textarea } from '@/ui/components/ui/textarea'

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {},
    });

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
                <div className='p-6'>
                    <Form {...form}>
                        <form className='space-y-8 w-full'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Name
                                            <p className='text-xs text-primary'>(required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Choose a descriptive and unique name for your workflow
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Description
                                            <p className='text-xs text-muted-foreground'>(optional)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className='resize-none' />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of your workflow.<br />
                                            This will help other users understand what your workflow does.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full'>
                                Create Workflow
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog;
