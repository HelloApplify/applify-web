import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Applify | Action Protocols for Elite Performance',
  description: 'Turn world-class insights into immediate action with 7, 30, and 60-day action protocols.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
