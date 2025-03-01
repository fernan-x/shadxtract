'use client'

import React from 'react'
import TooltipWrapper from '@/ui/components/TooltipWrapper'
import { Button } from '@/ui/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SaveButton from './SaveButton'
import ExecuteButton from './ExecuteButton'

type TopBarProps = {
    title: string;
    subtitle?: string;
    workflowId: string;
}

function TopBar({ title, subtitle, workflowId }: TopBarProps) {
    const router = useRouter();

    return (
        <header className='flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
            <div className='flex gap-1 flex-1'>
                <TooltipWrapper content='Back'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => router.push('/workflows')}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-ellipsis truncate'>
                        {title}
                    </p>
                    {subtitle && (
                        <p className='text-xs text-muted-foreground truncate text-ellipsis'>
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className='flex gap-1 flex-1 justify-end'>
                <ExecuteButton workflowId={workflowId} />
                <SaveButton workflowId={workflowId} />
            </div>
        </header>
    );
}

export default TopBar