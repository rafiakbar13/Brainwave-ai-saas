import React from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const apiLimitCount = await getApiLimit()
    const isPro = await checkSubscription()
    return (
        <div className='relative h-full'>
            <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
                <div>
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
                </div>
            </div>
            <main className='md:pl-72'>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;