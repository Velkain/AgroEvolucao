export interface QuizQuestion {
  id: string
  topic: string
  statement: string
  /** Cinco alternativas, no estilo ENEM */
  options: string[]
  /** Índice da alternativa correta (0 = A) */
  answer: number
  explanation: string
  difficulty: 'fundamentos' | 'aplicacao' | 'desafio'
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
  },
  {
    id: 'q-revolucao-verde',
    difficulty: 'aplicacao',
    topic: 'Agricultura 3.0',
    statement:
      'A Revolução Verde combinou melhoramento de sementes, fertilizantes, defensivos e irrigação. Um efeito negativo associado ao uso excessivo desses insumos é:',
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
      'Reduz a velocidade de reações enzimáticas e do crescimento microbiano, sem necessariamente interrompê-los.',
      'Aumenta a quantidade de água disponível para os micro-organismos.',
    ],
    answer: 3,
    explanation:
      'A refrigeração desacelera reações químicas, atividade enzimática e crescimento de micro-organismos. Ela aumenta o tempo de conservação, mas não interrompe completamente esses processos.',
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
  },
]

export const quizIntro =
  'Vinte questões no estilo ENEM sobre tudo que foi visto até aqui. As perguntas e alternativas mudam de ordem, e cada resposta vem com explicação.'
