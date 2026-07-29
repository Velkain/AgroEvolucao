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
 * - `toFill`: espaços que só quem fez o trabalho pode preencher.
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

/**
 * Campos que precisam ser preenchidos por quem fez o trabalho.
 * Ficam visíveis de propósito: um espaço em branco declarado é mais honesto
 * que uma referência inventada para preencher a lacuna.
 */
export const toFill: { label: string; hint: string }[] = [
  {
    label: 'Material didático utilizado em aula',
    hint: 'Livro, apostila ou slides indicados pelo professor — com título, autoria e ano conforme constam no próprio material.',
  },
  {
    label: 'Páginas específicas consultadas',
    hint: 'Se alguma página das instituições acima foi consultada em detalhe, registre o título exato e a data em que foi acessada.',
  },
  {
    label: 'Outras fontes usadas pelo grupo',
    hint: 'Vídeos, entrevistas, visitas técnicas ou qualquer outro material que tenha embasado o conteúdo.',
  },
]

export const referencesNote =
  'A classificação entre Agricultura 1.0, 2.0, 3.0, 4.0 e 5.0 é utilizada como uma organização didática. Alguns períodos e características podem variar conforme a fonte consultada.'
