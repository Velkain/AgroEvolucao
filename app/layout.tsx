import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

/**
 * URL pública do site. Na Vercel é preenchida automaticamente;
 * em desenvolvimento cai para localhost.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

const siteTitle = 'AgroEvolução — Do arado à inteligência artificial'
const siteDescription =
  'Uma viagem interativa pela evolução da agricultura: dos primeiros cultivos à Agricultura 5.0, mostrando como a tecnologia e a química transformaram a produção agrícola. Projeto educacional.'

const splashSessionScript = `
try {
  if (window.sessionStorage.getItem('agroevolucao:splash:v1') === 'seen') {
    document.documentElement.dataset.splashSeen = 'true'
  }
} catch {}
`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'AgroEvolução',
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  keywords: [
    'agricultura',
    'história',
    'tecnologia',
    'química',
    'sustentabilidade',
    'inteligência artificial',
    'educação',
  ],
  icons: {
    icon: [
      {
        url: '/icons/leaf-icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icons/leaf-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}

/**
 * Cor da barra do navegador. A meta tag `theme-color` aceita apenas hex
 * literal — não aceita oklch() nem var() —, então estes valores são a
 * conversão sRGB exata dos tokens do sistema, não cores novas:
 *   #43644c = --primary            (oklch(0.47 0.055 152), "Verde floresta")
 *   #0e130f = --background escuro  (oklch(0.18 0.012 150))
 * Ao mudar esses tokens em globals.css, reconverta e atualize aqui junto.
 */
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#43644c' },
    { media: '(prefers-color-scheme: dark)', color: '#0e130f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Script id="splash-session" strategy="beforeInteractive">
          {splashSessionScript}
        </Script>
        <ThemeProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
