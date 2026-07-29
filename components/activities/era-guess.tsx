'use client'

import { useState } from 'react'
import { Check, RotateCcw, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import { timelineStages } from '@/lib/timeline-data'
import {
  eraQuizItems,
  eraOptions,
  initialRound,
  ROUND_SIZE,
  type EraQuizItem,
} from '@/lib/era-quiz-data'
import { cn } from '@/lib/utils'

/**
 * Sorteia ROUND_SIZE itens distintos.
 * Só é chamada a partir de um clique — nunca durante a renderização, porque
 * `Math.random()` no primeiro render quebra a hidratação.
 */
function sortear(): EraQuizItem[] {
  const copia = [...eraQuizItems]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia.slice(0, ROUND_SIZE)
}

const eraPorNumero = new Map(timelineStages.map((s) => [s.number, s]))

export function EraGuess() {
  const [rodada, setRodada] = useState<EraQuizItem[]>(initialRound)
  const [indice, setIndice] = useState(0)
  const [escolha, setEscolha] = useState<string | null>(null)
  const [acertos, setAcertos] = useState(0)

  const item = rodada[indice]
  const respondeu = escolha !== null
  const acertou = escolha === item?.era
  const terminou = indice >= rodada.length

  function responder(era: string) {
    if (respondeu) return
    setEscolha(era)
    if (era === item.era) setAcertos((n) => n + 1)
  }

  function avancar() {
    setEscolha(null)
    setIndice((n) => n + 1)
  }

  function recomecar() {
    setRodada(sortear())
    setIndice(0)
    setEscolha(null)
    setAcertos(0)
  }

  return (
    <div
      id="atividade-eras"
      className="scroll-mt-20 rounded-2xl border border-border bg-card p-6 elev-1 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 font-serif text-xl font-semibold text-foreground">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          De que era é isso?
        </h3>
        <p className="text-sm text-muted-foreground" data-numeric>
          {terminou ? rodada.length : indice + 1} de {rodada.length} ·{' '}
          {acertos} {acertos === 1 ? 'acerto' : 'acertos'}
        </p>
      </div>

      {terminou ? (
        <div className="mt-6 text-center">
          <p className="font-serif text-2xl font-semibold text-foreground">
            Você acertou {acertos} de {rodada.length}
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {acertos === rodada.length
              ? 'Todas certas. Vale jogar de novo — o sorteio muda os itens.'
              : 'Cada tecnologia aparece na etapa em que se consolidou. Volte à linha do tempo para conferir as que escaparam.'}
          </p>
          <Button type="button" onClick={recomecar} className="mt-6">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Jogar de novo
          </Button>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            Em qual etapa da agricultura esta tecnologia se consolidou?
          </p>

          <p
            aria-live="polite"
            className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl"
          >
            {item.label}
          </p>

          <div
            role="group"
            aria-label="Escolha a etapa"
            className="mt-6 flex flex-wrap gap-2"
          >
            {eraOptions.map((era) => {
              const stage = eraPorNumero.get(era)
              const theme = stage ? stageThemeMap[stage.theme] : null
              const isCerta = respondeu && era === item.era
              const isErrada = respondeu && era === escolha && !acertou

              return (
                <button
                  key={era}
                  type="button"
                  onClick={() => responder(era)}
                  disabled={respondeu}
                  aria-label={`Agricultura ${era}`}
                  className={cn(
                    'flex min-w-24 flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 font-serif text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    isCerta && 'border-primary bg-primary text-primary-foreground',
                    isErrada && 'border-earth bg-earth text-earth-foreground',
                    !isCerta &&
                      !isErrada &&
                      respondeu &&
                      'border-border text-muted-foreground opacity-60',
                    !respondeu &&
                      cn('border-border hover:bg-muted', theme?.text),
                  )}
                >
                  {isCerta ? <Check className="h-4 w-4" /> : null}
                  {isErrada ? <X className="h-4 w-4" /> : null}
                  {era}
                </button>
              )
            })}
          </div>

          {respondeu ? (
            <div
              aria-live="polite"
              className={cn(
                'mt-5 rounded-xl border p-4',
                acertou
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-earth/30 bg-earth/5',
              )}
            >
              <p
                className={cn(
                  'font-semibold',
                  acertou ? 'text-primary' : 'text-earth',
                )}
              >
                {acertou
                  ? 'Isso mesmo.'
                  : `Era a Agricultura ${item.era}.`}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {eraPorNumero.get(item.era)?.title}
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={avancar}
                className="mt-4"
              >
                {indice + 1 >= rodada.length ? 'Ver resultado' : 'Próxima'}
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
