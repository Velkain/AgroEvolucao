'use client'

import { useState } from 'react'
import {
  Antenna,
  CircleAlert,
  Droplets,
  Gauge,
  RotateCcw,
  Satellite,
  Sprout,
  Thermometer,
  TriangleAlert,
  Waves,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PrecipitationChart,
  TemperatureRangeChart,
  WeatherTable,
} from '@/components/smart-farm/weather-charts'
import {
  evaluate,
  cropStageLabels,
  pestRiskLabels,
  farmDisclaimer,
  type CropStage,
  type FarmState,
  type PestRisk,
  type AttentionLevel,
} from '@/lib/farm-rules'
import {
  moistureToPercent,
  weatherSourceCredit,
  type WeatherResult,
} from '@/lib/weather'
import { cn } from '@/lib/utils'

const attentionStyles: Record<
  AttentionLevel,
  { label: string; chip: string; panel: string }
> = {
  baixa: {
    label: 'Atenção baixa',
    chip: 'bg-primary/12 text-primary',
    panel: 'border-primary/25 bg-primary/5',
  },
  media: {
    label: 'Atenção média',
    chip: 'bg-accent/20 text-accent-foreground',
    panel: 'border-accent/30 bg-accent/8',
  },
  alta: {
    label: 'Atenção alta',
    chip: 'bg-earth/15 text-earth',
    panel: 'border-earth/35 bg-earth/6',
  },
}

