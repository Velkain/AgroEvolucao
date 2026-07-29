import { Check } from 'lucide-react'
import { TimelineOrder } from '@/components/activities/timeline-order'
import { Reveal } from '@/components/reveal'
import { stagger } from '@/lib/animation'
import {
  summaryMilestones,
  summaryStatement,
  summaryConclusions,
} from '@/lib/summary-data'

export function SummarySection() {
  return (
    <section
      id="resumo"
      aria-labelledby="resumo-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="resumo-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            O que estudamos?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {summaryStatement}
          </p>
        </div>

        {/* A trajetória inteira numa linha */}
        <ol className="mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] lg:justify-center lg:overflow-visible">
          {summaryMilestones.map((milestone, index) => (
            <li
              key={milestone.label}
              className="flex w-32 shrink-0 snap-start flex-col items-center text-center sm:w-36"
            >
              <div className="relative flex w-full justify-center">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute right-1/2 top-6 h-0.5 w-full bg-border"
                  />
                ) : null}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary ring-1 ring-border">
                  <milestone.icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-sm font-medium leading-snug text-foreground">
                {milestone.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {milestone.era}
              </p>
            </li>
          ))}
        </ol>

        {/* Conclusões */}
        <ul className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {summaryConclusions.map((conclusion, index) => (
            <Reveal as="li" key={conclusion} delay={stagger(index)}
              className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-pretty leading-relaxed text-foreground">
                {conclusion}
              </p>
            </Reveal>
          ))}
        </ul>

        {/* Fechamento ativo: recontar a sequência inteira antes de sair */}
        <div className="mx-auto mt-14 max-w-3xl">
          <TimelineOrder />
        </div>
      </div>
    </section>
  )
}
