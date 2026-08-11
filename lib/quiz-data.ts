export interface QuizMedia {
  src: string
  alt: string
  label: string
  objectPosition?: string
  credit: {
    author: string
    sourceName: string
    sourcePageUrl: string
    license: string
  }
}

export interface QuizQuestion {
  id: string
  topic: string
  statement: string
  /** Cinco alternativas, no estilo ENEM */
  options: string[]
  /** Índice da alternativa correta (0 = A) */
  answer: number
  explanation: string
  fact: string
  media: QuizMedia
  difficulty: 'fundamentos' | 'aplicacao' | 'desafio'
}

export const quizLicenseUrls: Readonly<Record<string, string>> = {
  'Domínio público': 'https://commons.wikimedia.org/wiki/Commons:Public_domain',
  'CC0 1.0': 'https://creativecommons.org/publicdomain/zero/1.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'Licença Unsplash': 'https://unsplash.com/license',
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-tecnologias-monitoramento',
    difficulty: 'aplicacao',
    topic: 'Agricultura de precisão',
    statement:
      'Uma propriedade utiliza uma estação meteorológica, um sistema de monitoramento, dados históricos e recomendações digitais. A implementação dessas tecnologias contribui diretamente para:',
    options: [
      'Valorização automática do preço da terra.',
      'Monitoramento da produção.',
      'Correção dos fatores climáticos.',
      'Divisão obrigatória das tarefas.',
      'Estabilização imediata da fertilidade do solo.',
    ],
    answer: 1,
    explanation:
      'As tecnologias permitem coletar informações, acompanhar a lavoura e apoiar decisões. Elas não controlam o clima nem garantem mudanças imediatas na fertilidade do solo.',
    fact: 'Uma estação pode registrar chuva, temperatura, umidade e vento no próprio local da produção.',
    media: {
      src: '/images/quiz/q-tecnologias-monitoramento.webp',
      alt: 'Pessoa ajustando os instrumentos de uma estação meteorológica.',
      label: 'Monitoramento no campo · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'USDA · Scott Bauer',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Weather_Station_USDA.jpg',
        license: 'Domínio público',
      },
    },
  },
  {
    id: 'q-neolitico',
    difficulty: 'fundamentos',
    topic: 'Agricultura 1.0',
    statement:
      'A Revolução Neolítica é considerada um marco porque nela ocorreu a transição da caça e da coleta para o cultivo. A consequência social mais direta dessa mudança foi:',
    options: [
      'O surgimento das primeiras máquinas agrícolas.',
      'A formação de comunidades sedentárias.',
      'O início do uso de fertilizantes industriais.',
      'A especialização das culturas para exportação.',
      'A substituição do trabalho humano pela tração animal.',
    ],
    answer: 1,
    explanation:
      'Produzir o próprio alimento permitiu que grupos permanecessem no mesmo lugar, formando aldeias. Máquinas, fertilizantes industriais e comércio em escala aparecem em etapas muito posteriores.',
    fact: 'O cultivo e a domesticação de animais favoreceram estoques de alimentos e ocupações mais permanentes.',
    media: {
      src: '/images/quiz/q-neolitico.webp',
      alt: 'Representação museológica de pessoas semeando durante o período Neolítico.',
      label: 'Primeiros cultivos · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Dosseman',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Urfa_museum_Sowing_-_Neolithic_age_4872.jpg',
        license: 'CC BY-SA 4.0',
      },
    },
  },
  {
    id: 'q-mecanizacao',
    difficulty: 'fundamentos',
    topic: 'Agricultura 2.0',
    statement:
      'A mecanização do campo, a partir da Revolução Industrial, ampliou a escala da produção. Entre os desafios que ela trouxe, está:',
    options: [
      'A perda total do conhecimento tradicional sobre plantas.',
      'A compactação do solo e a dependência de combustível.',
      'A impossibilidade de cultivar áreas maiores.',
      'A redução da velocidade de plantio e colheita.',
      'O fim da necessidade de manutenção de equipamentos.',
    ],
    answer: 1,
    explanation:
      'Máquinas pesadas compactam o solo e dependem de combustível e manutenção. As demais alternativas contrariam o que a mecanização de fato provocou.',
    fact: 'Tráfego repetido de máquinas sobre a mesma faixa pode concentrar a compactação e exigir planejamento operacional.',
    media: {
      src: '/images/quiz/q-mecanizacao.webp',
      alt: 'Trator preparando o solo em uma área de cultivo.',
      label: 'Mecanização agrícola · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Bidemi Bernice',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_tractor_ploughing_a_farm_site.jpg',
        license: 'CC0 1.0',
      },
    },
  },
  {
    id: 'q-revolucao-verde',
    difficulty: 'aplicacao',
    topic: 'Agricultura 3.0',
    statement:
      'A Revolução Verde combinou melhoramento de sementes, fertilizantes, defensivos e irrigação. Entre os riscos do uso repetido de defensivos com o mesmo mecanismo de ação está:',
    options: [
      'A redução da produtividade média das lavouras.',
      'O surgimento de populações de pragas resistentes.',
      'A eliminação da necessidade de análise de solo.',
      'A diminuição da oferta de alimentos.',
      'O fim da irrigação em larga escala.',
    ],
    answer: 1,
    explanation:
      'A aplicação repetida de produtos com o mesmo mecanismo de ação seleciona indivíduos resistentes, que se tornam predominantes na população da praga.',
    fact: 'Alternar mecanismos de ação e combinar formas de manejo ajuda a reduzir a pressão de seleção sobre as pragas.',
    media: {
      src: '/images/quiz/q-revolucao-verde.webp',
      alt: 'Área agrícola irrigada por um sistema de pivô central.',
      label: 'Produção irrigada · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Nicole Harrington',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nicole_Harrington_2016_(Unsplash).jpg',
        license: 'CC0 1.0',
      },
    },
  },
  {
    id: 'q-ph',
    difficulty: 'fundamentos',
    topic: 'Química do solo',
    statement:
      'Um solo apresenta pH 4,8. Sobre essa condição, é correto afirmar que:',
    options: [
      'O solo é alcalino e não precisa de correção.',
      'Trata-se de acidez elevada, que pode dificultar a absorção de nutrientes.',
      'O pH não tem relação com a disponibilidade de nutrientes.',
      'O solo é neutro, pois o pH está próximo de 7.',
      'A acidez garante maior disponibilidade de todos os nutrientes.',
    ],
    answer: 1,
    explanation:
      'pH abaixo de 7 indica acidez, e 4,8 é uma acidez elevada. Em faixas muito ácidas, certos nutrientes ficam menos disponíveis e o alumínio pode permanecer solúvel, prejudicando as raízes.',
    fact: 'A recomendação de correção depende da análise do solo e das exigências da cultura, não apenas de um número isolado.',
    media: {
      src: '/images/quiz/q-ph.webp',
      alt: 'Medidor de pH utilizado para avaliar uma amostra de solo.',
      label: 'Medição de pH · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Gihan Jayaweera',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Soil_pH_meter.jpg',
        license: 'CC BY-SA 3.0',
      },
    },
  },
  {
    id: 'q-npk',
    difficulty: 'aplicacao',
    topic: 'Química do solo',
    statement:
      'Os macronutrientes NPK participam de processos distintos nas plantas. A associação correta é:',
    options: [
      'Nitrogênio — resistência a pragas; Fósforo — cor das flores; Potássio — altura.',
      'Nitrogênio — crescimento vegetativo; Fósforo — raízes e transferência de energia; Potássio — equilíbrio hídrico.',
      'Nitrogênio — equilíbrio hídrico; Fósforo — crescimento vegetativo; Potássio — raízes.',
      'Os três atuam exclusivamente na formação do caule.',
      'Nenhum deles participa do metabolismo vegetal.',
    ],
    answer: 1,
    explanation:
      'O nitrogênio compõe aminoácidos e clorofila, ligando-se ao crescimento vegetativo. O fósforo participa do ATP e do desenvolvimento radicular. O potássio atua na regulação hídrica e na resistência da planta.',
    fact: 'A presença de um nutriente no solo não garante sua absorção: pH, água e raízes também influenciam a disponibilidade.',
    media: {
      src: '/images/quiz/q-npk.webp',
      alt: 'Grânulos de fertilizante usados como fonte de nutrientes para as plantas.',
      label: 'Nutrientes minerais · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Suyash Dwivedi',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:DAP_(Diammonium_Phosphate)_Granules_(1).jpg',
        license: 'CC BY-SA 4.0',
      },
    },
  },
  {
    id: 'q-sensores',
    difficulty: 'desafio',
    topic: 'Sensores',
    statement:
      'Um sensor de umidade instalado em um ponto do talhão indica solo seco, mas a lavoura ao redor aparenta boas condições. A interpretação mais adequada é:',
    options: [
      'O sensor está necessariamente com defeito e deve ser descartado.',
      'A leitura vale para o ponto onde o sensor está e precisa ser interpretada junto de outras informações.',
      'A lavoura inteira está seca e deve ser irrigada imediatamente.',
      'A aparência visual da lavoura é sempre mais confiável que qualquer sensor.',
      'Sensores de umidade não medem água no solo.',
    ],
    answer: 1,
    explanation:
      'Um sensor mede apenas o ponto onde está instalado. Variações de solo, relevo e profundidade fazem com que uma leitura isolada não represente o talhão inteiro.',
    fact: 'A posição, a profundidade e a calibração do sensor fazem parte da interpretação de qualquer série de medições.',
    media: {
      src: '/images/quiz/q-sensores.webp',
      alt: 'Dispositivo de leitura de umidade posicionado junto ao solo.',
      label: 'Leitura localizada · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Christianjhart1',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:272_soilmoisture.JPG',
        license: 'CC0 1.0',
      },
    },
  },
  {
    id: 'q-precisao',
    difficulty: 'aplicacao',
    topic: 'Agricultura 4.0',
    statement:
      'A aplicação em taxa variável representa uma mudança de lógica em relação ao manejo tradicional porque:',
    options: [
      'Aplica sempre a maior dose possível em toda a área.',
      'Ajusta a quantidade aplicada conforme a posição dentro do talhão.',
      'Elimina a necessidade de análise de solo.',
      'Dispensa o uso de posicionamento por satélite.',
      'Só funciona em propriedades de pequeno porte.',
    ],
    answer: 1,
    explanation:
      'A taxa variável parte de um mapa de prescrição e do posicionamento por GNSS para variar a dose conforme a necessidade de cada região, em vez de tratar toda a propriedade como igual.',
    fact: 'Mapas de produtividade, amostras de solo e imagens podem ajudar a definir zonas de manejo dentro do mesmo talhão.',
    media: {
      src: '/images/quiz/q-precisao.webp',
      alt: 'Trator operando em linhas regulares de uma área agrícola.',
      label: 'Operação de precisão · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Samuel Solcan',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/a-tractor-plowing-a-field-with-a-plow-cfD0LrqEMmk',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-ia',
    difficulty: 'desafio',
    topic: 'Inteligência artificial',
    statement:
      'Um modelo de inteligência artificial treinado para reconhecer sintomas em folhas classifica uma imagem como possível doença. A conduta adequada é:',
    options: [
      'Aplicar imediatamente o defensivo indicado pelo sistema.',
      'Usar o resultado como indício e confirmar em campo com avaliação profissional.',
      'Ignorar o resultado, já que modelos nunca acertam.',
      'Substituir todas as inspeções de campo pelo modelo.',
      'Considerar o resultado como diagnóstico definitivo e registrar a doença.',
    ],
    answer: 1,
    explanation:
      'Modelos podem errar diante de situações que não estavam nos dados de treino. A saída é apoio à decisão, e a validação profissional continua necessária.',
    fact: 'Luz, enquadramento e sintomas parecidos podem alterar o resultado de um modelo treinado com imagens.',
    media: {
      src: '/images/quiz/q-ia.webp',
      alt: 'Folha com sinais visíveis de dano ou doença para inspeção.',
      label: 'Análise visual da lavoura · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Mittalantiya',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Leaf_Disease_1.jpg',
        license: 'CC BY-SA 4.0',
      },
    },
  },
  {
    id: 'q-desafios',
    difficulty: 'desafio',
    topic: 'Desafios da agricultura digital',
    statement:
      'Entre os obstáculos à adoção de tecnologias digitais no campo brasileiro, um dos mais citados é a falta de conectividade rural. Esse problema afeta diretamente a etapa de:',
    options: [
      'Coleta, pois impede o funcionamento dos sensores.',
      'Transmissão, pois os dados não chegam ao sistema de análise.',
      'Colheita, pois as máquinas param de operar.',
      'Adubação, pois os fertilizantes perdem eficácia.',
      'Armazenamento de grãos, pois os silos dependem de internet.',
    ],
    answer: 1,
    explanation:
      'Sensores continuam medindo sem internet, mas o dado precisa sair da lavoura para ser analisado. Sem conectividade, é a etapa de transmissão que se interrompe.',
    fact: 'Alguns sistemas armazenam leituras localmente e enviam o histórico quando a conexão volta a ficar disponível.',
    media: {
      src: '/images/quiz/q-desafios.webp',
      alt: 'Torre de telecomunicações instalada junto a uma área rural.',
      label: 'Conectividade rural · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Max Martín',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/a-tall-cell-phone-tower-sitting-in-the-middle-of-a-field-3TJecTxlHuk',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-sustentabilidade',
    difficulty: 'fundamentos',
    topic: 'Sustentabilidade',
    statement:
      'Ao afirmar que a Agricultura 5.0 busca "produzir melhor" e não apenas "produzir mais", entende-se que a prioridade passa a incluir:',
    options: [
      'A substituição total das pessoas por máquinas autônomas.',
      'A conservação dos recursos naturais e o apoio ao trabalho humano.',
      'O abandono das tecnologias desenvolvidas nas etapas anteriores.',
      'A concentração da produção em poucas propriedades.',
      'A eliminação de qualquer uso de insumos químicos.',
    ],
    answer: 1,
    explanation:
      'A Agricultura 5.0 propõe colaboração entre pessoas e máquinas, com sustentabilidade e valorização do conhecimento humano — não a substituição das pessoas nem o abandono das técnicas anteriores.',
    fact: 'Sustentabilidade combina resultados ambientais, econômicos, sociais e produtivos ao longo do tempo.',
    media: {
      src: '/images/quiz/q-sustentabilidade.webp',
      alt: 'Pessoa observando uma cobertura vegetal densa em uma área agrícola.',
      label: 'Manejo conservacionista · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'USDA · Lance Cheung',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Roberts_Farm_Cover_Crop_vs_The_Mighty_Mississippi_(20190920-NRCS-LSC-0902).jpg',
        license: 'Domínio público',
      },
    },
  },
  {
    id: 'q-materia-organica',
    difficulty: 'desafio',
    topic: 'Química do solo',
    statement:
      'A manutenção da palhada sobre o solo, prática comum no plantio direto, contribui para a qualidade do solo porque:',
    options: [
      'Impede completamente a ação de micro-organismos.',
      'Aumenta a matéria orgânica, melhorando estrutura e retenção de água.',
      'Eleva o pH do solo até a faixa alcalina.',
      'Substitui integralmente a necessidade de nutrientes.',
      'Reduz a porosidade e compacta o solo.',
    ],
    answer: 1,
    explanation:
      'A decomposição da palhada incorpora matéria orgânica ao solo, o que melhora a estrutura, aumenta a retenção de água e funciona como reserva gradual de nutrientes.',
    fact: 'A palhada também reduz o impacto direto das gotas de chuva e ajuda a proteger a superfície contra erosão.',
    media: {
      src: '/images/quiz/q-materia-organica.webp',
      alt: 'Resíduos de cultura cobrindo o solo entre plantas em desenvolvimento.',
      label: 'Palhada sobre o solo · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'USDA NRCS',
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Crop_Residue_Management_EVO01_(38808388692).jpg',
        license: 'Domínio público',
      },
    },
  },
  {
    id: 'q-escala-logaritmica-ph',
    difficulty: 'desafio',
    topic: 'Química do solo',
    statement:
      'Duas amostras de solo, medidas nas mesmas condições, apresentam pH 5,0 e pH 6,0. Considerando o caráter logarítmico dessa escala, é correto afirmar que:',
    options: [
      'A amostra de pH 5,0 apresenta cerca de dez vezes maior atividade de íons H⁺ que a de pH 6,0.',
      'A amostra de pH 5,0 apresenta apenas duas vezes maior atividade de íons H⁺.',
      'As duas amostras apresentam a mesma condição de acidez.',
      'A amostra de pH 6,0 apresenta dez vezes maior atividade de íons H⁺.',
      'A amostra de pH 5,0 apresenta cem vezes maior atividade de íons H⁺.',
    ],
    answer: 0,
    explanation:
      'Cada unidade na escala de pH corresponde a uma variação de dez vezes na atividade dos íons H⁺. Assim, a amostra de pH 5,0 tem cerca de dez vezes mais atividade de H⁺ que a de pH 6,0.',
    fact: 'Uma diferença de duas unidades de pH corresponde a uma variação de cem vezes na atividade de H⁺.',
    media: {
      src: '/images/quiz/q-escala-logaritmica-ph.webp',
      alt: 'Amostra de solo sustentada nas mãos para avaliação.',
      label: 'Amostra de solo · imagem ilustrativa',
      objectPosition: 'center 68%',
      credit: {
        author: 'Gabriel Jimenez',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/jin4W1HqgL4',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-amostragem-composta',
    difficulty: 'fundamentos',
    topic: 'Amostragem de solo',
    statement:
      'Para que o resultado de uma análise represente uma área de manejo considerada relativamente uniforme, o procedimento de coleta mais adequado é:',
    options: [
      'Retirar toda a amostra do ponto visualmente mais fértil.',
      'Misturar solo superficial e profundo sem registrar as profundidades.',
      'Coletar porções em vários pontos representativos, na mesma profundidade, e reuni-las em uma amostra composta.',
      'Coletar somente nas bordas, onde o acesso é mais fácil.',
      'Misturar solos de áreas com relevo, cor e manejo distintos em um único recipiente.',
    ],
    answer: 2,
    explanation:
      'A amostra composta reúne porções de diferentes pontos representativos de uma área relativamente uniforme. Misturar profundidades ou regiões muito diferentes pode ocultar a variabilidade e comprometer a decisão.',
    fact: 'Recipientes limpos e identificação de área e profundidade ajudam a preservar a rastreabilidade da amostra.',
    media: {
      src: '/images/quiz/q-amostragem-composta.webp',
      alt: 'Solo agrícola em detalhe durante uma observação de campo.',
      label: 'Coleta representativa · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Glen Carrie',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/iB1JuJyQob4',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-eutrofizacao',
    difficulty: 'aplicacao',
    topic: 'Sustentabilidade',
    statement:
      'Após chuvas intensas em uma região agrícola, um reservatório recebeu nutrientes transportados pelo escoamento superficial. Dias depois, ocorreu intensa proliferação de algas e redução da quantidade de peixes. A relação que melhor explica o fenômeno é:',
    options: [
      'Os nutrientes elevaram o pH e eliminaram imediatamente todos os organismos aquáticos.',
      'O fósforo evaporou da água e provocou resfriamento do reservatório.',
      'Os sedimentos aumentaram permanentemente a entrada de luz na água.',
      'As algas produziram oxigênio que permaneceu acumulado indefinidamente.',
      'O excesso de nitrogênio e fósforo favoreceu as algas, cuja decomposição consumiu oxigênio dissolvido.',
    ],
    answer: 4,
    explanation:
      'O enriquecimento da água por nitrogênio e fósforo pode causar eutrofização. A proliferação e posterior decomposição da biomassa consomem oxigênio dissolvido, prejudicando peixes e outros organismos.',
    fact: 'Faixas de vegetação junto aos cursos d’água ajudam a reter sedimentos e nutrientes transportados pelo escoamento.',
    media: {
      src: '/images/quiz/q-eutrofizacao.webp',
      alt: 'Superfície de um lago coberta por intensa floração esverdeada de algas.',
      label: 'Floração de algas · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Shiva Mardahi',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/green-algae-bloom-on-a-lake-surface-IvGHz6pPRM0',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-condutividade-sais',
    difficulty: 'desafio',
    topic: 'Sensores químicos',
    statement:
      'Um sensor registra aumento da condutividade elétrica do solo após uma operação de irrigação. A interpretação tecnicamente mais responsável dessa leitura é:',
    options: [
      'Ela pode indicar maior presença de íons dissolvidos, mas não identifica quais são e deve ser interpretada com umidade, calibração e análises complementares.',
      'Ela identifica diretamente a quantidade exata de nitrogênio disponível.',
      'Ela comprova que todos os nutrientes estão em níveis adequados.',
      'Ela demonstra, por si só, que o solo precisa receber mais fertilizante.',
      'Ela substitui completamente a análise laboratorial do solo.',
    ],
    answer: 0,
    explanation:
      'A condutividade elétrica responde à presença de sais dissolvidos, mas também varia com umidade, textura e temperatura. A leitura é um indício, não a identificação de um nutriente específico nem uma recomendação automática.',
    fact: 'Duas leituras só são comparáveis quando método, temperatura, umidade e calibração são considerados.',
    media: {
      src: '/images/quiz/q-condutividade-sais.webp',
      alt: 'Solo com textura e agregados visíveis em uma área de cultivo.',
      label: 'Sais e propriedades do solo · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Aaron Ghena',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/TOyb9z2IVPQ',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-controle-biologico-clima',
    difficulty: 'aplicacao',
    topic: 'Controle biológico',
    statement:
      'O mesmo agente de controle biológico apresentou bom desempenho em uma área úmida e resultado limitado em outra área submetida a condições mais secas. A diferença pode ser explicada porque:',
    options: [
      'Agentes biológicos sempre funcionam somente em solos alagados.',
      'O resultado prova que a praga se tornou resistente a qualquer forma de controle.',
      'A sobrevivência e a atividade de organismos usados como bioinsumos dependem das condições ambientais e do manejo.',
      'Temperatura e umidade afetam apenas produtos sintéticos.',
      'Todo controle biológico produz o mesmo resultado, independentemente do ambiente.',
    ],
    answer: 2,
    explanation:
      'Bioinsumos podem conter organismos vivos ou produtos derivados deles. Temperatura, umidade, armazenamento e momento de aplicação influenciam sua viabilidade e eficiência.',
    fact: 'Inimigos naturais, fungos e bactérias benéficas podem integrar estratégias de manejo biológico.',
    media: {
      src: '/images/quiz/q-controle-biologico-clima.webp',
      alt: 'Duas joaninhas vermelhas sobre uma folha verde.',
      label: 'Organismo benéfico · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Jana Ohajdova',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/red-ladybug-on-green-leaf-in-close-up-photography-during-daytime-cbm33N_PTYo',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-refrigeracao-alimentos',
    difficulty: 'fundamentos',
    topic: 'Conservação de alimentos',
    statement:
      'Uma fruta cortada escurece mais lentamente quando é mantida sob refrigeração. Isso ocorre principalmente porque a baixa temperatura:',
    options: [
      'Retira completamente o oxigênio ao redor da fruta.',
      'Destrói de forma imediata todas as enzimas do alimento.',
      'Congela toda a água presente nas células.',
      'Reduz a velocidade das reações enzimáticas responsáveis pelo escurecimento.',
      'Aumenta a quantidade de água disponível para os micro-organismos.',
    ],
    answer: 3,
    explanation:
      'A refrigeração desacelera reações químicas, atividade enzimática e crescimento de micro-organismos. Ela aumenta o tempo de conservação, mas não interrompe completamente esses processos.',
    fact: 'Manter a cadeia de frio reduz oscilações de temperatura que aceleram a deterioração durante transporte e armazenamento.',
    media: {
      src: '/images/quiz/q-refrigeracao-alimentos.webp',
      alt: 'Frutas e hortaliças organizadas sob refrigeração.',
      label: 'Conservação pelo frio · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Onur Burak Akın',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/a-refrigerator-filled-with-lots-of-fresh-fruits-and-vegetables-gC-cKJebRhg',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-gnss-prescricao',
    difficulty: 'aplicacao',
    topic: 'Agricultura 4.0',
    statement:
      'Uma máquina recebe um mapa que recomenda quantidades diferentes de insumo para cada zona do talhão. Durante a operação, a principal função do GNSS é:',
    options: [
      'Medir em laboratório o pH do solo durante o deslocamento.',
      'Informar a posição da máquina para que o controlador aplique a dose correspondente a cada zona.',
      'Prever com certeza a ocorrência de chuva nas horas seguintes.',
      'Produzir os nutrientes aplicados pela máquina.',
      'Eliminar a necessidade de calibração do equipamento.',
    ],
    answer: 1,
    explanation:
      'O GNSS informa onde a máquina está. O controlador cruza essa posição com o mapa de prescrição e ajusta a dose. Se a posição estiver incorreta, o insumo pode ser aplicado na zona errada.',
    fact: 'A qualidade do posicionamento necessária depende da operação; algumas exigem correções mais precisas que outras.',
    media: {
      src: '/images/quiz/q-gnss-prescricao.webp',
      alt: 'Trator operando em uma grande área agrícola com linhas definidas.',
      label: 'Máquina posicionada no talhão · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Josh Hild',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/a-tractor-plowing-a-field-with-a-plow-VqC33Q39bQk',
        license: 'Licença Unsplash',
      },
    },
  },
  {
    id: 'q-balanco-carbono-solo',
    difficulty: 'desafio',
    topic: 'Carbono no solo',
    statement:
      'Após adotar práticas que mantêm mais resíduos vegetais sobre o solo, uma propriedade registra maior teor de matéria orgânica em uma medição. A conclusão cientificamente mais adequada é:',
    options: [
      'Todo o carbono incorporado ficará armazenado de forma permanente.',
      'A propriedade passou automaticamente a emitir zero gases de efeito estufa.',
      'A decomposição da matéria orgânica foi completamente interrompida.',
      'O resultado é compatível com maior entrada de carbono, mas o balanço exige acompanhamento no tempo e avaliação do sistema completo.',
      'O carbono presente no solo não pode retornar à atmosfera.',
    ],
    answer: 3,
    explanation:
      'Resíduos e raízes podem aumentar a entrada de carbono no solo, mas parte dele volta à atmosfera por respiração e decomposição. Uma medição isolada não demonstra armazenamento permanente nem define o balanço total.',
    fact: 'O carbono do solo é dinâmico: recebe entradas de plantas e perde parte delas por decomposição e erosão.',
    media: {
      src: '/images/quiz/q-balanco-carbono-solo.webp',
      alt: 'Close de solo escuro com diferentes partículas e agregados visíveis.',
      label: 'Carbono e matéria orgânica · imagem ilustrativa',
      objectPosition: 'center',
      credit: {
        author: 'Avinash Kumar',
        sourceName: 'Unsplash',
        sourcePageUrl: 'https://unsplash.com/photos/rEIDzqczN7s',
        license: 'Licença Unsplash',
      },
    },
  },
]

export const quizIntro =
  'Vinte questões no estilo ENEM sobre tudo que foi visto até aqui. As perguntas e alternativas mudam de ordem, e cada resposta vem com explicação.'
