'use client'

import { WorkflowStatusType } from '@/core/domain/workflow/workflow-status.value-object';
import { WorkflowFactoryData } from '@/core/domain/workflow/workflow.factory';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/ui/components/ui/button';
import { Card, CardContent } from '@/ui/components/ui/card';
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react';
import Link from 'next/link';
import WorkflowActions from './workflow-actions';

const statusColors: Record<WorkflowStatusType, string> = {
    draft: 'bg-yellow-400 text-yellow-600',
    published: 'bg-primary',
};

function WorkflowCard({ workflow }: { workflow: WorkflowFactoryData }) {
    const isDraft = workflow.status === 'draft';

    return (
        <Card className='border boder-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30'>
            <CardContent className='p-4 flex items-center justify-between h-[100px]'>
                <div className='flex items-center justify-end space-x-3'>
                    <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        statusColors[workflow.status],
                    )}>
                        {isDraft ? <FileTextIcon className='w-5 h-5' /> : <PlayIcon className='w-5 h-5 text-white' />}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-muted-foreground flex items-center">
                            <Link
                                href={`/workflow/editor/${workflow.id}`}
                                className='flex items-center hover:underline'
                            >
                                {workflow.name}
                            </Link>
                            {isDraft && (
                                <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                                    Draft
                                </span>
                            )}
                        </h3>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <Link
                        href={`/workflow/editor/${workflow.id}`}
                        className={cn(buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                        }), 'flex items-center gap-2')}
                    >
                        <ShuffleIcon size={16} />
                        Edit
                    </Link>
                    <WorkflowActions workflowName={workflow.name} />
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkflowCard;