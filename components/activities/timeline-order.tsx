'use client'

import { useState } from 'react'
import { Check, ListOrdered, RotateCcw, Undo2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import { timelineStages, type TimelineStage } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

/**
 * Disposição inicial, determinística.
 * Sortear no primeiro render quebraria a hidratação — servidor e cliente
 * produziriam ordens diferentes. Esta permutação fixa já não é a cronológica,
 * que é tudo que a atividade precisa para começar.
 */
const ORDEM_INICIAL = [2, 0, 4, 1, 3]

function disposicaoInicial(): TimelineStage[] {
  return ORDEM_INICIAL.map((i) => timelineStages[i]).filter(Boolean)
}

/** Só a partir de um clique, nunca durante a renderização. */
function embaralhar(): TimelineStage[] {
  const copia = [...timelineStages]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  // Se o sorteio devolver a ordem correta, embaralha de novo — sem desafio não há atividade
  const jaCerta = copia.every((s, i) => s.id === timelineStages[i].id)
  return jaCerta ? embaralhar() : copia
}

/**
 * Ordenar a linha do tempo. O aluno clica nos marcos na ordem cronológica
 * e a sequência se monta à vista.
 *
 * Clique-em-ordem em vez de arrastar: funciona no toque, no teclado e no
 * leitor de tela sem nenhum trabalho extra — arrastar exigiria uma
 * alternativa acessível de qualquer jeito.
 */
export function TimelineOrder() {
  const [disponiveis, setDisponiveis] =
    useState<TimelineStage[]>(disposicaoInicial)
  const [escolhidos, setEscolhidos] = useState<TimelineStage[]>([])
  const [conferido, setConferido] = useState(false)

  const completo = escolhidos.length === timelineStages.length
  const acertos = escolhidos.filter(
    (s, i) => s.id === timelineStages[i].id,
  ).length

  function escolher(stage: TimelineStage) {
    if (conferido) return
    setEscolhidos((atual) => [...atual, stage])
    setDisponiveis((atual) => atual.filter((s) => s.id !== stage.id))
  }

  function desfazer() {
    if (conferido || escolhidos.length === 0) return
    const ultimo = escolhidos[escolhidos.length - 1]
    setEscolhidos((atual) => atual.slice(0, -1))
    setDisponiveis((atual) => [...atual, ultimo])
  }

  function recomecar() {
    setDisponiveis(embaralhar())
    setEscolhidos([])
    setConferido(false)
  }

  return (
    <div
      id="atividade-ordenar"
      className="scroll-mt-20 rounded-2xl border border-border bg-card p-6 elev-1 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2.5 font-serif text-xl font-semibold text-foreground">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ListOrdered className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          Ordene a linha do tempo
        </h3>
        {conferido ? (
          <p className="text-sm font-medium text-muted-foreground" data-numeric>
            {acertos} de {timelineStages.length} na posição certa
          </p>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Clique nas etapas na ordem cronológica, da mais antiga para a mais
        recente.
      </p>

      {/* Sequência montada */}
      <ol className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: timelineStages.length }).map((_, posicao) => {
          const stage = escolhidos[posicao]
          const certo = conferido && stage?.id === timelineStages[posicao].id
          const errado = conferido && stage && !certo

          return (
            <li
              key={posicao}
              className={cn(
                'flex min-w-28 flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-center font-serif text-lg font-bold transition-colors',
                !stage && 'border-dashed border-border text-muted-foreground/50',
                stage && !conferido && 'border-border bg-muted text-foreground',
                certo && 'border-primary bg-primary/10 text-primary',
                errado && 'border-earth bg-earth/10 text-earth',
              )}
            >
              {certo ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              {errado ? <X className="h-4 w-4" aria-hidden="true" /> : null}
              {stage ? stage.number : posicao + 1}
            </li>
          )
        })}
      </ol>

      {/* Marcos ainda não usados */}
      {disponiveis.length > 0 ? (
        <div
          role="group"
          aria-label="Etapas disponíveis para ordenar"
          className="mt-5 flex flex-wrap gap-2"
        >
          {disponiveis.map((stage) => {
            const theme = stageThemeMap[stage.theme]
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => escolher(stage)}
                className={cn(
                  'rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  theme.border,
                )}
              >
                <span className={cn('font-serif font-bold', theme.text)}>
                  {stage.number}
                </span>
                <span className="ml-2 text-foreground">{stage.name}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      {conferido ? (
        <p
          aria-live="polite"
          className={cn(
            'mt-5 rounded-xl border p-4 text-sm leading-relaxed',
            acertos === timelineStages.length
              ? 'border-primary/30 bg-primary/5 text-foreground'
              : 'border-earth/30 bg-earth/5 text-foreground',
          )}
        >
          {acertos === timelineStages.length
            ? 'Ordem correta. A sequência vai do trabalho manual à colaboração entre pessoas e máquinas.'
            : 'Algumas posições ficaram trocadas. As marcadas em vermelho não estão no lugar — a linha do tempo acima da página mostra a ordem.'}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {!conferido ? (
          <>
            <Button
              type="button"
              onClick={() => setConferido(true)}
              disabled={!completo}
            >
              Conferir
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={desfazer}
              disabled={escolhidos.length === 0}
            >
              <Undo2 className="h-4 w-4" aria-hidden="true" />
              Desfazer
            </Button>
          </>
        ) : (
          <Button type="button" onClick={recomecar}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Tentar de novo
          </Button>
        )}
      </div>
    </div>
  )
}
