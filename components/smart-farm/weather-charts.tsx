'use client'

import { useTheme } from 'next-themes'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { WeatherReading } from '@/lib/weather'
import { useIsClient } from '@/lib/use-is-client'

/**
 * Cores de série validadas para os dois temas (faixa de luminosidade, croma,
 * separação para daltonismo e contraste >= 3:1 contra a superfície).
 * Ficam como literais porque atributos de apresentação SVG não resolvem var().
 */
const SERIES = {
  light: { temp: '#aa5910', rain: '#0074a0', grid: '#dddfd7', ink: '#5c6b5c' },
  dark: { temp: '#cb7229', rain: '#0099cb', grid: '#303830', ink: '#9aa79a' },
} as const

function useSeriesColors() {
  const { resolvedTheme } = useTheme()
  const mounted = useIsClient()
  return mounted && resolvedTheme === 'dark' ? SERIES.dark : SERIES.light
}

function weekday(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  return date
    .toLocaleDateString('pt-BR', { weekday: 'short' })
    .replace('.', '')
    .replace(/^./, (c) => c.toUpperCase())
}

interface TooltipPayloadItem {
  payload: { label: string; min?: number; max?: number; mm?: number }
}

function ChartTooltip({
  active,
  payload,
  render,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  render: (point: TooltipPayloadItem['payload']) => React.ReactNode
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-sm elev-2">
      {render(payload[0].payload)}
    </div>
  )
}

export function TemperatureRangeChart({ daily }: { daily: WeatherReading['daily'] }) {
  const colors = useSeriesColors()
  const data = daily.map((day) => ({
    label: weekday(day.date),
    range: [day.tempMin, day.tempMax] as [number, number],
    min: day.tempMin,
    max: day.tempMax,
  }))

  return (
    <figure className="m-0">
      <figcaption className="text-sm font-medium text-foreground">
        Faixa de temperatura diária
        <span className="ml-1.5 font-normal text-muted-foreground">
          mínima a máxima, em °C
        </span>
      </figcaption>
      <div className="mt-3 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: colors.ink, fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fill: colors.ink, fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: colors.grid, strokeWidth: 2 }}
              content={
                <ChartTooltip
                  render={(point) => (
                    <>
                      <p className="font-medium text-foreground">{point.label}</p>
                      <p className="text-muted-foreground" data-numeric>
                        {point.min}° a {point.max}°
                      </p>
                    </>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="range"
              stroke={colors.temp}
              strokeWidth={2}
              fill={colors.temp}
              fillOpacity={0.18}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </figure>
  )
}

export function PrecipitationChart({ daily }: { daily: WeatherReading['daily'] }) {
  const colors = useSeriesColors()
  const data = daily.map((day) => ({
    label: weekday(day.date),
    mm: day.precipitation,
    chance: day.precipitationChance,
  }))
  const total = daily.reduce((sum, day) => sum + day.precipitation, 0)

  return (
    <figure className="m-0">
      <figcaption className="text-sm font-medium text-foreground">
        Chuva prevista por dia
        <span className="ml-1.5 font-normal text-muted-foreground">
          em milímetros · {total.toFixed(1)} mm em 7 dias
        </span>
      </figcaption>
      <div className="mt-3 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: colors.ink, fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fill: colors.ink, fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: colors.grid, fillOpacity: 0.4 }}
              content={
                <ChartTooltip
                  render={(point) => (
                    <>
                      <p className="font-medium text-foreground">{point.label}</p>
                      <p className="text-muted-foreground" data-numeric>
                        {point.mm} mm previstos
                      </p>
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey="mm"
              fill={colors.rain}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {total === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Nenhuma chuva prevista para os próximos sete dias — é o que caracteriza
          a estação seca nesta região.
        </p>
      ) : null}
    </figure>
  )
}

/** Tabela equivalente aos gráficos, para leitor de tela e para conferência. */
export function WeatherTable({ daily }: { daily: WeatherReading['daily'] }) {
  return (
    <table className="w-full text-left text-sm">
      <caption className="sr-only">
        Previsão diária de temperatura e chuva para os próximos sete dias
      </caption>
      <thead>
        <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
          <th scope="col" className="py-2 font-semibold">Dia</th>
          <th scope="col" className="py-2 text-right font-semibold">Mín.</th>
          <th scope="col" className="py-2 text-right font-semibold">Máx.</th>
          <th scope="col" className="py-2 text-right font-semibold">Chuva</th>
        </tr>
      </thead>
      <tbody>
        {daily.map((day) => (
          <tr key={day.date} className="border-b border-border/60 last:border-0">
            <th scope="row" className="py-2 font-normal text-foreground">
              {weekday(day.date)}
            </th>
            <td className="py-2 text-right text-muted-foreground" data-numeric>
              {day.tempMin}°C
            </td>
            <td className="py-2 text-right text-muted-foreground" data-numeric>
              {day.tempMax}°C
            </td>
            <td className="py-2 text-right text-muted-foreground" data-numeric>
              {day.precipitation} mm
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
