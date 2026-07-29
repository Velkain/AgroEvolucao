import { Card } from '@/components/ui/card'
import { StageDetailDialog } from '@/components/timeline/stage-detail-dialog'
import { StageArtwork } from '@/components/timeline/stage-artwork'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import type { TimelineStage } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

interface TimelineStageCardProps {
  stage: TimelineStage
  /** Versão para a linha de cinco colunas, onde cada card tem ~240px */
  compact?: boolean
}

/**
 * "Agricultura 3.0 — A Revolução Verde" → "A Revolução Verde".
 * A era já aparece no marcador e na etiqueta ao lado; repeti-la no título
 * gasta duas linhas de um card estreito para não dizer nada de novo.
 */
function shortTitle(title: string) {
  const [, tail] = title.split(/\s+—\s+/)
  return tail ?? title
}

export function TimelineStageCard({ stage, compact }: TimelineStageCardProps) {
  const theme = stageThemeMap[stage.theme]
  // Separa o ícone (função não serializável) dos dados enviados ao Dialog cliente
  const { icon: Icon, ...stageData } = stage

  return (
    <Card
      className={cn(
        'flex h-full flex-col overflow-hidden border py-0 transition-shadow hover:elev-2',
        theme.border,
      )}
    >
      <StageArtwork
        image={stage.image}
        imageAlt={stage.imageAlt}
        illustration={stage.illustration}
        theme={stage.theme}
        number={stage.number}
        icon={Icon}
        sizes={compact ? '16rem' : '(max-width: 1280px) 100vw, 22rem'}
        className="aspect-[16/10] w-full"
      />

      <div className={cn('flex flex-1 flex-col', compact ? 'p-4' : 'p-5')}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'flex h-8 items-center rounded-full px-2.5 font-serif text-sm font-bold',
              theme.marker,
            )}
          >
            {stage.number}
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
              theme.chip,
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {stage.name}
          </span>
        </div>

        <h3
          className={cn(
            'mt-3 text-balance font-serif font-semibold leading-snug text-foreground',
            compact ? 'text-base' : 'text-lg',
          )}
        >
          {compact ? shortTitle(stage.title) : stage.title}
        </h3>

        <p className={cn('mt-1.5 text-sm font-medium', theme.text)}>
          {stage.period}
        </p>

        {!compact ? (
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            {stage.shortDescription}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <StageDetailDialog
            stage={stageData}
            compact={compact}
            artwork={
              <StageArtwork
                image={stage.image}
                imageAlt={stage.imageAlt}
                illustration={stage.illustration}
                theme={stage.theme}
                number={stage.number}
                icon={Icon}
                sizes="(max-width: 640px) 100vw, 42rem"
                className="aspect-[16/8] w-full"
              />
            }
          />
        </div>
      </div>
    </Card>
  )
}
