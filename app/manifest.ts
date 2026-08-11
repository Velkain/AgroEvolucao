import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AgroEvolução — Do arado à inteligência artificial',
    short_name: 'AgroEvolução',
    description:
      'Uma viagem interativa pela evolução da agricultura, dos primeiros cultivos à Agricultura 5.0.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fdfcf7',
    theme_color: '#43644c',
    icons: [
      {
        src: '/icons/leaf-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/leaf-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/leaf-icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
