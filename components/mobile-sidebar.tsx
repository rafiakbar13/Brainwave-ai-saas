'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/sidebar';
const MobileSidebar = () => {
    // solved hydration error
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={'ghost'} size={'icon'} className='md:hidden'>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar