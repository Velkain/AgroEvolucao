'use client'

import { ChevronLeft, ChevronRight, Minimize2, MonitorPlay } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePresentation } from '@/components/presentation/presentation-provider'
import { siteSections } from '@/lib/site-data'

/** Barra de controle do modo apresentação. Só existe quando o modo está ativo. */
export function PresentationBar() {
  const {
    active,
    current,
    total,
    next,
    prev,
    exit,
    fullscreenDenied,
    hasMoreContent,
    hasPreviousContent,
  } = usePresentation()

  if (!active) return null

  const section = siteSections[current]
  const progress = ((current + 1) / total) * 100

  return (
    <div
      data-presentation-bar
      role="region"
      aria-label="Controles do modo apresentação"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div
        className="h-1 bg-primary transition-[width] duration-300"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Seção ${current + 1} de ${total}`}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />
            Seção <span data-numeric>{current + 1}</span> de{' '}
            <span data-numeric>{total}</span>
            {fullscreenDenied ? (
              <span className="font-normal normal-case tracking-normal">
                · tela cheia indisponível neste navegador
              </span>
            ) : null}
            {hasMoreContent ? (
              <span
                data-presentation-more
                className="hidden font-normal normal-case tracking-normal md:inline"
              >
                · Page Down para continuar nesta seção
              </span>
            ) : null}
          </p>
          <p
            aria-live="polite"
            className="truncate font-serif text-lg font-semibold text-foreground sm:text-xl"
          >
            {section?.presentationLabel ?? section?.label}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={current === 0 && !hasPreviousContent}
            aria-label="Voltar na apresentação"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={next}
            disabled={current === total - 1 && !hasMoreContent}
            aria-label="Avançar na apresentação"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button type="button" variant="secondary" onClick={exit}>
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>

      <p className="sr-only">
        Use as setas laterais, Page Up e Page Down para percorrer todo o
        conteúdo; se a seção for longa, ela é concluída antes da próxima.
        Pressione Esc para sair.
      </p>
    </div>
  )
}
