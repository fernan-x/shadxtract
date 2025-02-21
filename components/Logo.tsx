'use client';

import { cn } from '@/lib/utils'
import { SquareDashedMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo({
    fontSize = 'text-2xl',
    iconSize = 20,
    onClick = () => null,
}: {
    fontSize?: string,
    iconSize?: number,
    onClick?: () => void,
}) {
  return (
    <Link href='/' className={cn('text-2xl font-extrabold flex items-center gap-2', fontSize)} onClick={onClick}>
        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
            <SquareDashedMousePointer size={iconSize} className='stroke-white' />
        </div>
        <div>
            <span className='bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent'>
                Shad
            </span>
            <span className='text-stone-700 dark:text-stone-300'>Xtract</span>
        </div>
    </Link>
  )
}