function Reading({
  icon: Icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: typeof Thermometer
  label: string
  value: string
  unit?: string
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-4 w-4 text-tech" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 font-serif text-2xl font-semibold text-foreground" data-numeric>
        {value}
        {unit ? (
          <span className="ml-1 text-base font-normal text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </p>
      {hint ? (
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function SliderControl({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  origin,
  format,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  origin: 'medido' | 'hipotese'
  format?: (value: number) => string
  onChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="flex items-center gap-2">
          <OriginTag origin={origin} />
          <span
            className="text-sm font-semibold text-foreground"
            data-numeric
          >
            {format ? format(value) : value}
            {unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
    </div>
  )
}

function OriginTag({ origin }: { origin: 'medido' | 'hipotese' }) {
  return origin === 'medido' ? (
    <span className="rounded-full bg-tech/12 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-tech">
      Partiu do real
    </span>
  ) : (
    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Hipótese
    </span>
  )
}

export function FarmPanel({ weather }: { weather: WeatherResult }) {
  const { data, source } = weather

  /**
   * Estado inicial: o que existe medido vem da API; o resto é hipótese
   * declarada. Sem useMemo de propósito — `data` chega pronto do servidor e o
   * React Compiler memoiza isto sozinho.
   */
  const initial: FarmState = {
    soilMoisture: moistureToPercent(data.current.soilMoistureRoot),
    temperature: Math.round(data.current.temperature),
    rainChance: data.daily[0]?.precipitationChance ?? 0,
    ph: 5.4,
    pestRisk: 'moderado',
    cropStage: 'vegetativo',
  }

  const [state, setState] = useState<FarmState>(initial)
  const results = evaluate(state)
  const isPristine =
    state.soilMoisture === initial.soilMoisture &&
    state.temperature === initial.temperature &&
    state.rainChance === initial.rainChance &&
    state.ph === initial.ph &&
    state.pestRisk === initial.pestRisk &&
    state.cropStage === initial.cropStage

  const measuredAt = new Date(data.fetchedAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card elev-2">
      {/* Cabeçalho da estação */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tech/12 text-tech">
            <Satellite className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif text-lg font-semibold text-foreground">
              {data.location.name} — {data.location.state}
            </p>
            <p className="text-xs text-muted-foreground">
              Latitude {data.location.latitude}, longitude{' '}
              {data.location.longitude}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider',
              source === 'live'
                ? 'bg-leaf/15 text-leaf'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <Antenna className="h-3.5 w-3.5" aria-hidden="true" />
            {source === 'live' ? 'Dados ao vivo' : 'Medição gravada'}
          </span>
          <p className="mt-1 text-xs text-muted-foreground">
            {source === 'live' ? 'Consultado em' : 'Registrado em'} {measuredAt}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {source === 'snapshot' ? (
          <p className="mb-5 flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Não foi possível consultar a estação agora, então o painel está
            exibindo a última medição gravada. Os valores continuam sendo reais —
            apenas não são deste momento.
          </p>
        ) : null}

        {/* Medições */}
        <h3 className="text-xs font-semibold uppercase tracking-wider text-tech">
          Medido pela estação
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Reading
            icon={Thermometer}
            label="Temperatura do ar"
            value={String(data.current.temperature)}
            unit="°C"
          />
          <Reading
            icon={Droplets}
            label="Umidade do ar"
            value={String(data.current.humidity)}
            unit="%"
          />
          <Reading
            icon={Thermometer}
            label="Temperatura do solo"
            value={String(data.current.soilTemperature)}
            unit="°C"
            hint="Na superfície"
          />
          <Reading
            icon={Waves}
            label="Umidade — superfície"
            value={String(moistureToPercent(data.current.soilMoistureSurface))}
            unit="%"
            hint="Camada de 0 a 1 cm"
          />
          <Reading
            icon={Waves}
            label="Umidade — zona de raízes"
            value={String(moistureToPercent(data.current.soilMoistureRoot))}
            unit="%"
            hint="Camada de 3 a 9 cm"
          />
          <Reading
            icon={Droplets}
            label="Chuva na última hora"
            value={String(data.current.precipitation)}
            unit="mm"
          />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Compare as duas medições de umidade: a superfície seca antes da zona de
          raízes. É por isso que avaliar o solo só pelo aspecto de cima engana.
        </p>

        {/* Gráficos */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <TemperatureRangeChart daily={data.daily} />
          <PrecipitationChart daily={data.daily} />
        </div>

        <details className="mt-4 rounded-lg border border-border">
          <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Ver os mesmos dados em tabela
          </summary>
          <div className="border-t border-border px-4 py-3">
            <WeatherTable daily={data.daily} />
          </div>
        </details>

        {/* Simulação */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              E se as condições fossem outras?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Os controles partem da medição real. Ao mover qualquer um, você
              passa a testar uma situação hipotética — e as regras abaixo
              respondem a ela.
            </p>

            <div className="mt-5 space-y-5">
              <SliderControl
                id="ctrl-umidade"
                label="Umidade do solo"
                value={state.soilMoisture}
                min={0}
                max={100}
                step={1}
                unit="%"
                origin="medido"
                onChange={(soilMoisture) =>
                  setState((prev) => ({ ...prev, soilMoisture }))
                }
              />
              <SliderControl
                id="ctrl-ph"
                label="pH do solo"
                value={state.ph}
                min={3.5}
                max={9}
                step={0.1}
                unit=""
                origin="hipotese"
                format={(value) => value.toFixed(1).replace('.', ',')}
                onChange={(ph) => setState((prev) => ({ ...prev, ph }))}
              />
              <SliderControl
                id="ctrl-temperatura"
                label="Temperatura"
                value={state.temperature}
                min={0}
                max={45}
                step={1}
                unit=" °C"
                origin="medido"
                onChange={(temperature) =>
                  setState((prev) => ({ ...prev, temperature }))
                }
              />
              <SliderControl
                id="ctrl-chuva"
                label="Possibilidade de chuva"
                value={state.rainChance}
                min={0}
                max={100}
                step={5}
                unit="%"
                origin="medido"
                onChange={(rainChance) =>
                  setState((prev) => ({ ...prev, rainChance }))
                }
              />

              <div>
                <label
                  htmlFor="ctrl-pragas"
                  className="flex items-center justify-between gap-2 text-sm font-medium text-foreground"
                >
                  Risco de pragas
                  <OriginTag origin="hipotese" />
                </label>
                <select
                  id="ctrl-pragas"
                  value={state.pestRisk}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      pestRisk: event.target.value as PestRisk,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {Object.entries(pestRiskLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="ctrl-estagio"
                  className="flex items-center justify-between gap-2 text-sm font-medium text-foreground"
                >
                  Estágio da cultura
                  <OriginTag origin="hipotese" />
                </label>
                <select
                  id="ctrl-estagio"
                  value={state.cropStage}
                  onChange={(event) =>
                    setState((prev) => ({
                      ...prev,
                      cropStage: event.target.value as CropStage,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {Object.entries(cropStageLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setState(initial)}
              disabled={isPristine}
              className="mt-6 w-full"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Voltar aos dados reais
            </Button>
          </div>

          {/* Saída das regras */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              O que as regras dizem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Não há inteligência artificial aqui. São condições fixas, escritas
              por extenso — você consegue refazer o raciocínio inteiro.
            </p>

            <ul aria-live="polite" className="mt-5 space-y-4">
              {results.map((item) => {
                const styles = attentionStyles[item.attention]
                return (
                  <li
                    key={item.id}
                    className={cn('rounded-xl border p-4 sm:p-5', styles.panel)}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
                          styles.chip,
                        )}
                      >
                        {styles.label}
                      </span>
                    </div>

                    <p className="mt-3 leading-relaxed text-foreground">
                      {item.recommendation}
                    </p>

                    <dl className="mt-4 space-y-2 border-t border-border/60 pt-3 text-sm">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Regra aplicada
                        </dt>
                        <dd className="mt-0.5 text-muted-foreground">
                          {item.rule}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Dados utilizados
                        </dt>
                        <dd className="mt-0.5 flex flex-wrap gap-1.5">
                          {item.inputs.map((input) => (
                            <span
                              key={input}
                              className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground"
                              data-numeric
                            >
                              {input}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Avisos */}
        <div className="mt-8 space-y-3">
          <p className="flex items-start gap-3 rounded-xl border border-earth/30 bg-earth/5 p-4 text-sm leading-relaxed text-foreground/90">
            <TriangleAlert
              className="mt-0.5 h-5 w-5 shrink-0 text-earth"
              aria-hidden="true"
            />
            {farmDisclaimer}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
            Clima e solo medidos por{' '}
            <a
              href={weatherSourceCredit.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-2"
            >
              {weatherSourceCredit.name}
            </a>
            <span>· licença {weatherSourceCredit.license}</span>
            <span className="inline-flex items-center gap-1">
              <Sprout className="h-3.5 w-3.5" aria-hidden="true" />
              pH, risco de pragas e estágio da cultura são hipóteses do
              simulador, não medições.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
