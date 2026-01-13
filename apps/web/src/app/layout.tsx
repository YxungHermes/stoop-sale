import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stoop Sale - Discover Local Yard Sales',
  description: 'Browse and sell at virtual yard sales. The magic of Saturday morning treasure hunting, online.',
  keywords: ['yard sale', 'garage sale', 'stoop sale', 'local marketplace', 'secondhand'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stoop-cream">
        {children}
      </body>
    </html>
  )
}
