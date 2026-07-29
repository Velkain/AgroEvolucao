import snapshot from './weather-snapshot.json'

export interface WeatherReading {
  location: {
    name: string
    state: string
    latitude: number
    longitude: number
  }
  /** ISO-8601 do momento em que os dados foram obtidos */
  fetchedAt: string
  current: {
    time: string
    /** °C */
    temperature: number
    /** % */
    humidity: number
    /** mm na última hora */
    precipitation: number
    /** °C na superfície do solo */
    soilTemperature: number
    /** m³/m³ — de 0 a 1 cm */
    soilMoistureSurface: number
    /** m³/m³ — de 3 a 9 cm, a faixa onde estão boa parte das raízes */
    soilMoistureRoot: number
  }
  daily: {
    date: string
    tempMin: number
    tempMax: number
    /** mm acumulados no dia */
    precipitation: number
    /** % de chance máxima de chuva no dia */
    precipitationChance: number
  }[]
}

export interface WeatherResult {
  data: WeatherReading
  /**
   * `live` = veio da API agora. `snapshot` = a API não respondeu e estamos
   * usando a medição gravada no repositório. A interface mostra a diferença:
   * um trabalho que promete dado real precisa admitir quando o dado é antigo.
   */
  source: 'live' | 'snapshot'
}

/** Snapshot real gravado no repositório. Nunca é dado inventado — é dado antigo. */
export const weatherSnapshot = snapshot as WeatherReading

const OPEN_METEO_URL =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${weatherSnapshot.location.latitude}` +
  `&longitude=${weatherSnapshot.location.longitude}` +
  '&current=temperature_2m,relative_humidity_2m,precipitation,soil_temperature_0cm,soil_moisture_0_to_1cm,soil_moisture_3_to_9cm' +
  '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max' +
  '&timezone=America%2FCuiaba&forecast_days=7'

interface OpenMeteoResponse {
  current: Record<string, number | string>
  daily: Record<string, (number | string)[]>
}

/**
 * Busca a medição atual no servidor, com revalidação de uma hora.
 *
 * Nunca lança: se a rede falhar — Wi-Fi de escola durante a apresentação é o
 * caso real que isto protege — devolve o snapshot gravado e sinaliza a origem.
 */
export async function getWeather(): Promise<WeatherResult> {
  try {
    const response = await fetch(OPEN_METEO_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const raw = (await response.json()) as OpenMeteoResponse
    const daily = raw.daily.time as string[]

    return {
      source: 'live',
      data: {
        location: weatherSnapshot.location,
        fetchedAt: new Date().toISOString(),
        current: {
          time: String(raw.current.time),
          temperature: Number(raw.current.temperature_2m),
          humidity: Number(raw.current.relative_humidity_2m),
          precipitation: Number(raw.current.precipitation),
          soilTemperature: Number(raw.current.soil_temperature_0cm),
          soilMoistureSurface: Number(raw.current.soil_moisture_0_to_1cm),
          soilMoistureRoot: Number(raw.current.soil_moisture_3_to_9cm),
        },
        daily: daily.map((date, i) => ({
          date,
          tempMin: Number(raw.daily.temperature_2m_min[i]),
          tempMax: Number(raw.daily.temperature_2m_max[i]),
          precipitation: Number(raw.daily.precipitation_sum[i]),
          precipitationChance: Number(raw.daily.precipitation_probability_max[i]),
        })),
      },
    }
  } catch {
    return { source: 'snapshot', data: weatherSnapshot }
  }
}

/** Converte umidade volumétrica (m³/m³) para a porcentagem que o painel exibe. */
export function moistureToPercent(value: number): number {
  return Math.round(value * 100)
}

export const weatherSourceCredit = {
  name: 'Open-Meteo',
  url: 'https://open-meteo.com/',
  license: 'CC BY 4.0',
}
