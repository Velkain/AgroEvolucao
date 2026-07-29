import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { introComparison } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type ComparisonTone = 'earth' | 'tech'

interface ComparisonToneClasses {
  /** Moldura e fundo do bloco */
  panel: string
  /** Cor do título da coluna */
  title: string
  /** Quadrado que envolve o ícone */
  iconBox: string
}

/** Mesmo padrão de `components/timeline/stage-theme.ts`: tema → classes. */
const comparisonToneMap: Record<ComparisonTone, ComparisonToneClasses> = {
  earth: {
    panel: 'border-earth/30 bg-earth/5',
    title: 'text-earth',
    iconBox: 'bg-earth/15 text-earth',
  },
  tech: {
    panel: 'border-tech/30 bg-tech/5',
    title: 'text-tech',
    iconBox: 'bg-tech/15 text-tech',
  },
}

interface ComparisonColumnProps {
  label: string
  tone: ComparisonTone
  items: { icon: LucideIcon; label: string }[]
}

function ComparisonColumn({ label, tone, items }: ComparisonColumnProps) {
  const theme = comparisonToneMap[tone]

  return (
    <div className={cn('rounded-2xl border p-6 sm:p-8', theme.panel)}>
      <h3 className={cn('font-serif text-xl font-semibold', theme.title)}>
        {label}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl bg-background/70 p-3"
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                theme.iconBox,
              )}
            >
              <item.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-foreground/85 sm:text-base">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function IntroductionSection() {
  return (
    <section
      id="introducao"
      aria-labelledby="introducao-title"
      className="scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            Introdução
          </span>
          <h2
            id="introducao-title"
            className="mt-5 text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Da pedra polida às máquinas guiadas por tecnologia
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            A agricultura evoluiu ao longo do tempo, mas continua mantendo sua
            essência: transformar a terra em fonte de vida, alimento e
            desenvolvimento.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <ComparisonColumn
            label="Passado"
            tone="earth"
            items={introComparison.past}
          />

          {/* Seta de transição */}
          <div
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-accent shadow-sm">
              <ArrowRight className="hidden h-5 w-5 lg:block" />
              <ArrowDown className="h-5 w-5 lg:hidden" />
            </span>
          </div>

          <ComparisonColumn
            label="Presente"
            tone="tech"
            items={introComparison.present}
          />
        </div>
      </div>
    </section>
  )
}
