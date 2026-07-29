export type AttentionLevel = 'baixa' | 'media' | 'alta'
export type PestRisk = 'baixo' | 'moderado' | 'alto'
export type CropStage = 'inicial' | 'vegetativo' | 'floracao' | 'maturacao'

export interface FarmState {
  /** % de umidade do solo */
  soilMoisture: number
  /** pH do solo */
  ph: number
  /** °C */
  temperature: number
  /** % de possibilidade de chuva */
  rainChance: number
  pestRisk: PestRisk
  cropStage: CropStage
}

export interface Recommendation {
  id: string
  /** A regra, escrita como condição legível */
  rule: string
  /** Os valores que fizeram a regra disparar */
  inputs: string[]
  recommendation: string
  attention: AttentionLevel
}

/** Limiares usados pelas regras. Expostos porque a interface os exibe. */
export const THRESHOLDS = {
  lowMoisture: 30,
  highRainChance: 60,
  lowPh: 5,
  highPh: 7.5,
  highTemperature: 34,
} as const

export const cropStageLabels: Record<CropStage, string> = {
  inicial: 'Inicial',
  vegetativo: 'Vegetativo',
  floracao: 'Floração',
  maturacao: 'Maturação',
}

export const pestRiskLabels: Record<PestRisk, string> = {
  baixo: 'Baixo',
  moderado: 'Moderado',
  alto: 'Alto',
}

/**
 * Regras determinísticas e transparentes. Não há modelo nem inferência aqui:
 * cada saída informa exatamente qual condição disparou, para que o leitor
 * consiga refazer o raciocínio sozinho.
 */
export function evaluate(state: FarmState): Recommendation[] {
  const out: Recommendation[] = []
  const lowMoisture = state.soilMoisture < THRESHOLDS.lowMoisture
  const rainLikely = state.rainChance >= THRESHOLDS.highRainChance

  if (lowMoisture && !rainLikely) {
    out.push({
      id: 'irrigar',
      rule: `Umidade do solo abaixo de ${THRESHOLDS.lowMoisture}% E possibilidade de chuva abaixo de ${THRESHOLDS.highRainChance}%`,
      inputs: [
        `Umidade do solo: ${state.soilMoisture}%`,
        `Possibilidade de chuva: ${state.rainChance}%`,
      ],
      recommendation:
        'O solo apresenta baixa umidade e não existe previsão significativa de chuva. A irrigação pode ser considerada após avaliação das necessidades da cultura.',
      attention: 'media',
    })
  }

  if (lowMoisture && rainLikely) {
    out.push({
      id: 'aguardar',
      rule: `Umidade do solo abaixo de ${THRESHOLDS.lowMoisture}% E possibilidade de chuva igual ou acima de ${THRESHOLDS.highRainChance}%`,
      inputs: [
        `Umidade do solo: ${state.soilMoisture}%`,
        `Possibilidade de chuva: ${state.rainChance}%`,
      ],
      recommendation:
        'O solo apresenta baixa umidade, mas existe possibilidade elevada de chuva. Pode ser interessante aguardar uma atualização meteorológica antes de iniciar a irrigação.',
      attention: 'baixa',
    })
  }

  if (state.ph < THRESHOLDS.lowPh) {
    out.push({
      id: 'ph-baixo',
      rule: `pH do solo abaixo de ${THRESHOLDS.lowPh.toFixed(1).replace('.', ',')}`,
      inputs: [`pH do solo: ${state.ph.toFixed(1).replace('.', ',')}`],
      recommendation:
        'O valor informado indica possível acidez elevada. Uma análise profissional do solo seria necessária antes de realizar qualquer correção.',
      attention: 'alta',
    })
  }

  if (state.ph > THRESHOLDS.highPh) {
    out.push({
      id: 'ph-alto',
      rule: `pH do solo acima de ${THRESHOLDS.highPh.toFixed(1).replace('.', ',')}`,
      inputs: [`pH do solo: ${state.ph.toFixed(1).replace('.', ',')}`],
      recommendation:
        'O valor informado indica solo alcalino. Em faixas alcalinas, alguns micronutrientes ficam menos disponíveis para as plantas. A avaliação profissional é necessária antes de qualquer intervenção.',
      attention: 'media',
    })
  }

  if (state.pestRisk === 'alto') {
    out.push({
      id: 'pragas',
      rule: 'Risco de pragas classificado como alto',
      inputs: [`Risco de pragas: ${pestRiskLabels[state.pestRisk]}`],
      recommendation:
        'Os dados indicam possível aumento do risco de pragas. Recomenda-se realizar uma inspeção na plantação antes de tomar qualquer medida.',
      attention: 'alta',
    })
  }

  if (
    state.temperature > THRESHOLDS.highTemperature &&
    (state.cropStage === 'floracao' || state.cropStage === 'vegetativo')
  ) {
    out.push({
      id: 'calor',
      rule: `Temperatura acima de ${THRESHOLDS.highTemperature} °C E cultura em estágio sensível`,
      inputs: [
        `Temperatura: ${state.temperature} °C`,
        `Estágio da cultura: ${cropStageLabels[state.cropStage]}`,
      ],
      recommendation:
        'Temperaturas elevadas durante estágios sensíveis podem aumentar a demanda hídrica da cultura. O acompanhamento mais frequente das condições pode ser interessante neste período.',
      attention: 'media',
    })
  }

  if (out.length === 0) {
    out.push({
      id: 'estavel',
      rule: 'Nenhuma condição de alerta foi atingida',
      inputs: [
        `Umidade do solo: ${state.soilMoisture}%`,
        `pH do solo: ${state.ph.toFixed(1).replace('.', ',')}`,
        `Possibilidade de chuva: ${state.rainChance}%`,
        `Risco de pragas: ${pestRiskLabels[state.pestRisk]}`,
      ],
      recommendation:
        'Com os valores atuais, nenhuma das regras deste painel foi acionada. Isso não substitui o acompanhamento da lavoura, apenas indica que nada saiu das faixas configuradas aqui.',
      attention: 'baixa',
    })
  }

  return out
}

export const farmDisclaimer =
  'Esta simulação possui finalidade educacional e não substitui a avaliação de um engenheiro-agrônomo, técnico agrícola ou outro profissional responsável.'
