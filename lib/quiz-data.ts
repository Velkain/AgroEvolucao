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
]

export const quizIntro =
  'Doze questões no estilo ENEM sobre tudo que foi visto até aqui. Cada resposta vem com explicação — errar aqui é parte do estudo.'
