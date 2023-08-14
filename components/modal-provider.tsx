"use client"
import React from 'react'
import { ProModal } from '@/components/pro-modal'
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = React.useState(false)
    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <ProModal />
        </>
    )
}
