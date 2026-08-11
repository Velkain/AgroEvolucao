'use client'

import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import {
  ExternalLink,
  FlaskConical,
  Lightbulb,
  Maximize2,
  Sprout,
  TestTube,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
        <div data-chemistry-heading className="mx-auto max-w-3xl text-center">
          <h2
            id="quimica-title"
            className="text-balance font-serif text-2xl font-semibold text-primary sm:text-3xl"
          >
            A química do solo à mesa
          </h2>
          <p className="mt-2 text-pretty text-base leading-normal text-muted-foreground">
            {chemistryIntro}
          </p>
        </div>

        <div
          data-chemistry-layout
          className="mt-8 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8"
        >
          {/* Índice */}
          <div
            data-chemistry-tabs
            role="tablist"
            aria-label="Temas de química no campo"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
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
                  data-chemistry-tab
                  className={cn(
                    'flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-full',
                    isActive
                      ? 'bg-accent/15 text-accent-foreground'
                      : 'text-foreground/80 hover:bg-muted',
                  )}
                >
                  <span
                    data-chemistry-tab-icon
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
            data-chemistry-panel
            role="tabpanel"
            id={`${baseId}-panel-${topic.id}`}
            aria-labelledby={`${baseId}-tab-${topic.id}`}
            tabIndex={0}
            className="flex min-h-0 flex-col rounded-2xl border border-accent/25 bg-background p-5 elev-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <topic.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-balance font-serif text-xl font-semibold text-foreground sm:text-2xl">
                {topic.title}
              </h3>
            </div>

            <p
              data-chemistry-explanation
              className="mt-4 text-pretty leading-relaxed text-foreground/90"
            >
              {topic.explanation}
            </p>

            <div
              data-chemistry-details
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
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

            <div
              data-chemistry-note
              className="mt-4 flex items-start gap-3 rounded-xl bg-accent/10 p-3.5"
            >
              <Lightbulb
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground"
                aria-hidden="true"
              />
              <p className="text-pretty text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold">Você sabia? </span>
                {topic.didYouKnow}
              </p>
            </div>

            {topic.source ? (
              <a
                href={topic.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {topic.source.name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}

            <Dialog key={topic.id}>
              <DialogTrigger
                render={
                  <button
                    type="button"
                    data-chemistry-artwork
                    aria-label={`Ampliar ilustração: ${topic.title}`}
                    className="group relative mt-4 min-h-40 flex-1 overflow-hidden rounded-xl border border-accent/20 bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-44"
                  />
                }
              >
                <Image
                  src={topic.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 58rem, (min-width: 1024px) calc(100vw - 24rem), 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ objectPosition: topic.imagePosition ?? 'center' }}
                />
                <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground elev-1 backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Ampliar
                </span>
              </DialogTrigger>

              <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-5xl">
                <DialogHeader className="border-b border-border p-4 pr-12 text-left sm:p-5 sm:pr-14">
                  <DialogTitle className="font-serif text-xl font-semibold sm:text-2xl">
                    {topic.title}
                  </DialogTitle>
                  <DialogDescription>
                    Visualização ampliada da ilustração didática.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-[3/2] w-full bg-muted">
                  <Image
                    src={topic.image}
                    alt={topic.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 64rem, calc(100vw - 2rem)"
                    className="object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p
          data-chemistry-safety
          className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground"
        >
          <FlaskConical className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Este material é didático e não traz doses nem recomendações de
          aplicação. Qualquer correção de solo ou uso de defensivo exige análise
          e acompanhamento de um profissional habilitado.
        </p>
      </div>
    </section>
  )
}
