import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Global import 
import { ClerkProvider } from '@clerk/nextjs'
import { StoreModalProvider } from '@/providers/storeModalProvider'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <ClerkProvider>
      <html lang="en">
          <body className={inter.className}>
          <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <StoreModalProvider />
              {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
