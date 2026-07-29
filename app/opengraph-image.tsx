import { ImageResponse } from 'next/og'

export const alt = 'AgroEvolução — Do arado à inteligência artificial'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagem de preview gerada no build — é o que aparece ao compartilhar o link
 * no WhatsApp, no Classroom ou em redes sociais.
 * Cores em hexadecimal porque o renderizador do Satori não interpreta oklch().
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #fdfcf7 0%, #e2efe2 100%)',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 20,
              background: '#43644c',
              color: '#faf9f1',
              fontSize: 34,
            }}
          >
            🌱
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 700,
              color: '#43644c',
            }}
          >
            AgroEvolução
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#243928',
              letterSpacing: -1.5,
            }}
          >
            Do arado à inteligência artificial
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.4,
              color: '#5d665b',
            }}
          >
            Uma viagem pela evolução da agricultura, da Agricultura 1.0 à 5.0.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {['História', 'Tecnologia', 'Química', 'Sustentabilidade'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  borderRadius: 999,
                  background: '#e2efe2',
                  color: '#43644c',
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  )
}
