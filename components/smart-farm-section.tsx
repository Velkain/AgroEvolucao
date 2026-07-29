import { FarmPanel } from '@/components/smart-farm/farm-panel'
import { getWeather } from '@/lib/weather'

/**
 * Servidor: busca a medição antes de renderizar. Se a rede falhar, `getWeather`
 * devolve o snapshot gravado — a seção nunca aparece quebrada durante uma
 * apresentação ao vivo.
 */
export async function SmartFarmSection() {
  const weather = await getWeather()

  return (
    <section
      id="fazenda-inteligente"
      aria-labelledby="fazenda-title"
      className="scroll-mt-20 border-t border-border/60 bg-secondary/25 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="fazenda-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Demonstração de fazenda inteligente
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            O ciclo da seção anterior, rodando com dados reais de clima e solo de
            Sorriso, no Mato Grosso — o município que mais produz soja no Brasil.
            O que é medição está marcado como medição; o que é hipótese está
            marcado como hipótese.
          </p>
        </div>

        <div className="mt-12">
          <FarmPanel weather={weather} />
        </div>
      </div>
    </section>
  )
}
