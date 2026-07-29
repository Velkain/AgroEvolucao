import type { LucideIcon } from 'lucide-react'
import {
  Gauge,
  Atom,
  FlaskConical,
  Droplets,
  Recycle,
  ShieldAlert,
  Bug,
  Cpu,
  Layers,
  Snowflake,
} from 'lucide-react'

export interface ChemistryTopic {
  id: string
  title: string
  icon: LucideIcon
  /** Explicação simples do conceito */
  explanation: string
  /** Exemplo prático e concreto */
  example: string
  /** Por que isso importa para quem produz */
  relevance: string
  /** Curiosidade que amarra o conceito */
  didYouKnow: string
}

/**
 * A química no campo — conteúdo didático de nível médio.
 * Regras herdadas do PRODUCT.md: nada de estatística inventada e, por decisão
 * pedagógica do projeto, nenhuma dose ou recomendação de aplicação.
 */
export const chemistryTopics: ChemistryTopic[] = [
  {
    id: 'ph',
    title: 'Solo e pH',
    icon: Gauge,
    explanation:
      'O pH mede se uma solução é ácida, neutra ou alcalina, numa escala que vai de 0 a 14. No solo, ele descreve a concentração de íons hidrogênio na solução que banha as raízes.',
    example:
      'Um solo muito ácido pode manter o alumínio em forma solúvel, o que prejudica o crescimento das raízes. A calagem, que aplica calcário, é a prática usada para elevar o pH.',
    relevance:
      'O pH influencia a disponibilidade dos nutrientes. Um solo muito ácido ou muito alcalino pode dificultar a absorção de determinados elementos pelas plantas, mesmo que eles estejam presentes.',
    didYouKnow:
      'A escala de pH é logarítmica: cada unidade a menos significa dez vezes mais íons hidrogênio. Um solo de pH 5 é dez vezes mais ácido que um de pH 6.',
  },
  {
    id: 'npk',
    title: 'Nitrogênio, fósforo e potássio',
    icon: Atom,
    explanation:
      'São os três macronutrientes exigidos em maior quantidade pelas plantas, representados pela sigla NPK. Cada um participa de processos diferentes dentro do vegetal.',
    example:
      'O nitrogênio compõe aminoácidos e a clorofila; o fósforo participa do ATP, a molécula que transporta energia; o potássio atua na regulação da abertura dos estômatos.',
    relevance:
      'Nitrogênio está relacionado ao crescimento vegetativo. Fósforo, às raízes e à transferência de energia. Potássio, ao equilíbrio hídrico e à resistência da planta.',
    didYouKnow:
      'O nitrogênio é o gás mais abundante da atmosfera, mas as plantas não conseguem usá-lo na forma N₂. Ele precisa ser transformado, seja por bactérias fixadoras, seja industrialmente.',
  },
  {
    id: 'fertilizantes',
    title: 'Fertilizantes',
    icon: FlaskConical,
    explanation:
      'São materiais que fornecem nutrientes às plantas. Podem ser minerais, obtidos por processos industriais ou de jazidas, ou orgânicos, vindos de matéria de origem animal ou vegetal.',
    example:
      'A ureia é uma fonte nitrogenada amplamente usada. No solo, ela sofre hidrólise e libera amônia, que pode se perder para o ar se as condições favorecerem a volatilização.',
    relevance:
      'Repor nutrientes retirados pelas colheitas permite manter a produção ao longo dos anos. A forma química e o momento da aplicação afetam quanto do nutriente a planta realmente aproveita.',
    didYouKnow:
      'A síntese industrial da amônia a partir do nitrogênio do ar, desenvolvida no início do século XX, é uma das reações químicas que mais transformaram a produção de alimentos.',
  },
  {
    id: 'agua',
    title: 'Água',
    icon: Droplets,
    explanation:
      'A água é o solvente da vida vegetal: os nutrientes só chegam às raízes dissolvidos nela. Sua molécula polar explica por que tantos sais se dissolvem com facilidade.',
    example:
      'Um fertilizante sólido aplicado em solo seco pouco se movimenta. Só depois que a umidade dissolve os sais é que os íons ficam disponíveis para as raízes.',
    relevance:
      'Sem água não há transporte de nutriente. A qualidade da água também importa: excesso de sais pode prejudicar a cultura e alterar o solo ao longo do tempo.',
    didYouKnow:
      'A planta usa uma fração pequena da água que absorve na fotossíntese. A maior parte atravessa o vegetal e sai pelas folhas na transpiração, puxando nutrientes junto.',
  },
  {
    id: 'materia-organica',
    title: 'Matéria orgânica',
    icon: Recycle,
    explanation:
      'É o conjunto de restos vegetais e animais em decomposição no solo, junto com os compostos estáveis resultantes desse processo, conhecidos como húmus.',
    example:
      'A palhada deixada sobre o solo no plantio direto se decompõe lentamente, liberando nutrientes e protegendo a superfície do impacto da chuva.',
    relevance:
      'Melhora a estrutura do solo, aumenta a retenção de água e funciona como reserva de nutrientes que vão sendo liberados aos poucos pela decomposição.',
    didYouKnow:
      'A matéria orgânica do solo é um dos maiores reservatórios de carbono do planeta — por isso práticas que a conservam entram nas discussões sobre clima.',
  },
  {
    id: 'defensivos',
    title: 'Defensivos agrícolas',
    icon: ShieldAlert,
    explanation:
      'São substâncias usadas para controlar organismos que atacam as lavouras. Dividem-se conforme o alvo: herbicidas para plantas daninhas, fungicidas para fungos, inseticidas para insetos.',
    example:
      'Um herbicida seletivo age sobre uma rota bioquímica presente na planta daninha e ausente ou pouco sensível na cultura, o que permite tratar a lavoura sem destruí-la.',
    relevance:
      'Permitem reduzir perdas na produção, mas exigem critério: uso incorreto pode contaminar solo e água, além de favorecer o surgimento de populações resistentes.',
    didYouKnow:
      'O uso repetido de produtos com o mesmo mecanismo de ação seleciona indivíduos resistentes. Alternar mecanismos é uma estratégia para retardar esse processo.',
  },
  {
    id: 'controle-biologico',
    title: 'Controle biológico',
    icon: Bug,
    explanation:
      'Usa organismos vivos — insetos, fungos ou bactérias — para controlar pragas, em vez de recorrer apenas a moléculas sintéticas.',
    example:
      'Fungos e bactérias que atacam especificamente determinadas pragas podem ser multiplicados e aplicados na lavoura como bioinsumos.',
    relevance:
      'Pode reduzir a dependência de defensivos sintéticos e a pressão de seleção por resistência. Costuma exigir mais planejamento e conhecimento do ciclo dos organismos.',
    didYouKnow:
      'Muitos bioinsumos dependem de temperatura e umidade adequadas para funcionar, o que liga o controle biológico diretamente ao monitoramento climático.',
  },
  {
    id: 'sensores-quimicos',
    title: 'Sensores químicos',
    icon: Cpu,
    explanation:
      'São dispositivos que convertem uma propriedade química em sinal elétrico. Um eletrodo de pH, por exemplo, gera uma diferença de potencial que varia com a acidez.',
    example:
      'Sensores instalados no solo podem acompanhar umidade e condutividade elétrica, e essa condutividade dá indícios sobre a concentração de sais dissolvidos.',
    relevance:
      'Transformam análise química em dado contínuo. É o que permite à Agricultura 4.0 tratar cada talhão de forma diferente em vez de tratar a fazenda inteira como um bloco.',
    didYouKnow:
      'Nem tudo se mede por sensor de campo. Determinações de nutrientes ainda dependem de análise laboratorial para resultados confiáveis.',
  },
  {
    id: 'qualidade-solo',
    title: 'Qualidade do solo',
    icon: Layers,
    explanation:
      'Reúne características químicas, físicas e biológicas: acidez, disponibilidade de nutrientes, estrutura, porosidade e atividade dos organismos que vivem nele.',
    example:
      'A análise de solo mede pH, teores de nutrientes e capacidade de troca catiônica, que indica quanto o solo consegue reter íons disponíveis para as plantas.',
    relevance:
      'É a base de qualquer decisão de manejo. Sem saber o estado do solo, correções e adubações viram tentativa e erro.',
    didYouKnow:
      'A capacidade de troca catiônica depende muito da argila e da matéria orgânica: solos arenosos e pobres em matéria orgânica retêm menos nutrientes.',
  },
  {
    id: 'conservacao',
    title: 'Conservação de alimentos',
    icon: Snowflake,
    explanation:
      'Depois da colheita, a química continua atuando: reações de oxidação, ação de enzimas e crescimento de micro-organismos continuam alterando o alimento.',
    example:
      'O escurecimento de uma fruta cortada vem da ação de enzimas na presença de oxigênio. Refrigerar desacelera essas reações, mas não as interrompe.',
    relevance:
      'Boa parte do que se produz pode se perder entre a colheita e a mesa. Técnicas de conservação preservam o alimento e o trabalho investido nele.',
    didYouKnow:
      'Salgar e defumar são técnicas milenares de conservação. As duas atuam reduzindo a água disponível para os micro-organismos — química aplicada muito antes de existir a palavra química.',
  },
]

export const chemistryIntro =
  'A química não entra na agricultura só na fase dos fertilizantes. Ela está na acidez do solo, na água que transporta os nutrientes, na molécula que protege a lavoura e na reação que estraga o alimento depois da colheita.'
