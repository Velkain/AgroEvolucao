import type { LucideIcon } from 'lucide-react'
import { Sprout, Cog, Leaf, Satellite, Brain } from 'lucide-react'

export type TimelineTheme =
  | 'earth'
  | 'metal'
  | 'green'
  | 'digital'
  | 'future'

export interface TimelineStage {
  id: string
  number: string
  name: string
  title: string
  period: string
  shortDescription: string
  icon: LucideIcon
  theme: TimelineTheme
  /** Ilustração pintada, quando existe (etapas 1.0 a 3.0) */
  image?: string
  imageAlt?: string
  /**
   * Cena vetorial desenhada para as etapas sem arte pintada (4.0 e 5.0).
   * Fica como string para o dado atravessar a fronteira servidor→cliente;
   * o componente correspondente é resolvido em `StageArtwork`.
   */
  illustration?: 'campo-conectado' | 'campo-regenerativo'
  characteristics: string[]
  technologies: string[]
  chemistry: string[]
  benefits: string[]
  challenges: string[]
  /** Frase-síntese da etapa, destacada no topo do detalhe */
  keyMessage?: string
  /** Atividade opcional exibida no detalhe (usada na Agricultura 2.0) */
  activity?: {
    question: string
    prompt: string
    answer: string
    image: string
    imageAlt: string
  }
}

/**
 * Linha do tempo completa: Agricultura 1.0 a 5.0.
 * Conteúdo didático — sem estatísticas inventadas.
 */
