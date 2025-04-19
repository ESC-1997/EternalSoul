import './globals.css'
import { Corben, Playfair_Display, Inter } from 'next/font/google'

const corben = Corben({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-corben',
})

const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${corben.variable} ${playfair.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
