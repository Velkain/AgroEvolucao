import type { LucideIcon } from 'lucide-react'
import { WifiOff, Wallet, GraduationCap, ShieldAlert } from 'lucide-react'

export interface ChallengeGroup {
  id: string
  title: string
  icon: LucideIcon
  /** Por que estes desafios andam juntos */
  framing: string
  items: { title: string; detail: string }[]
}

/**
 * Os doze desafios agrupados por natureza. O agrupamento é conteúdo:
 * mostra que os problemas não são avulsos, têm causas comuns.
 */
export const challengeGroups: ChallengeGroup[] = [
  {
    id: 'infraestrutura',
    title: 'Infraestrutura',
    icon: WifiOff,
    framing:
      'De nada adianta o sensor se o dado não sai da lavoura, e nada funciona sem quem conserte.',
    items: [
      {
        title: 'Falta de conectividade rural',
        detail:
          'Boa parte das áreas produtivas tem cobertura de internet limitada ou instável, o que impede o envio contínuo de dados.',
      },
      {
        title: 'Manutenção de sensores',
        detail:
          'Equipamentos expostos a sol, chuva, poeira e máquinas exigem limpeza, calibração e troca de bateria com regularidade.',
      },
      {
        title: 'Equipamentos incompatíveis',
        detail:
          'Máquinas e plataformas de fabricantes diferentes nem sempre conversam entre si, o que fragmenta a informação.',
      },
      {
        title: 'Descarte de equipamentos eletrônicos',
        detail:
          'Sensores e placas contêm materiais que exigem descarte adequado. O lixo eletrônico do campo é um problema ainda pouco discutido.',
      },
    ],
  },
  {
    id: 'custo',
    title: 'Custo e acesso',
    icon: Wallet,
    framing:
      'Tecnologia cara concentra ganho em quem já tem escala e amplia a distância para o resto.',
    items: [
      {
        title: 'Investimento inicial',
        detail:
          'Equipamentos, assinaturas de serviço e adequação de máquinas representam um custo alto antes de qualquer retorno.',
      },
      {
        title: 'Acesso desigual',
        detail:
          'Pequenas e médias propriedades têm mais dificuldade de adotar as mesmas soluções, o que pode aumentar a desigualdade no campo.',
      },
      {
        title: 'Dependência de fornecedores',
        detail:
          'Quando dados e sistemas ficam presos a uma única empresa, trocar de fornecedor pode significar perder o histórico da propriedade.',
      },
    ],
  },
  {
    id: 'pessoas',
    title: 'Pessoas',
    icon: GraduationCap,
    framing:
      'A ferramenta só entrega o que promete nas mãos de quem sabe interpretar o que ela mostra.',
    items: [
      {
        title: 'Falta de capacitação',
        detail:
          'Operar o equipamento é uma coisa; entender o que o dado significa e o que fazer com ele é outra, e exige formação.',
      },
      {
        title: 'Necessidade de validação profissional',
        detail:
          'Recomendações automáticas não substituem a avaliação de um engenheiro-agrônomo ou técnico agrícola responsável.',
      },
    ],
  },
  {
    id: 'dados',
    title: 'Dados e responsabilidade',
    icon: ShieldAlert,
    framing:
      'Quando o sistema decide, alguém continua respondendo pela decisão.',
    items: [
      {
        title: 'Segurança dos dados',
        detail:
          'Dispositivos conectados são porta de entrada. Senhas padrão e software desatualizado expõem a operação inteira.',
      },
      {
        title: 'Privacidade',
        detail:
          'Informações sobre produtividade, custos e área plantada têm valor comercial. Quem pode acessá-las é uma questão em aberto.',
      },
      {
        title: 'Decisões automatizadas incorretas',
        detail:
          'Um modelo pode errar diante de uma situação que não estava nos dados de treino, e o prejuízo aparece na lavoura.',
      },
    ],
  },
]

export const challengesClosing =
  'Uma propriedade conectada precisa de máquinas e sistemas, mas também precisa de pessoas capacitadas, planejamento, manutenção e decisões responsáveis.'
