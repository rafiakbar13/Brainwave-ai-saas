import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { LandingHero } from '@/components/landing-hero'
import { LandingServices } from '@/components/landing-services'
import { LandingContent } from '@/components/landing-content'
const LandingPage = () => {
    return (
        <div className='h-full'>
            <LandingNavbar />
            <LandingHero />
            <LandingServices />
            <LandingContent />
        </div>
    )
}

export default LandingPage