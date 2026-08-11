import { ArrowDown, UserCheck } from 'lucide-react'
import {
  dataFlowExample,
  dataFlowHighlight,
} from '@/lib/data-flow-data'

export function DecisionCaseSection() {
  return (
    <section
      id="caso-decisao"
      aria-labelledby="caso-decisao-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="caso-decisao-title"
          className="font-serif text-2xl font-semibold text-primary sm:text-3xl"
        >
          Um caso, do sensor à decisão
        </h2>

        <ol className="mt-5 space-y-0">
          {dataFlowExample.map((line, index) => (
            <li key={`${line.step}-${index}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-tech"
                />
                {index < dataFlowExample.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="w-px flex-1 bg-border"
                  />
                ) : null}
              </div>
              <div className="pb-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-tech">
                  {line.step}
                </span>
                <p className="mt-0.5 leading-relaxed text-foreground/90">
                  {line.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UserCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-balance font-serif text-lg leading-relaxed text-foreground sm:text-xl">
            {dataFlowHighlight}
          </p>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Mais adiante, na Fazenda inteligente, este ciclo roda com dados reais
          de uma cidade agrícola.
        </p>
      </div>
    </section>
  )
}
