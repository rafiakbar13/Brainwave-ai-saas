'use client';
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card';
import { Code, ArrowRightIcon, MessageSquare, Music, ImageIcon, VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils';
const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: '/conversation',
    },
    {
        label: 'Music Generation',
        icon: Music,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        href: '/music',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: '/image',
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        color: 'text-orange-700',
        bgColor: 'bg-orange-700/10',
        href: '/video',
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: 'text-green-700',
        bgColor: 'bg-green-700/10',
        href: '/code',
    },
]

const DashboardPage = () => {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-center md:text-4xl">
                    Explore the power of AI
                </h2>
                <p className="text-sm font-light text-center text-muted-foreground md:text-lg">
                    Chat with an AI, generate images, videos, music, and code, all with the power of AI.
                </p>
            </div>
            <div className="px-4 space-y-4 md:px-20 lg:px-32">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className='flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md '
                    >
                        <div className='flex items-center gap-x-4'>
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-6 h-6", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-gray-500" />
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default DashboardPage
