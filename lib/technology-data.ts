import type { LucideIcon } from 'lucide-react'
import {
  Droplets,
  CloudSun,
  Plane,
  Satellite,
  Navigation,
  SlidersHorizontal,
  Brain,
  Eye,
  Truck,
  Bot,
  Wifi,
  Database,
  Leaf,
  Route,
  Waves,
  Bug,
} from 'lucide-react'

export const technologyCategories = [
  'Monitoramento',
  'Máquinas',
  'Dados',
  'Sustentabilidade',
  'Biotecnologia',
  'Automação',
] as const

export type TechnologyCategory = (typeof technologyCategories)[number]

export interface Technology {
  id: string
  name: string
  icon: LucideIcon
  category: TechnologyCategory
  /** Etapa da linha do tempo em que a tecnologia se consolida */
  stage: string
  shortDescription: string
  howItWorks: string
  applications: string[]
  benefits: string[]
  limitations: string[]
  useCase: string
  precautions: string
}

/** Conteúdo didático — sem estatísticas, marcas ou produtos específicos. */
export const technologies: Technology[] = [
  {
    id: 'sensor-umidade',
    name: 'Sensor de umidade',
    icon: Droplets,
    category: 'Monitoramento',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Mede quanta água há no solo e em qual profundidade ela está disponível.',
    howItWorks:
      'A maioria dos sensores mede uma propriedade elétrica do solo, como a constante dielétrica ou a resistência, que varia conforme o teor de água. O valor medido é convertido em umidade volumétrica.',
    applications: [
      'Decisão sobre quando irrigar.',
      'Acompanhamento da água disponível em diferentes profundidades.',
      'Identificação de camadas compactadas que retêm ou barram água.',
    ],
    benefits: [
      'Substitui a avaliação apenas visual do solo.',
      'Permite acompanhar a variação ao longo do dia.',
      'Ajuda a evitar irrigação desnecessária.',
    ],
    limitations: [
      'Mede apenas o ponto onde está instalado.',
      'Precisa de calibração conforme o tipo de solo.',
      'Sofre com falhas de contato entre sensor e solo.',
    ],
    useCase:
      'Vários sensores instalados em profundidades diferentes mostram se a água da última chuva chegou à zona de raízes ou ficou retida na superfície.',
    precautions:
      'Um único sensor não representa a lavoura inteira. A leitura precisa ser interpretada junto do tipo de solo e do estágio da cultura.',
  },
  {
    id: 'estacao-meteorologica',
    name: 'Estação meteorológica',
    icon: CloudSun,
    category: 'Monitoramento',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Registra temperatura, umidade do ar, chuva e vento no local da propriedade.',
    howItWorks:
      'Reúne vários sensores num mesmo ponto e registra as medições em intervalos regulares. Os dados podem ficar armazenados no equipamento ou ser transmitidos para uma plataforma.',
    applications: [
      'Registro histórico do clima da propriedade.',
      'Apoio à decisão sobre pulverização e irrigação.',
      'Alerta para condições favoráveis a doenças.',
    ],
    benefits: [
      'Dado do próprio local, não de uma cidade distante.',
      'Permite comparar safras diferentes.',
      'Serve de base para modelos de previsão.',
    ],
    limitations: [
      'Exige manutenção e limpeza dos sensores.',
      'Uma estação pode não representar propriedades muito extensas.',
      'Depende de energia e, para envio remoto, de conexão.',
    ],
    useCase:
      'O registro de chuva acumulada ajuda a entender por que dois talhões vizinhos responderam de forma diferente à mesma adubação.',
    precautions:
      'A posição da estação afeta a medição. Instalada perto de construções ou árvores, registra um microclima e não a condição da lavoura.',
  },
  {
    id: 'drone',
    name: 'Drone agrícola',
    icon: Plane,
    category: 'Monitoramento',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Sobrevoa a lavoura captando imagens detalhadas em diferentes faixas de luz.',
    howItWorks:
      'Câmeras acopladas registram imagens em faixas visíveis e, em alguns casos, no infravermelho próximo. A comparação entre faixas gera índices que indicam o vigor da vegetação.',
    applications: [
      'Identificação de falhas de plantio.',
      'Mapeamento de áreas com vigor diferente.',
      'Acompanhamento após eventos climáticos.',
    ],
    benefits: [
      'Resolução maior que a de imagens de satélite.',
      'Voo pode ser feito quando o produtor precisar.',
      'Enxerga padrões invisíveis do nível do solo.',
    ],
    limitations: [
      'Autonomia de voo limitada.',
      'Depende de condições de vento e luz.',
      'Uso é regulamentado e exige cumprir as regras vigentes.',
    ],
    useCase:
      'Um voo revela uma faixa de menor vigor que segue exatamente o trajeto de uma tubulação antiga enterrada, indicando um problema de solo e não de praga.',
    precautions:
      'A imagem mostra que existe uma diferença, não qual é a causa. A checagem em campo continua necessária.',
  },
  {
    id: 'satelite',
    name: 'Imagens de satélite',
    icon: Satellite,
    category: 'Monitoramento',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Acompanha grandes áreas ao longo do tempo com passagens periódicas.',
    howItWorks:
      'Sensores em órbita registram a radiação refletida pela superfície. Como cada satélite repassa sobre a mesma área em intervalos regulares, formam-se séries históricas.',
    applications: [
      'Acompanhamento do desenvolvimento da cultura ao longo da safra.',
      'Comparação entre safras.',
      'Delimitação de zonas de manejo dentro de um talhão.',
    ],
    benefits: [
      'Cobre áreas extensas de uma vez.',
      'Muitas coleções de imagens são de acesso público.',
      'Permite olhar para o passado da área.',
    ],
    limitations: [
      'Nuvens bloqueiam a imagem óptica.',
      'Resolução menor que a do drone.',
      'A frequência de passagem é fixa.',
    ],
    useCase:
      'Séries de imagens de safras anteriores ajudam a decidir onde dividir um talhão em zonas de manejo distintas.',
    precautions:
      'Datas com nuvem precisam ser descartadas. Comparar imagens de estágios diferentes da cultura leva a conclusões erradas.',
  },
  {
    id: 'gps-gnss',
    name: 'GPS e GNSS',
    icon: Navigation,
    category: 'Dados',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Determina a posição das máquinas e amarra cada dado coletado a um ponto do mapa.',
    howItWorks:
      'O receptor calcula sua posição a partir do tempo que os sinais de vários satélites levam para chegar até ele. Correções enviadas por bases ou serviços aumentam a precisão.',
    applications: [
      'Georreferenciamento de amostras de solo.',
      'Orientação de máquinas no campo.',
      'Registro do trajeto das operações.',
    ],
    benefits: [
      'Torna o dado espacial em vez de apenas numérico.',
      'Permite voltar exatamente ao mesmo ponto em outra safra.',
      'Base para praticamente toda a agricultura de precisão.',
    ],
    limitations: [
      'A precisão varia conforme o equipamento e a correção usada.',
      'Obstáculos e relevo podem prejudicar o sinal.',
    ],
    useCase:
      'Amostras de solo georreferenciadas permitem gerar um mapa de acidez e tratar cada região do talhão conforme sua necessidade.',
    precautions:
      'Precisão insuficiente compromete todo o resto: um mapa mal posicionado leva a aplicar o insumo no lugar errado.',
  },
  {
    id: 'taxa-variavel',
    name: 'Aplicação em taxa variável',
    icon: SlidersHorizontal,
    category: 'Máquinas',
    stage: 'Agricultura 4.0',
    shortDescription:
      'A máquina altera a quantidade aplicada conforme a posição dentro do talhão.',
    howItWorks:
      'Um mapa de prescrição, construído a partir de análises e imagens, é carregado no equipamento. O controlador ajusta a dosagem em tempo real conforme a posição informada pelo GNSS.',
    applications: [
      'Correção de acidez por zona.',
      'Adubação conforme a fertilidade de cada região.',
      'Ajuste da densidade de semeadura.',
    ],
    benefits: [
      'Aplica onde há necessidade em vez de tratar tudo igual.',
      'Pode reduzir o uso total de insumo.',
      'Aproveita a variabilidade natural do terreno.',
    ],
    limitations: [
      'Depende de um mapa de prescrição bem feito.',
      'Exige equipamento com controlador compatível.',
      'Investimento inicial elevado.',
    ],
    useCase:
      'Num talhão com acidez desigual, a aplicação varia conforme o mapa em vez de usar a mesma quantidade do começo ao fim.',
    precautions:
      'O mapa de prescrição é responsabilidade técnica. Um mapa mal elaborado espalha o erro por toda a área.',
  },
  {
    id: 'ia',
    name: 'Inteligência artificial',
    icon: Brain,
    category: 'Dados',
    stage: 'Agricultura 5.0',
    shortDescription:
      'Encontra padrões em grandes volumes de dados e apoia previsões.',
    howItWorks:
      'Modelos são treinados com exemplos já conhecidos e aprendem relações entre as variáveis. Depois de treinados, produzem estimativas para situações novas.',
    applications: [
      'Estimativa de produtividade.',
      'Reconhecimento de pragas e doenças em imagens.',
      'Apoio à decisão de manejo.',
    ],
    benefits: [
      'Processa mais dados do que uma pessoa conseguiria analisar.',
      'Identifica relações pouco evidentes.',
      'Trabalha continuamente.',
    ],
    limitations: [
      'A qualidade depende inteiramente dos dados de treino.',
      'Pode errar diante de situações fora do que aprendeu.',
      'Nem sempre é possível explicar por que chegou a um resultado.',
    ],
    useCase:
      'Um modelo treinado com fotos de folhas sinaliza que determinada imagem se parece com um sintoma conhecido, encaminhando a checagem.',
    precautions:
      'A recomendação é apoio, não veredito. Decisões de manejo continuam exigindo avaliação profissional.',
  },
  {
    id: 'visao-computacional',
    name: 'Visão computacional',
    icon: Eye,
    category: 'Automação',
    stage: 'Agricultura 5.0',
    shortDescription: 'Faz a máquina interpretar imagens e reagir ao que vê.',
    howItWorks:
      'Câmeras capturam imagens e um modelo classifica o que aparece em cada região — planta cultivada, planta daninha, solo. A máquina age conforme essa classificação.',
    applications: [
      'Pulverização dirigida apenas às plantas daninhas.',
      'Classificação de frutos por aparência.',
      'Contagem de plantas.',
    ],
    benefits: [
      'Permite agir de forma seletiva.',
      'Opera em velocidade constante.',
      'Reduz aplicação em área total.',
    ],
    limitations: [
      'Sensível a variações de iluminação.',
      'Confunde plantas de aparência parecida.',
      'Exige limpeza e ajuste das câmeras.',
    ],
    useCase:
      'Um pulverizador identifica plantas daninhas isoladas e aciona apenas os bicos correspondentes, em vez de tratar toda a faixa.',
    precautions:
      'Erro de classificação significa aplicar onde não devia ou deixar de aplicar onde precisava. A verificação periódica é indispensável.',
  },
  {
    id: 'veiculos-autonomos',
    name: 'Veículos autônomos',
    icon: Truck,
    category: 'Automação',
    stage: 'Agricultura 5.0',
    shortDescription:
      'Máquinas que executam operações no campo com supervisão humana.',
    howItWorks:
      'Combinam posicionamento por satélite, sensores de obstáculo e planejamento de trajeto para percorrer a área seguindo uma rota definida.',
    applications: [
      'Operações repetitivas em área extensa.',
      'Trabalho em janelas de horário mais amplas.',
      'Tarefas em condições desconfortáveis para o operador.',
    ],
    benefits: [
      'Libera a pessoa para tarefas que exigem julgamento.',
      'Trajeto consistente entre passadas.',
      'Registro automático da operação.',
    ],
    limitations: [
      'Custo elevado.',
      'Exige supervisão e protocolos de segurança.',
      'Depende de condições previsíveis de terreno.',
    ],
    useCase:
      'Uma máquina segue o trajeto planejado enquanto o operador acompanha a operação e intervém quando necessário.',
    precautions:
      'Autonomia não elimina responsabilidade. Segurança de pessoas e animais na área é condição para operar.',
  },
  {
    id: 'robotica',
    name: 'Robótica agrícola',
    icon: Bot,
    category: 'Automação',
    stage: 'Agricultura 5.0',
    shortDescription:
      'Robôs que executam tarefas específicas, como capina ou colheita seletiva.',
    howItWorks:
      'Reúnem percepção, deslocamento e um mecanismo de ação — braço, cortador ou pinça — para atuar sobre plantas individuais.',
    applications: [
      'Controle mecânico de plantas daninhas.',
      'Colheita de frutos no ponto adequado.',
      'Monitoramento contínuo em cultivo protegido.',
    ],
    benefits: [
      'Ação planta a planta.',
      'Alternativa mecânica ao controle químico.',
      'Trabalho contínuo em tarefas repetitivas.',
    ],
    limitations: [
      'Velocidade menor que a de máquinas convencionais.',
      'Cultivos e terrenos irregulares dificultam a operação.',
      'Manutenção especializada.',
    ],
    useCase:
      'Um robô de capina percorre as entrelinhas removendo mecanicamente as plantas daninhas que identifica.',
    precautions:
      'Robôs funcionam bem em ambientes previsíveis. Quanto mais irregular a lavoura, maior a taxa de falha.',
  },
  {
    id: 'iot',
    name: 'Internet das Coisas',
    icon: Wifi,
    category: 'Dados',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Conecta sensores e equipamentos para que enviem dados sozinhos.',
    howItWorks:
      'Dispositivos de baixo consumo transmitem leituras por redes sem fio até um concentrador, que encaminha tudo para uma plataforma.',
    applications: [
      'Monitoramento remoto de reservatórios e irrigação.',
      'Acompanhamento de silos e armazéns.',
      'Rastreamento de equipamentos.',
    ],
    benefits: [
      'Dado chega sem alguém precisar ir até o ponto.',
      'Permite alertas automáticos.',
      'Muitos dispositivos operam a bateria por longos períodos.',
    ],
    limitations: [
      'Cobertura de rede é limitada em áreas rurais.',
      'Bateria e manutenção dos dispositivos.',
      'Exige cuidado com segurança da informação.',
    ],
    useCase:
      'Sensores espalhados enviam leituras periódicas e disparam alerta quando um valor sai da faixa esperada.',
    precautions:
      'Dispositivo conectado é também porta de entrada. Senhas padrão e software desatualizado são risco real.',
  },
  {
    id: 'big-data',
    name: 'Big Data',
    icon: Database,
    category: 'Dados',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Reúne e organiza grandes volumes de dados de origens diferentes.',
    howItWorks:
      'Dados de sensores, máquinas, imagens e registros são armazenados de forma estruturada para permitir consultas e cruzamentos que seriam inviáveis manualmente.',
    applications: [
      'Cruzamento de clima, solo e produtividade.',
      'Comparação entre talhões e safras.',
      'Construção de histórico da propriedade.',
    ],
    benefits: [
      'Transforma registros soltos em histórico consultável.',
      'Revela relações entre fatores diferentes.',
      'Base para qualquer modelo preditivo.',
    ],
    limitations: [
      'Dado mal coletado gera conclusão errada.',
      'Formatos incompatíveis entre fabricantes.',
      'Exige organização e critério.',
    ],
    useCase:
      'Cruzar o mapa de produtividade com o histórico de chuva ajuda a entender quais áreas sofrem mais em safras secas.',
    precautions:
      'Volume não substitui qualidade. Muitos dados ruins produzem confiança injustificada.',
  },
  {
    id: 'bioinsumos',
    name: 'Bioinsumos',
    icon: Leaf,
    category: 'Biotecnologia',
    stage: 'Agricultura 5.0',
    shortDescription:
      'Produtos de origem biológica usados na nutrição e na proteção das plantas.',
    howItWorks:
      'Micro-organismos ou substâncias derivadas deles são multiplicados e aplicados na lavoura, atuando na fixação de nutrientes ou no controle de organismos indesejados.',
    applications: [
      'Fixação biológica de nitrogênio.',
      'Controle biológico de pragas e doenças.',
      'Melhoria da atividade biológica do solo.',
    ],
    benefits: [
      'Alternativa ou complemento a insumos sintéticos.',
      'Reduz a pressão de seleção por resistência.',
      'Atua junto da biologia do solo.',
    ],
    limitations: [
      'São organismos vivos: exigem cuidados de armazenamento.',
      'Resultado varia conforme condições ambientais.',
      'Exige conhecimento específico de manejo.',
    ],
    useCase:
      'A inoculação de sementes com bactérias fixadoras é um exemplo consolidado de bioinsumo no Brasil.',
    precautions:
      'Temperatura e prazo de validade afetam a viabilidade. Produto mal conservado simplesmente não funciona.',
  },
  {
    id: 'piloto-automatico',
    name: 'Piloto automático',
    icon: Route,
    category: 'Máquinas',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Mantém a máquina na linha planejada, sem depender da mira do operador.',
    howItWorks:
      'O sistema recebe a posição por GNSS e corrige a direção continuamente para seguir a linha de trabalho definida.',
    applications: [
      'Semeadura em linhas paralelas.',
      'Pulverização sem sobreposição.',
      'Operação noturna ou com pouca visibilidade.',
    ],
    benefits: [
      'Reduz falhas e sobreposição entre passadas.',
      'Diminui o cansaço do operador.',
      'Trajeto consistente independente de quem opera.',
    ],
    limitations: [
      'Depende de qualidade de sinal.',
      'Investimento em equipamento e assinatura de correção.',
    ],
    useCase:
      'Numa pulverização, seguir exatamente a linha anterior evita aplicar duas vezes na mesma faixa.',
    precautions:
      'Piloto automático conduz, não vigia. O operador continua responsável pelo que acontece ao redor da máquina.',
  },
  {
    id: 'irrigacao-inteligente',
    name: 'Irrigação inteligente',
    icon: Waves,
    category: 'Sustentabilidade',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Aciona a irrigação conforme dados de solo e clima, não conforme calendário.',
    howItWorks:
      'Um controlador cruza a umidade medida no solo com a previsão de chuva e a demanda da cultura, decidindo se o sistema deve ou não ser acionado.',
    applications: [
      'Manejo de irrigação por dados.',
      'Ajuste conforme o estágio da cultura.',
      'Adiamento de irrigação quando há chuva prevista.',
    ],
    benefits: [
      'Evita irrigar antes de uma chuva.',
      'Uso mais planejado da água e da energia.',
      'Registro do que foi aplicado.',
    ],
    limitations: [
      'Depende da confiabilidade dos sensores e da previsão.',
      'Requer instalação e manutenção.',
    ],
    useCase:
      'Com umidade baixa mas chuva provável nas próximas horas, o sistema aguarda uma nova leitura antes de acionar.',
    precautions:
      'Previsão é probabilidade, não certeza. A regra automática precisa de um limite definido por quem entende da cultura.',
  },
  {
    id: 'monitoramento-pragas',
    name: 'Monitoramento de pragas',
    icon: Bug,
    category: 'Monitoramento',
    stage: 'Agricultura 4.0',
    shortDescription:
      'Acompanha a presença e a evolução de pragas antes que o dano se espalhe.',
    howItWorks:
      'Combina armadilhas, inspeções em pontos definidos e, cada vez mais, imagens analisadas automaticamente para estimar a população presente.',
    applications: [
      'Decisão sobre quando intervir.',
      'Acompanhamento da evolução ao longo da safra.',
      'Registro histórico de ocorrências.',
    ],
    benefits: [
      'Permite agir cedo.',
      'Evita aplicações feitas por precaução.',
      'Gera histórico para as próximas safras.',
    ],
    limitations: [
      'Exige constância nas inspeções.',
      'Amostragem mal feita distorce a leitura.',
      'Identificação de espécies exige conhecimento.',
    ],
    useCase:
      'O acompanhamento periódico mostra se a população está crescendo ou estável, informação que muda a decisão de intervir.',
    precautions:
      'Encontrar um inseto não significa que há infestação. A decisão de intervir depende de critérios técnicos.',
  },
]

export const technologyIntro =
  'Nenhuma destas tecnologias resolve tudo sozinha. Cada uma responde a uma pergunta específica do campo, e quase todas dependem de outra para funcionar bem.'
