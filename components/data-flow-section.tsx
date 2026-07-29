import { ArrowDown, UserCheck } from 'lucide-react'
import {
  dataFlowSteps,
  dataFlowExample,
  dataFlowHighlight,
} from '@/lib/data-flow-data'

export function DataFlowSection() {
  return (
    <section
      id="dados"
      aria-labelledby="dados-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="dados-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Como os dados ajudam o produtor?
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Um dado sozinho não decide nada. Ele só vira decisão depois de
            percorrer um caminho — e a última palavra continua sendo de uma
            pessoa.
          </p>
        </div>

        {/*
          O ciclo. Numeração aqui carrega informação: a ordem das etapas é o
          conteúdo da seção, não decoração.
        */}
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataFlowSteps.map((step, index) => (
            <li
              key={step.id}
              className="relative flex gap-4 rounded-xl border border-border bg-card p-5 elev-1"
            >
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tech/12 font-serif text-sm font-bold text-tech">
                  {index + 1}
                </span>
                {index < dataFlowSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="mt-2 hidden w-px flex-1 bg-border md:block"
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                  <step.icon className="h-4.5 w-4.5 text-tech" aria-hidden="true" />
                  {step.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {step.actors.map((actor) => (
                    <li
                      key={actor}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Exemplo percorrendo o ciclo inteiro */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Um caso, do sensor à decisão
          </h3>
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
            Adiante, este mesmo ciclo roda com dados reais de uma cidade
            agrícola.
          </p>
        </div>
      </div>
    </section>
  )
}