export const timelineStages: TimelineStage[] = [
  {
    id: 'agricultura-1-0',
    number: '1.0',
    name: 'Agricultura 1.0',
    title: 'Agricultura 1.0 — O início da produção agrícola',
    period: 'Revolução Neolítica (Revolução Agrícola)',
    shortDescription:
      'A transição da caça e coleta para o cultivo, marcando o nascimento das primeiras comunidades sedentárias.',
    icon: Sprout,
    theme: 'earth',
    image: '/images/agricultura-1-0.webp',
    imageAlt:
      'Ilustração de cultivo primitivo com arado de madeira puxado por boi e aldeia ao fundo.',
    characteristics: [
      'Transição da caça e coleta para o cultivo.',
      'Formação de comunidades sedentárias.',
      'Produção voltada para subsistência.',
      'Trabalho manual intenso.',
      'Dependência das condições naturais.',
      'Conhecimento transmitido pela experiência.',
    ],
    technologies: [
      'Arados simples.',
      'Ferramentas de pedra e madeira.',
      'Trabalho humano.',
      'Tração animal.',
      'Irrigação rudimentar.',
      'Armazenamento simples de alimentos.',
    ],
    chemistry: [
      'Uso de esterco.',
      'Uso de cinzas.',
      'Observação empírica da fertilidade.',
      'Fermentação.',
      'Conservação de alimentos.',
      'Conhecimento tradicional sobre plantas.',
    ],
    benefits: [
      'Produção contínua de alimentos.',
      'Formação de aldeias.',
      'Desenvolvimento das primeiras civilizações.',
    ],
    challenges: [
      'Baixa produtividade.',
      'Grande esforço físico.',
      'Dependência do clima.',
      'Pouco conhecimento científico.',
    ],
  },
  {
    id: 'agricultura-2-0',
    number: '2.0',
    name: 'Agricultura 2.0',
    title: 'Agricultura 2.0 — A mecanização do campo',
    period: 'Revolução Industrial, principalmente a partir do século XIX',
    shortDescription:
      'A força animal dá lugar às máquinas, ampliando a escala e a velocidade da produção agrícola.',
    icon: Cog,
    theme: 'metal',
    image: '/images/agricultura-2-0.webp',
    imageAlt:
      'Ilustração de trator amarelo antigo puxando um arado mecânico em um grande campo.',
    characteristics: [
      'Aumento da escala de produção.',
      'Substituição gradual da força animal por máquinas.',
      'Redução de parte do trabalho manual.',
      'Maior velocidade no plantio e na colheita.',
      'Expansão do comércio agrícola.',
    ],
    technologies: [
      'Tratores.',
      'Motores a combustão.',
      'Arados mecânicos.',
      'Colheitadeiras.',
      'Semeadoras.',
      'Máquinas agrícolas.',
      'Implementos de preparação do solo.',
    ],
    chemistry: [
      'Combustíveis.',
      'Lubrificantes.',
      'Metalurgia.',
      'Tratamento de materiais.',
      'Conservação de peças.',
      'Desenvolvimento de motores.',
    ],
    benefits: [
      'Maior capacidade produtiva.',
      'Trabalho mais rápido.',
      'Cultivo de áreas maiores.',
      'Menor dependência da força humana e animal.',
    ],
    challenges: [
      'Custo das máquinas.',
      'Dependência de combustível.',
      'Compactação do solo.',
      'Necessidade de manutenção.',
    ],
    activity: {
      question: 'Você reconhece este equipamento?',
      prompt:
        'Observe a ilustração de uma grade agrícola (arado mecânico) e tente identificar sua função.',
      answer:
        'Este é um implemento agrícola utilizado para preparar e trabalhar o solo antes do plantio.',
      image: '/images/implemento-grade-agricola.webp',
      imageAlt:
        'Ilustração de uma grade agrícola com discos de aço metálicos usada para preparar o solo.',
    },
  },
  {
    id: 'agricultura-3-0',
    number: '3.0',
    name: 'Agricultura 3.0',
    title: 'Agricultura 3.0 — A Revolução Verde',
    period: 'Principalmente a partir de meados do século XX',
    shortDescription:
      'Sementes melhoradas, fertilizantes e defensivos impulsionam a produtividade sob controle técnico da produção.',
    icon: Leaf,
    theme: 'green',
    image: '/images/agricultura-3-0.webp',
    imageAlt:
      'Ilustração de lavoura verde com irrigação por aspersão e elementos de análise química do solo.',
    characteristics: [
      'Busca pelo aumento da produção.',
      'Expansão da mecanização.',
      'Melhoramento das sementes.',
      'Especialização das culturas.',
      'Uso de fertilizantes.',
      'Uso de defensivos agrícolas.',
      'Irrigação em maior escala.',
      'Controle técnico da produção.',
    ],
    technologies: [
      'Fertilizantes industriais.',
      'Defensivos agrícolas.',
      'Sistemas de irrigação.',
      'Máquinas mais eficientes.',
      'Melhoramento genético.',
      'Correção do solo.',
      'Análises laboratoriais.',
      'Rotação de culturas.',
    ],
    chemistry: [
      'Nitrogênio.',
      'Fósforo.',
      'Potássio.',
      'Controle de pH.',
      'Calcário.',
      'Fertilizantes.',
      'Herbicidas.',
      'Fungicidas.',
      'Inseticidas.',
      'Análises químicas do solo.',
    ],
    benefits: [
      'Aumento da produtividade.',
      'Maior regularidade da produção.',
      'Variedades mais produtivas.',
      'Ampliação da oferta de alimentos.',
    ],
    challenges: [
      'Uso excessivo de insumos.',
      'Contaminação do solo e da água quando há aplicação incorreta.',
      'Resistência de pragas.',
      'Perda de biodiversidade.',
      'Dependência de insumos.',
      'Necessidade de acompanhamento profissional.',
    ],
  },
  {
    id: 'agricultura-4-0',
    number: '4.0',
    name: 'Agricultura 4.0',
    title: 'Agricultura 4.0 — O campo conectado',
    period: 'Era Digital, entre o final do século XX e o século XXI',
    shortDescription:
      'Sensores, satélites e dados transformam a propriedade em um sistema monitorado, tratado região por região.',
    icon: Satellite,
    theme: 'digital',
    illustration: 'campo-conectado',
    imageAlt:
      'Ilustração de uma lavoura conectada, com satélite, drone e sensores enviando dados.',
    keyMessage:
      'Na Agricultura 4.0, o produtor deixa de tratar toda a propriedade como se fosse igual e passa a tomar decisões específicas para cada região.',
    characteristics: [
      'Uso da tecnologia da informação.',
      'Agricultura de precisão.',
      'Coleta constante de dados.',
      'Monitoramento remoto.',
      'Máquinas conectadas.',
      'Aplicação localizada de insumos.',
      'Gestão por talhões.',
      'Decisões baseadas em informações.',
    ],
    technologies: [
      'Sensores.',
      'GPS e GNSS.',
      'Drones.',
      'Satélites.',
      'Internet das Coisas.',
      'Big Data.',
      'Inteligência artificial.',
      'Máquinas conectadas.',
      'Piloto automático.',
      'Aplicação em taxa variável.',
      'Plataformas de gestão.',
      'Estações meteorológicas.',
    ],
    chemistry: [
      'Sensores de pH.',
      'Medição de umidade.',
      'Análise de nutrientes.',
      'Controle da qualidade da água.',
      'Monitoramento da fertilidade.',
      'Aplicação localizada de fertilizantes.',
      'Detecção de deficiências nutricionais.',
    ],
    benefits: [
      'Monitoramento mais preciso.',
      'Identificação antecipada de problemas.',
      'Uso mais planejado dos recursos.',
      'Registro histórico da produção.',
      'Melhor acompanhamento das operações.',
    ],
    challenges: [
      'Falta de internet no campo.',
      'Investimento inicial.',
      'Capacitação.',
      'Manutenção.',
      'Compatibilidade entre equipamentos.',
      'Segurança dos dados.',
    ],
  },
  {
    id: 'agricultura-5-0',
    number: '5.0',
    name: 'Agricultura 5.0',
    title: 'Agricultura 5.0 — O futuro sustentável e inteligente',
    period: 'Atualidade e futuro próximo',
    shortDescription:
      'Pessoas e máquinas colaboram: a tecnologia passa a servir à sustentabilidade e ao conhecimento humano.',
    icon: Brain,
    theme: 'future',
    illustration: 'campo-regenerativo',
    imageAlt:
      'Ilustração de lavoura regenerativa: uma pessoa e um robô agrícola lado a lado, com uma folha atravessada por trilhas de circuito.',
    keyMessage:
      'A Agricultura 5.0 não busca somente produzir mais. Ela busca produzir melhor, utilizando a tecnologia para apoiar as pessoas e conservar os recursos naturais.',
    characteristics: [
      'Colaboração entre pessoas e máquinas.',
      'Sustentabilidade.',
      'Resiliência climática.',
      'Agricultura regenerativa.',
      'Decisões autônomas supervisionadas.',
      'Produção personalizada.',
      'Inclusão de pequenos e médios produtores.',
      'Uso responsável da inteligência artificial.',
      'Valorização do conhecimento humano.',
    ],
    technologies: [
      'Inteligência artificial avançada.',
      'Robôs colaborativos.',
      'Veículos autônomos.',
      'Sensoriamento remoto.',
      'Internet das Coisas.',
      'Computação de borda.',
      'Gêmeos digitais.',
      'Biotecnologia.',
      'Bioinsumos.',
      'Grandes conjuntos de dados.',
      'Visão computacional.',
    ],
    chemistry: [
      'Biofertilizantes.',
      'Biodefensivos.',
      'Reaproveitamento de resíduos.',
      'Controle preciso de nutrientes.',
      'Monitoramento da qualidade do solo.',
      'Redução de aplicações desnecessárias.',
      'Avaliação da matéria orgânica.',
      'Monitoramento de carbono.',
    ],
    benefits: [
      'Maior precisão.',
      'Uso responsável de recursos.',
      'Mais segurança.',
      'Melhor rastreabilidade.',
      'Apoio à sustentabilidade.',
      'Automação de tarefas repetitivas.',
    ],
    challenges: [
      'Alto custo.',
      'Falta de capacitação.',
      'Dependência tecnológica.',
      'Segurança dos dados.',
      'Responsabilidade por decisões automatizadas.',
      'Acesso desigual às inovações.',
    ],
  },
]

export const timelineDisclaimer =
  'A classificação entre Agricultura 1.0 e Agricultura 5.0 é uma organização didática. Os períodos e características podem variar conforme a fonte utilizada.'
