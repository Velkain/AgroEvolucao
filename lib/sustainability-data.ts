import type { LucideIcon } from 'lucide-react'
import { Leaf, TrendingUp, Users, Sprout } from 'lucide-react'

export interface Pillar {
  id: string
  title: string
  icon: LucideIcon
  summary: string
  items: string[]
}

export const sustainabilityPillars: Pillar[] = [
  {
    id: 'ambiental',
    title: 'Ambiental',
    icon: Leaf,
    summary: 'Produzir sem comprometer o recurso que sustenta a produção.',
    items: [
      'Uso mais planejado da água.',
      'Aplicação localizada de insumos.',
      'Monitoramento da erosão.',
      'Preservação do solo.',
      'Redução de desperdícios.',
    ],
  },
  {
    id: 'economico',
    title: 'Econômico',
    icon: TrendingUp,
    summary: 'Decidir com informação custa menos do que corrigir depois.',
    items: [
      'Melhor planejamento.',
      'Identificação antecipada de problemas.',
      'Redução de operações desnecessárias.',
      'Controle dos recursos.',
    ],
  },
  {
    id: 'social',
    title: 'Social',
    icon: Users,
    summary: 'Tecnologia que não inclui quem trabalha no campo resolve pouco.',
    items: [
      'Segurança dos trabalhadores.',
      'Capacitação.',
      'Melhores condições de trabalho.',
      'Inclusão de pequenas propriedades.',
      'Valorização do conhecimento local.',
    ],
  },
  {
    id: 'produtivo',
    title: 'Produtivo',
    icon: Sprout,
    summary: 'Previsibilidade e registro valem tanto quanto volume colhido.',
    items: [
      'Monitoramento constante.',
      'Maior previsibilidade.',
      'Rastreabilidade.',
      'Organização das operações.',
      'Apoio às decisões.',
    ],
  },
]

export const sustainabilityNote =
  'Os itens acima descrevem contribuições possíveis, não resultados garantidos. O efeito de cada tecnologia depende da cultura, do solo, do clima e de como ela é aplicada — os resultados variam conforme as condições.'
