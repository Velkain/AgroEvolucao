'use client'

import { useState } from 'react'
import Image from 'next/image'
import { HelpCircle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TimelineStage } from '@/lib/timeline-data'

interface EquipmentActivityProps {
  activity: NonNullable<TimelineStage['activity']>
}

/** Atividade interativa "Você reconhece este equipamento?" (Agricultura 2.0) */
export function EquipmentActivity({ activity }: EquipmentActivityProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="rounded-xl border border-wheat/40 bg-wheat/10 p-4 sm:p-5">
      <h4 className="flex items-center gap-2 font-serif text-base font-semibold text-foreground">
        <HelpCircle className="h-5 w-5 text-wheat-foreground" aria-hidden="true" />
        {activity.question}
      </h4>

      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
        <Image
          src={activity.image || '/placeholder.svg'}
          alt={activity.imageAlt}
          width={640}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {activity.prompt}
      </p>

      {revealed ? (
        <div
          className="mt-4 flex items-start gap-2 rounded-lg bg-background p-4 text-sm leading-relaxed text-foreground"
          role="status"
        >
          <Lightbulb
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>{activity.answer}</span>
        </div>
      ) : (
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => setRevealed(true)}
        >
          Mostrar resposta
        </Button>
      )}
    </div>
  )
}
