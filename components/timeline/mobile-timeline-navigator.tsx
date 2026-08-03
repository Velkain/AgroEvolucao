'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TimelineStageCard } from '@/components/timeline/timeline-stage-card'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import { timelineStages } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

export function MobileTimelineNavigator() {
  const [index, setIndex] = useState(0)
  const stage = timelineStages[index]

  return (
    <div className="mt-10 md:hidden">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Etapa <span data-numeric>{index + 1}</span> de{' '}
          <span data-numeric>{timelineStages.length}</span>
        </p>
        <div className="flex gap-1.5" aria-label="Navegação da linha do tempo">
          <Button type="button" size="icon" variant="outline" onClick={() => setIndex((value) => value - 1)} disabled={index === 0} aria-label="Etapa anterior">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => setIndex((value) => value + 1)} disabled={index === timelineStages.length - 1} aria-label="Próxima etapa">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-5 gap-1.5" aria-label="Etapas da agricultura">
        {timelineStages.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(itemIndex)}
            aria-label={`Abrir ${item.name}`}
            aria-current={itemIndex === index ? 'step' : undefined}
            className={cn(
              'h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              itemIndex === index ? stageThemeMap[item.theme].marker : 'bg-border',
            )}
          />
        ))}
      </div>

      <div key={stage.id} className="animate-in fade-in slide-in-from-right-2 duration-300">
        <TimelineStageCard stage={stage} />
      </div>
    </div>
  )
}
