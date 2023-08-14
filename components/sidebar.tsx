'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import FreeCounter from '@/components/free-counter';

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500'
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-500'
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
]

interface SidebarProps {
    apiLimitCount: number
    isPro: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
    const pathname = usePathname()
    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
            <div className="flex-1 px-3 py-2">
                <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                    <div className='relative w-8 h-8 mr-4'>
                        <Image fill alt='logo' src='/Logo.png' />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                        Brainwave
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route, i) => (
                        <Link
                            href={route.href}
                            key={i}
                            className={cn('flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10', pathname === route.href ? 'bg-white/10' : 'text-zinc-400')}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn('w-6 h-6 mr-4', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
    )
}

export default Sidebar