import Image from 'next/image'
import React from 'react'

export const Loader = () => {
    return (
        <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
            <div className='w-10 h-10 relative animate-bounce'>
                <Image alt="Loader" fill src="/Logo.png" />
            </div>
            <p className='text-muted-foreground text-sm'>
                Brainwave is thinking...
            </p>
        </div>
    )
}

