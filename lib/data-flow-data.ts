import type { LucideIcon } from 'lucide-react'
import {
  Thermometer,
  RadioTower,
  Cpu,
  ClipboardList,
  Tractor,
  Sprout,
} from 'lucide-react'

export interface FlowStep {
  id: string
  label: string
  icon: LucideIcon
  /** O que acontece nesta etapa */
  description: string
  /** Equipamentos ou agentes envolvidos */
  actors: string[]
}

/** Coleta → Transmissão → Análise → Recomendação → Ação → Resultado */
export const dataFlowSteps: FlowStep[] = [
  {
    id: 'coleta',
    label: 'Coleta',
    icon: Thermometer,
    description:
      'Sensores no solo, estação meteorológica e imagens de drone ou satélite registram a condição atual da lavoura.',
    actors: ['Sensor no solo', 'Estação meteorológica', 'Drone ou satélite'],
  },
  {
    id: 'transmissao',
    label: 'Transmissão',
    icon: RadioTower,
    description:
      'As leituras saem do campo por rede sem fio e chegam a um sistema que as armazena.',
    actors: ['Rede de transmissão'],
  },
  {
    id: 'analise',
    label: 'Análise',
    icon: Cpu,
    description:
      'O sistema cruza o dado novo com o histórico da área e com a previsão do tempo, procurando o que mudou.',
    actors: ['Sistema de análise', 'Dados históricos'],
  },
  {
    id: 'recomendacao',
    label: 'Recomendação',
    icon: ClipboardList,
    description:
      'O painel apresenta ao produtor o que foi observado e qual ação a regra sugere, com a justificativa.',
    actors: ['Painel do produtor'],
  },
  {
    id: 'acao',
    label: 'Ação',
    icon: Tractor,
    description:
      'A pessoa avalia a sugestão junto do que conhece da lavoura e decide. Só então a máquina ou a irrigação é acionada.',
    actors: ['Máquina ou irrigação'],
  },
  {
    id: 'resultado',
    label: 'Resultado',
    icon: Sprout,
    description:
      'O efeito aparece na plantação e volta a ser medido, alimentando o histórico da próxima decisão.',
    actors: ['Resultado na plantação'],
  },
]

export interface FlowExampleLine {
  step: string
  text: string
}

/** Exemplo concreto que percorre o ciclo inteiro. */
export const dataFlowExample: FlowExampleLine[] = [
  { step: 'Coleta', text: 'Um sensor identifica baixa umidade no solo.' },
  {
    step: 'Coleta',
    text: 'A estação meteorológica indica possibilidade de chuva.',
  },
  { step: 'Análise', text: 'O sistema consulta os dados históricos da área.' },
  { step: 'Análise', text: 'As informações são analisadas em conjunto.' },
  { step: 'Recomendação', text: 'O produtor recebe uma recomendação.' },
  { step: 'Ação', text: 'Ele decide se deve irrigar ou aguardar.' },
  { step: 'Resultado', text: 'O resultado é registrado e vira histórico.' },
]

export const dataFlowHighlight =
  'A tecnologia apoia a decisão, mas a avaliação humana continua sendo importante.'
