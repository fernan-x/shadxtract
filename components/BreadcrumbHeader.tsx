"use client";

import { usePathname } from 'next/navigation';
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb';

export default function BreadcrumbHeader() {
    const pathname = usePathname();
    const paths = pathname === '/' ? [''] : pathname?.split('/').filter(Boolean);
    return (
        <div className='flex items-center'>
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink className='capitalize' href={`/${path}`}>
                                {path === '' ? 'Home' : path}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
