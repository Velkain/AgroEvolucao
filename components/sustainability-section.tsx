import { Scale } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { stagger } from '@/lib/animation'
import {
  sustainabilityPillars,
  sustainabilityNote,
} from '@/lib/sustainability-data'

export function SustainabilitySection() {
  return (
    <section
      id="sustentabilidade"
      aria-labelledby="sustentabilidade-title"
      className="scroll-mt-20 border-t border-border/60 bg-secondary/25 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-sustainability-heading
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            id="sustentabilidade-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Tecnologia não significa apenas produzir mais
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Sustentabilidade no campo se sustenta em quatro apoios ao mesmo
            tempo. Se um deles cede, os outros três não se seguram sozinhos.
          </p>
        </div>

        <div
          data-sustainability-grid
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {sustainabilityPillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={stagger(index)}>
            <article
              data-sustainability-card
              aria-labelledby={`pilar-${pillar.id}`}
              className="rounded-2xl border border-primary/20 bg-background p-6 elev-1 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3
                  id={`pilar-${pillar.id}`}
                  className="font-serif text-xl font-semibold text-foreground"
                >
                  {pillar.title}
                </h3>
              </div>

              <p
                data-sustainability-summary
                className="mt-4 text-pretty leading-relaxed text-foreground/85"
              >
                {pillar.summary}
              </p>

              <ul
                data-sustainability-list
                className="mt-5 space-y-2 border-t border-border pt-5"
              >
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            </Reveal>
          ))}
        </div>

        <p
          data-sustainability-note
          data-presentation="secondary"
          className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground sm:p-5"
        >
          <Scale className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {sustainabilityNote}
        </p>
      </div>
    </section>
  )
}
