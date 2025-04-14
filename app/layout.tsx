import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eternal Soul Clothing',
  description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: [
      { url: '/images/Logo2_Teal.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: [
      { url: '/images/Logo2_Teal.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/Logo2_Teal.png', sizes: '512x512', type: 'image/png' }
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Eternal Soul Clothing',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/images/Logo2_Teal.png'
    ]
  },
  openGraph: {
    title: 'Eternal Soul Clothing',
    description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
    images: [
      {
        url: '/images/Logo2_Teal.png',
        width: 512,
        height: 512,
        alt: 'Eternal Soul Clothing',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eternal Soul Clothing',
    description: 'Eternal Soul Clothing - A tribute to the enduring energy within each of us',
    images: ['/images/Logo2_Teal.png'],
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
        <link rel="icon" type="image/png" sizes="512x512" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="384x384" href="/images/Logo2_Teal.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Logo2_Teal.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/images/Logo2_Teal.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
      </head>
      <body>{children}</body>
    </html>
  )
}
