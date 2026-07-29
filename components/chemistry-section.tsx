'use client'

import { useId, useRef, useState } from 'react'
import { FlaskConical, Lightbulb, Sprout, TestTube } from 'lucide-react'
import { chemistryTopics, chemistryIntro } from '@/lib/chemistry-data'
import { cn } from '@/lib/utils'

/**
 * Índice de laboratório com painel de detalhe.
 * Padrão de abas com tabindex móvel: só o item selecionado entra na ordem de
 * tabulação, e as setas percorrem a lista — é o comportamento que um leitor de
 * tela e um teclado esperam de um tablist.
 */
export function ChemistrySection() {
  const [selected, setSelected] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const topic = chemistryTopics[selected]

  function focusTab(index: number) {
    const next = (index + chemistryTopics.length) % chemistryTopics.length
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        focusTab(index + 1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        focusTab(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(chemistryTopics.length - 1)
        break
    }
  }

  return (
    <section
      id="quimica"
      aria-labelledby="quimica-title"
      className="scroll-mt-20 border-t border-border/60 bg-card py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="quimica-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            A química está presente em todas as fases da agricultura
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {chemistryIntro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-10">
          {/* Índice */}
          <div
            role="tablist"
            aria-label="Temas de química no campo"
            aria-orientation="vertical"
            className="flex flex-col gap-1"
          >
            {chemistryTopics.map((item, index) => {
              const isActive = index === selected
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  role="tab"
                  id={`${baseId}-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    isActive
                      ? 'bg-accent/15 text-accent-foreground'
                      : 'text-foreground/80 hover:bg-muted',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              )
            })}
          </div>

          {/* Detalhe */}
          <div
            role="tabpanel"
            id={`${baseId}-panel-${topic.id}`}
            aria-labelledby={`${baseId}-tab-${topic.id}`}
            tabIndex={0}
            className="rounded-2xl border border-accent/25 bg-background p-6 elev-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <topic.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-balance font-serif text-2xl font-semibold text-foreground">
                {topic.title}
              </h3>
            </div>

            <p className="mt-6 text-pretty leading-relaxed text-foreground/90">
              {topic.explanation}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <TestTube className="h-4 w-4" aria-hidden="true" />
                  Exemplo prático
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {topic.example}
                </p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sprout className="h-4 w-4" aria-hidden="true" />
                  Na agricultura
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {topic.relevance}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent/10 p-4">
              <Lightbulb
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground"
                aria-hidden="true"
              />
              <p className="text-pretty text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold">Você sabia? </span>
                {topic.didYouKnow}
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
          <FlaskConical className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Este material é didático e não traz doses nem recomendações de
          aplicação. Qualquer correção de solo ou uso de defensivo exige análise
          e acompanhamento de um profissional habilitado.
        </p>
      </div>
    </section>
  )
}
