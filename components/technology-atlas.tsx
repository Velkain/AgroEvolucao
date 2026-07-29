'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CircleCheck,
  CircleAlert,
  Cog,
  Lightbulb,
  TriangleAlert,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { EraGuess } from '@/components/activities/era-guess'
import { Reveal } from '@/components/reveal'
import { stagger } from '@/lib/animation'
import {
  technologies,
  technologyCategories,
  technologyIntro,
  type Technology,
} from '@/lib/technology-data'
import { cn } from '@/lib/utils'

const ALL = 'Todas' as const
type Filter = typeof ALL | (typeof technologyCategories)[number]

function DetailList({
  icon: Icon,
  title,
  items,
  accentClass,
}: {
  icon: typeof CircleCheck
  title: string
  items: string[]
  accentClass: string
}) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
        <Icon className={cn('h-4 w-4', accentClass)} aria-hidden="true" />
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className={cn(
                'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                accentClass.replace('text-', 'bg-'),
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TechnologyAtlas() {
  const [filter, setFilter] = useState<Filter>(ALL)
  const [open, setOpen] = useState<Technology | null>(null)

  const visible = useMemo(
    () =>
      filter === ALL
        ? technologies
        : technologies.filter((item) => item.category === filter),
    [filter],
  )

  const filters: Filter[] = [ALL, ...technologyCategories]

  return (
    <section
      id="tecnologias"
      aria-labelledby="tecnologias-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="tecnologias-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Tecnologias que transformam o campo
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {technologyIntro}
          </p>
        </div>

        {/* Filtros */}
        <div
          role="group"
          aria-label="Filtrar tecnologias por categoria"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {filters.map((item) => {
            const isActive = filter === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground/75 hover:bg-secondary hover:text-primary',
                )}
              >
                {item}
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="mt-4 text-center text-sm text-muted-foreground">
          {visible.length}{' '}
          {visible.length === 1
            ? 'tecnologia encontrada'
            : 'tecnologias encontradas'}
        </p>

        {/* Catálogo */}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal as="li" key={item.id} delay={stagger(index)}>
              <button
                type="button"
                onClick={() => setOpen(item)}
                className="group flex h-full w-full flex-col rounded-xl border border-border bg-card p-4 text-left transition-shadow hover:elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tech/12 text-tech">
                    <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-3 font-serif text-base font-semibold leading-snug text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                    {item.stage}
                  </span>
                </div>

                <span className="mt-3 text-sm font-medium text-primary group-hover:underline">
                  Saiba mais
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        {/* Praticar logo depois de ler: o jogo usa as tecnologias da linha do tempo */}
        <div className="mx-auto mt-14 max-w-3xl">
          <EraGuess />
        </div>
      </div>

      {/* Detalhe */}
      <Dialog
        open={open !== null}
        onOpenChange={(next) => {
          if (!next) setOpen(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {open ? (
            <>
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tech/12 text-tech">
                    <open.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <DialogTitle className="font-serif text-xl font-semibold">
                      {open.name}
                    </DialogTitle>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {open.category} · {open.stage}
                    </p>
                  </div>
                </div>
                <DialogDescription className="mt-3 text-pretty leading-relaxed">
                  {open.shortDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                    <Cog className="h-4 w-4 text-tech" aria-hidden="true" />
                    Como funciona
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {open.howItWorks}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <DetailList
                    icon={Lightbulb}
                    title="Aplicações"
                    items={open.applications}
                    accentClass="text-tech"
                  />
                  <DetailList
                    icon={CircleCheck}
                    title="Benefícios potenciais"
                    items={open.benefits}
                    accentClass="text-primary"
                  />
                </div>

                <DetailList
                  icon={CircleAlert}
                  title="Limitações"
                  items={open.limitations}
                  accentClass="text-earth"
                />

                <div className="rounded-xl bg-muted/60 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Exemplo de uso
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {open.useCase}
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4">
                  <TriangleAlert
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold">Cuidados: </span>
                    {open.precautions}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
