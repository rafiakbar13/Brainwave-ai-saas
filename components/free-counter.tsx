"use client"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNT } from '@/constants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

interface FreeCounterProps {
    apiLimitCount: number
    isPro: boolean
}
const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {
    const proModal = useProModal()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (isPro) return null

    return (
        <div className='px-3'>
            <Card className='border-0 bg-white/10'>
                <CardContent className='py-6'>
                    <div className='mb-4 space-y-2 text-sm text-center text-white'>
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNT} Free Generation
                        </p>
                        <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNT) * 100} />
                    </div>
                    <Button onClick={proModal.onOpen} className='w-full' variant="premium" >
                        Upgrade
                        <Zap className='w-4 h-4 fill-white' />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter