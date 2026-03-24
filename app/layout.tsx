import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SecurityBackground } from '@/components/security-background'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Lawrence B. Bondoc - UI/UX Designer, L1 Cybersecurity Specialist',
  description: 'Portfolio of Lawrence, a Visual Designer also specializing in cybersecurity',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
        <SecurityBackground />
        <div className="relative z-10">{children}</div>
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              'rounded-xl border border-border bg-popover text-popover-foreground shadow-lg shadow-accent/10',
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
