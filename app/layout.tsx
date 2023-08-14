import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brainwave',
  description: 'AI Platform for the Future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Logo.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2?3.19"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
