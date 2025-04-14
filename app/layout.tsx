import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eternal Soul Clothing',
  description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: [
      { url: '/images/Logo2_Teal.png', type: 'image/png' },
    ],
    shortcut: [
      { url: '/images/Logo2_Teal.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/Logo2_Teal.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Eternal Soul Clothing',
    description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
    images: [
      {
        url: '/ES Slide Grey.png',
        width: 1200,
        height: 630,
        alt: 'Eternal Soul Clothing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eternal Soul Clothing',
    description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
    images: ['/ES Slide Grey.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="384x384" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/Logo2_Teal.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/images/Logo2_Teal.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:image" content="/ES Slide Grey.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body>{children}</body>
    </html>
  )
}
