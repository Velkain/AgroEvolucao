import type { LucideIcon } from 'lucide-react'
import {
  Sprout,
  FlaskConical,
  Cpu,
  Tractor,
  Leaf,
  Brain,
  History,
  Wheat,
  Droplets,
  Satellite,
} from 'lucide-react'

/** Identidade textual do projeto */
export const siteConfig = {
  name: 'AgroEvolução',
  subtitle: 'Do arado à inteligência artificial',
  academicYear: '2026',
} as const

/** Informações editáveis exibidas no rodapé */
export const projectInfo = {
  school: 'Colégio Estadual Cleoracy Aparecida Gil',
  schoolAddress:
    'R. Francisco Barroso, 280 - Jardim Padre Ivo, Douradina - PR, 87485-000',
  grade: '3ª série',
  members: '12 integrantes',
  teacher: 'Daniele Gomes da Silva Lima',
} as const

/** Estudantes responsáveis pelo projeto */
export const groupMembers = [
  'Emanuel Viero',
  'Felipe Gabriel',
  'Gabriel Pereira',
  'João Gabriel',
  'João Pedro Francelino',
  'José Vinicius',
  'Kauan Henrique',
  'Murilo Sarti',
  'Rafael Akira',
  'Tiago Borba',
  'Victor Augusto',
  'Victor Daniel',
] as const

export interface SiteSection {
  id: string
  label: string
  /** Rótulo longo usado no modo apresentação, onde há espaço */
  presentationLabel?: string
  /** Se aparece na barra de navegação. Fora dela, ainda é seção. */
  inNav: boolean
}

/**
 * Todas as seções do documento, em ordem.
 * Fonte única da verdade para três coisas ao mesmo tempo: o menu, o destaque
 * da seção ativa e a sequência do modo apresentação. Um id daqui precisa
 * existir como id de elemento na página.
 */
export const siteSections: SiteSection[] = [
  { id: 'inicio', label: 'Início', inNav: true },
  {
    id: 'objetivo',
    label: 'Objetivo',
    presentationLabel: 'Objetivo da apresentação',
    inNav: false,
  },
  { id: 'introducao', label: 'Introdução', inNav: false },
  {
    id: 'evolucao',
    label: 'Evolução',
    presentationLabel: 'Evolução da agricultura',
    inNav: true,
  },
  {
    id: 'dados',
    label: 'Dados',
    presentationLabel: 'Como os dados ajudam o produtor',
    inNav: true,
  },
  {
    id: 'caso-decisao',
    label: 'Caso prático',
    presentationLabel: 'Do sensor à decisão',
    inNav: false,
  },
  {
    id: 'quimica',
    label: 'Química',
    presentationLabel: 'A química no campo',
    inNav: true,
  },
  {
    id: 'tecnologias',
    label: 'Tecnologias',
    presentationLabel: 'Tecnologias que transformam o campo',
    inNav: true,
  },
  {
    /* Rótulo curto no menu: "Fazenda inteligente" é o link mais largo dos onze
       e sozinho empurrava a barra para fora. A seção mantém o título completo. */
    id: 'fazenda-inteligente',
    label: 'Fazenda',
    presentationLabel: 'Demonstração de fazenda inteligente',
    inNav: true,
  },
  { id: 'sustentabilidade', label: 'Sustentabilidade', inNav: true },
  {
    id: 'desafios',
    label: 'Desafios',
    presentationLabel: 'Desafios da agricultura digital',
    inNav: true,
  },
  {
    id: 'atividades',
    label: 'Atividades',
    presentationLabel: 'Atividades interativas',
    inNav: true,
  },
  { id: 'quiz', label: 'Quiz', inNav: true },
  { id: 'resumo', label: 'Resumo', inNav: true },
  {
    id: 'referencias',
    label: 'Referências',
    presentationLabel: 'Fontes e referências',
    inNav: true,
  },
  {
    id: 'integrantes',
    label: 'Integrantes',
    presentationLabel: 'Integrantes do grupo',
    inNav: false,
  },
  {
    id: 'slides-agrobot',
    label: 'AgroBot',
    presentationLabel: 'Apresentação complementar do AgroBot Vision',
    inNav: false,
  },
]

/** Subconjunto exibido no menu. Derivado, nunca mantido em paralelo. */
export const navLinks = siteSections
  .filter((section) => section.inNav)
  .map((section) => ({ label: section.label, href: `#${section.id}` }))

/** Tags exibidas no hero */
export const heroTags: string[] = [
  'História',
  'Agricultura',
  'Tecnologia',
  'Química',
  'Sustentabilidade',
  'Inteligência artificial',
]

/** Cards do objetivo da apresentação */
export const objectiveCards: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: History,
    title: 'Entender a evolução histórica',
    description:
      'Compreender como a agricultura se transformou desde os primeiros cultivos até os dias atuais.',
  },
  {
    icon: FlaskConical,
    title: 'Reconhecer tecnologia e química',
    description:
      'Identificar a participação da tecnologia e da química no aumento e na qualidade da produção.',
  },
  {
    icon: Leaf,
    title: 'Refletir sobre o futuro sustentável',
    description:
      'Pensar em como produzir alimentos preservando os recursos naturais para as próximas gerações.',
  },
]

/** Comparação passado x presente da introdução */
export const introComparison: {
  past: { icon: LucideIcon; label: string }[]
  present: { icon: LucideIcon; label: string }[]
} = {
  past: [
    { icon: Sprout, label: 'Trabalho manual' },
    { icon: Tractor, label: 'Tração animal' },
    { icon: History, label: 'Decisões baseadas na observação' },
    { icon: Wheat, label: 'Produção em menor escala' },
    { icon: Droplets, label: 'Maior dependência do clima' },
  ],
  present: [
    { icon: Tractor, label: 'Máquinas agrícolas' },
    { icon: Cpu, label: 'Sensores' },
    { icon: Droplets, label: 'Dados meteorológicos' },
    { icon: Satellite, label: 'Satélites e drones' },
    { icon: Brain, label: 'Inteligência artificial' },
  ],
}

/**
 * Todas as seções que antes eram espaço reservado agora existem como conteúdo.
 * O array de placeholders foi removido de propósito: enquanto ele existia, cada
 * seção construída duplicava o id do seu placeholder — foi assim que
 * `referencias` acabou aparecendo duas vezes no documento.
 */
