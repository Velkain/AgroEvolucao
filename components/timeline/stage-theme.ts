import type { TimelineTheme } from '@/lib/timeline-data'

export interface StageThemeClasses {
  /** Marcador redondo (nó): texto POR CIMA da cor preenchida → usa `-foreground` */
  marker: string
  /** Fundo suave para blocos internos */
  soft: string
  /**
   * Cor de texto sobre a superfície da página → usa `-ink`, nunca `-foreground`.
   * `-foreground` é feito para contrastar com a cor cheia, não com o card:
   * `text-wheat-foreground` sobre card escuro rende 1,01:1, ou seja, invisível.
   */
  text: string
  /** Borda de destaque */
  border: string
  /** Faixa/etiqueta do período */
  chip: string
}

export const stageThemeMap: Record<TimelineTheme, StageThemeClasses> = {
  earth: {
    marker: 'bg-earth text-earth-foreground',
    soft: 'bg-earth/10',
    text: 'text-earth',
    border: 'border-earth/30',
    chip: 'bg-earth/10 text-earth',
  },
  metal: {
    marker: 'bg-wheat text-wheat-foreground',
    soft: 'bg-wheat/10',
    text: 'text-wheat-ink',
    border: 'border-wheat/40',
    chip: 'bg-wheat/15 text-wheat-ink',
  },
  green: {
    marker: 'bg-primary text-primary-foreground',
    soft: 'bg-leaf/10',
    text: 'text-primary',
    border: 'border-primary/25',
    chip: 'bg-primary/10 text-primary',
  },
  /* Agricultura 4.0 — o campo conectado. Primeira etapa fria do eixo. */
  digital: {
    marker: 'bg-tech text-tech-foreground',
    soft: 'bg-tech/10',
    text: 'text-tech',
    border: 'border-tech/30',
    chip: 'bg-tech/12 text-tech',
  },
  /* Agricultura 5.0 — reencontro de natureza e técnica: folha sobre frio. */
  future: {
    marker: 'bg-leaf text-primary-foreground',
    soft: 'bg-leaf/10',
    text: 'text-leaf-ink',
    border: 'border-leaf/35',
    chip: 'bg-leaf/12 text-leaf-ink',
  },
}
