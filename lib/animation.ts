/**
 * Atraso escalonado, com teto para o último item de uma lista longa não
 * esperar demais.
 *
 * Este utilitário fica fora do módulo Client Component que renderiza Reveal
 * para também poder ser chamado durante a renderização no servidor.
 */
export function stagger(index: number, step = 0.06, max = 0.3): number {
  return Math.min(index * step, max)
}
