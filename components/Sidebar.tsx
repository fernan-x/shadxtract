'use client';

import { MenuIcon } from 'lucide-react';
import React, { useState } from 'react'
import Logo from './Logo';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { useActiveRoute, useRoutes } from '@/hooks/use-routes';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function DesktopSidebar() {
    const routes = useRoutes();
    const activeRoute = useActiveRoute();

    return (
        <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
            <div className='flex items-center justify-center gap-2 border-b-[1px] border-separate p-4'>
                <Logo />
            </div>
            <div className='p-2'>TODO CREDITS</div>
            <div className='flex flex-col gap-1 p-2'>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={buttonVariants({
                            variant: activeRoute.href === route.href
                                ? 'sidebarItemActive'
                                : 'sidebarItem',
                        })}
                    >
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function MobileSidebar() {
    const routes = useRoutes();
    const activeRoute = useActiveRoute();
    const [isOpen, setIsOpen] = useState(false);

    return <div className='block border-separate bg-background md:hidden'>
        <nav className='container flex items-center justify-between px-8'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant='ghost' size='icon'>
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    className='w-[calc(100% - 3rem)] space-y-4'
                    side='left'
                >
                    <SheetHeader className='sr-only'>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            Accessibility menu
                        </SheetDescription>
                    </SheetHeader>
                    <Logo onClick={() => setIsOpen(prev => !prev)} />
                    <div className="flex flex-col gap-1 p-2">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={buttonVariants({
                                    variant: activeRoute.href === route.href
                                        ? 'sidebarItemActive'
                                        : 'sidebarItem',
                                })}
                                onClick={() => setIsOpen(prev => !prev)}
                            >
                                <route.icon size={20} />
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    </div>
}
