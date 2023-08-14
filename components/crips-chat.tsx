'use client'

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f34ba502-00a1-459e-9681-42cee9722ff6")
    }, [])

    return null
}