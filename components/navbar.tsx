import React from 'react'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from '@/components/mobile-sidebar'
import { getApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
const Navbar = async () => {
    const apiLimitCount = await getApiLimit()
    const isPro = await checkSubscription()
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            <div className='flex justify-end w-full'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar