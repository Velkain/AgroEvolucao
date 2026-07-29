/** @type {import('next').NextConfig} */
const nextConfig = {
  // `typescript.ignoreBuildErrors` foi removido de propósito: erros de tipo
  // devem quebrar o build em vez de passarem despercebidos.
  images: {
    // Sem `unoptimized`, o Next redimensiona e serve AVIF/WebP por viewport.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
