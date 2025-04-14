import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eternal Soul Clothing',
  description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
  metadataBase: new URL('https://eternalsoul.co'),
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'Eternal Soul Clothing',
    description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
    siteName: 'Eternal Soul Clothing',
    images: [{
      url: '/images/ES Slide Grey.png',
      width: 800,
      height: 800,
      alt: 'Eternal Soul Clothing'
    }]
  },
  icons: {
    icon: '/images/ES Slide Grey.png',
    shortcut: '/images/ES Slide Grey.png',
    apple: '/images/ES Slide Grey.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/ES Slide Grey.png" />
        <link rel="apple-touch-icon" href="/images/ES Slide Grey.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="/images/ES Slide Grey.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#6B21A8" />
      </head>
      <body>{children}</body>
    </html>
  )
}
