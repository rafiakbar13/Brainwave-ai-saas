'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Code, MessageSquare, Music, ImageIcon, VideoIcon, Check, Zap } from 'lucide-react'
import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "@/components/ui/badge"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"

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

export const ProModal = () => {
    const proModal = useProModal()
    const [loading, setLoading] = useState(false)
    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe');

            window.location.href = await response.data.url;
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col items-center justify-center pb-2 gap-y-4">
                        <div className="flex items-center py-1 font-bold gap-x-2">
                            Upgrade to Brainwave
                            <Badge className="py-1 text-sm uppercase" variant={"premium"}>
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="pt-2 space-y-2 text-sm font-medium text-zinc-900">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="flex items-center justify-between p-3 border-black/5"
                            >
                                <div className="flex items-center gap-x-3">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="text-sm font-semibold">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="w-5 h-5 text-primary" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        disabled={loading}
                        size={"lg"}
                        variant={"premium"}
                        className="w-full"
                        onClick={onSubscribe}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}