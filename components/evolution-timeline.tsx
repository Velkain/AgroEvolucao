import { Info } from 'lucide-react'
import { TimelineStageCard } from '@/components/timeline/timeline-stage-card'
import { TimelineTrack } from '@/components/timeline/timeline-track'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import { timelineStages, timelineDisclaimer } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

function NodeMarker({
  number,
  themeClass,
}: {
  number: string
  themeClass: string
}) {
  return (
    <span
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-base font-bold ring-4 ring-background',
        themeClass,
      )}
      aria-hidden="true"
    >
      {number}
    </span>
  )
}

export function EvolutionTimeline() {
  return (
    <section
      id="evolucao"
      aria-labelledby="evolucao-title"
      className="scroll-mt-20 border-t border-border/60 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="evolucao-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Evolução da agricultura
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Cinco etapas, da força humana à inteligência artificial. Cada uma
            traz suas tecnologias, sua química e seus próprios impasses.
          </p>
        </div>

        {/*
          Cinco colunas em uma linha só, a partir de xl.
          Sem rolagem horizontal: um trilho que corta o último card no meio
          lê como layout quebrado, não como recurso.
        */}
        <div className="mt-16 hidden xl:block">
          <div className="relative">
            <TimelineTrack
              orientation="horizontal"
              className="absolute left-[10%] right-[10%] top-6 h-0.5"
            />
            <ol className="relative grid grid-cols-5 gap-4">
              {timelineStages.map((stage) => (
                <li key={stage.id} className="flex h-full flex-col items-center">
                  <NodeMarker
                    number={stage.number}
                    themeClass={stageThemeMap[stage.theme].marker}
                  />
                  {/* flex-1 faz o card ocupar a altura restante: sem isso, os
                      cards ficam com alturas diferentes e os botões desalinham */}
                  <div className="mt-8 w-full flex-1">
                    <TimelineStageCard stage={stage} compact />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Vertical — do celular ao desktop médio, onde cinco colunas não cabem */}
        <div className="relative mt-12 xl:hidden">
          <TimelineTrack
            orientation="vertical"
            className="absolute bottom-6 left-6 top-6 w-0.5"
          />
          <ol className="space-y-8">
            {timelineStages.map((stage) => (
              <li key={stage.id} className="relative pl-20">
                <div className="absolute left-0 top-0">
                  <NodeMarker
                    number={stage.number}
                    themeClass={stageThemeMap[stage.theme].marker}
                  />
                </div>
                <TimelineStageCard stage={stage} />
              </li>
            ))}
          </ol>
        </div>

        {/* Observação didática */}
        <div className="mx-auto mt-14 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 sm:p-5">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {timelineDisclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
