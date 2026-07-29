import { timelineStages } from '@/lib/timeline-data'

export interface EraQuizItem {
  /** Nome da tecnologia, sem o ponto final da lista de origem */
  label: string
  /** Número da etapa a que pertence: '1.0' … '5.0' */
  era: string
}

/**
 * Itens do jogo "De que era é isso?", derivados das tecnologias já escritas
 * em cada etapa da linha do tempo. Nenhum conteúdo novo é inventado aqui.
 *
 * Tecnologias que aparecem em mais de uma etapa são descartadas: se
 * "Internet das Coisas" está na 4.0 e na 5.0, não existe resposta certa e o
 * jogo ficaria injusto. O descarte é calculado, não uma lista fixa — se o
 * conteúdo da linha do tempo mudar, a regra continua valendo.
 */
function buildItems(): EraQuizItem[] {
  const ocorrencias = new Map<string, Set<string>>()

  for (const stage of timelineStages) {
    for (const raw of stage.technologies) {
      const label = raw.replace(/\.$/, '').trim()
      const eras = ocorrencias.get(label) ?? new Set<string>()
      eras.add(stage.number)
      ocorrencias.set(label, eras)
    }
  }

  return [...ocorrencias.entries()]
    .filter(([, eras]) => eras.size === 1)
    .map(([label, eras]) => ({ label, era: [...eras][0] }))
}

export const eraQuizItems: EraQuizItem[] = buildItems()

/** As cinco alternativas, na ordem cronológica. */
export const eraOptions: string[] = timelineStages.map((s) => s.number)

/** Quantas perguntas uma rodada tem. */
export const ROUND_SIZE = 8

/**
 * Primeira rodada, determinística.
 *
 * Não pode sortear: `Math.random()` na renderização inicial produz listas
 * diferentes no servidor e no cliente, e o React acusa erro de hidratação.
 * Em vez de pegar os 8 primeiros — que cairiam todos na 1.0 e 2.0 —, percorre
 * os itens em passos regulares, o que espalha as eras sem usar acaso.
 */
export function initialRound(): EraQuizItem[] {
  const passo = Math.max(1, Math.floor(eraQuizItems.length / ROUND_SIZE))
  const escolhidos: EraQuizItem[] = []
  for (let i = 0; escolhidos.length < ROUND_SIZE && i < eraQuizItems.length; i += passo) {
    escolhidos.push(eraQuizItems[i])
  }
  return escolhidos
}
