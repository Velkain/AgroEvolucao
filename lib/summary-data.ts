import type { LucideIcon } from 'lucide-react'
import {
  Shovel,
  Cog,
  Tractor,
  FlaskConical,
  Cpu,
  Plane,
  Brain,
  Leaf,
} from 'lucide-react'

export interface SummaryMilestone {
  label: string
  icon: LucideIcon
  /** Etapa da linha do tempo a que pertence */
  era: string
}

/** A trajetória inteira em oito marcos, da ferramenta de pedra à sustentabilidade. */
export const summaryMilestones: SummaryMilestone[] = [
  { label: 'Ferramenta manual', icon: Shovel, era: 'Agricultura 1.0' },
  { label: 'Tração animal', icon: Cog, era: 'Agricultura 1.0' },
  { label: 'Trator', icon: Tractor, era: 'Agricultura 2.0' },
  { label: 'Fertilizante', icon: FlaskConical, era: 'Agricultura 3.0' },
  { label: 'Sensor', icon: Cpu, era: 'Agricultura 4.0' },
  { label: 'Drone', icon: Plane, era: 'Agricultura 4.0' },
  { label: 'Inteligência artificial', icon: Brain, era: 'Agricultura 5.0' },
  { label: 'Agricultura sustentável', icon: Leaf, era: 'Agricultura 5.0' },
]

export const summaryStatement =
  'Identificamos os principais marcos históricos, eventos e mudanças que influenciaram a prática agrícola desde os primeiros cultivos até os dias atuais.'

export const summaryConclusions: string[] = [
  'A agricultura evoluiu junto com a sociedade.',
  'A química participa da fertilidade, proteção, conservação e análise.',
  'Os dados ajudam a acompanhar e compreender a produção.',
  'O futuro depende da união entre tecnologia, conhecimento humano e sustentabilidade.',
]
