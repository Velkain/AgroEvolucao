/**
 * Fontes e referências.
 *
 * Regra herdada do PRODUCT.md e do briefing: nada de artigo, autor, data de
 * publicação ou link inventado. Por isso este arquivo separa dois tipos:
 *
 * - `institutionalSources`: instituições reais, com o endereço oficial de cada
 *   uma verificado. São pontos de partida legítimos para consulta, não citações
 *   de trabalhos específicos.
 * - `usedInThisProject`: fontes que este site efetivamente consome ou consumiu.
 */

export interface ReferenceEntry {
  name: string
  url?: string
  description: string
}

export const institutionalSources: ReferenceEntry[] = [
  {
    name: 'Embrapa — Empresa Brasileira de Pesquisa Agropecuária',
    url: 'https://www.embrapa.br/',
    description:
      'Instituição pública brasileira de pesquisa agropecuária. Publica material técnico sobre solos, culturas, agricultura de precisão e bioinsumos.',
  },
  {
    name: 'FAO — Organização das Nações Unidas para a Alimentação e a Agricultura',
    url: 'https://www.fao.org/home/en/',
    description:
      'Agência da ONU dedicada à alimentação e à agricultura. Reúne dados e publicações sobre produção agrícola e segurança alimentar em escala global.',
  },
  {
    name: 'Ministério da Agricultura e Pecuária',
    url: 'https://www.gov.br/agricultura/pt-br',
    description:
      'Órgão federal responsável pela política agrícola brasileira, incluindo normas sobre insumos e defensivos.',
  },
  {
    name: 'IBGE — Instituto Brasileiro de Geografia e Estatística',
    url: 'https://www.ibge.gov.br/',
    description:
      'Fonte oficial de estatísticas do país, incluindo o Censo Agropecuário e o levantamento sistemático da produção agrícola.',
  },
  {
    name: 'Conab — Companhia Nacional de Abastecimento',
    url: 'https://www.conab.gov.br/',
    description:
      'Acompanha e publica levantamentos sobre safras brasileiras e abastecimento agrícola.',
  },
]

export const usedInThisProject: ReferenceEntry[] = [
  {
    name: 'Open-Meteo',
    url: 'https://open-meteo.com/',
    description:
      'API meteorológica aberta. Fornece os dados de clima, temperatura e umidade do solo exibidos na seção de fazenda inteligente. Dados sob licença CC BY 4.0.',
  },
]

/** Publicações e páginas específicas consultadas na redação do conteúdo. */
export const contentSources: ReferenceEntry[] = [
  {
    name: 'Embrapa — Como amostrar o solo',
    url: 'https://www.embrapa.br/web/agencia-de-informacao-tecnologica/cultivos/soja/producao/manejo-da-fertilidade-do-solo/analise-do-solo/como-amostrar',
    description:
      'Explica por que a área deve ser dividida em regiões homogêneas e como amostras simples formam uma amostra composta representativa.',
  },
  {
    name: 'Embrapa — Perdas de nutrientes',
    url: 'https://www.embrapa.br/en/web/agencia-de-informacao-tecnologica/tematicas/agricultura-e-meio-ambiente/qualidade/residuos/perdas-de-nutrientes',
    description:
      'Apresenta destinos do nitrogênio e mecanismos como absorção, escoamento, lixiviação, volatilização e desnitrificação.',
  },
  {
    name: 'Embrapa — Estrutura e natureza química da matéria orgânica do solo',
    url: 'https://www.embrapa.br/busca-de-publicacoes/-/publicacao/1154932/estrutura-e-natureza-quimica-da-materia-organica-do-solo',
    description:
      'Publicação de 2023 sobre matéria orgânica, dinâmica e reatividade do carbono no solo e sua relação com gases de efeito estufa.',
  },
  {
    name: 'Embrapa — Experimentação on-farm na agricultura de precisão',
    url: 'https://www.embrapa.br/busca-de-publicacoes/-/publicacao/1150179/experimentacao-on-farm-na-agricultura-de-precisao',
    description:
      'Publicação de 2022 sobre possibilidades, dificuldades e metodologia de experimentos de agricultura de precisão realizados na propriedade.',
  },
  {
    name: 'Embrapa — Controle biológico e bioinsumos',
    url: 'https://www.embrapa.br/en/recursos-geneticos-e-biotecnologia/controle-biologico-e-bioinsumos',
    description:
      'Página institucional sobre pesquisas e soluções que utilizam organismos e processos biológicos no controle de pragas.',
  },
  {
    name: 'US EPA — Nutrient Pollution: Sources and Solutions in Agriculture',
    url: 'https://www.epa.gov/nutrientpollution/sources-and-solutions-agriculture',
    description:
      'Explica como nitrogênio e fósforo não absorvidos podem alcançar a água e contribuir para eutrofização e perda de oxigênio.',
  },
]
