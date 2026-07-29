'use client'

import {
  ArrowRight,
  ListChecks,
  Wrench,
  FlaskConical,
  ThumbsUp,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { EquipmentActivity } from '@/components/timeline/equipment-activity'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import type { TimelineStage } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

interface DetailSection {
  id: string
  icon: LucideIcon
  title: string
  items: string[]
  accentClass: string
}

/** Uma seção do acordeão: gatilho com ícone, título e contagem; painel com a lista. */
function DetailAccordionItem({
  id,
  icon: Icon,
  title,
  items,
  accentClass,
}: DetailSection) {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="grid grid-cols-[minmax(0,1fr)_2rem_1rem] items-center gap-3 py-3.5">
        <span className="flex min-w-0 items-center gap-2.5 font-serif text-base font-semibold text-foreground">
          <Icon className={cn('h-5 w-5 shrink-0', accentClass)} aria-hidden="true" />
          {title}
        </span>
        <span className="flex h-5 w-8 shrink-0 items-center justify-center justify-self-center rounded-full bg-muted text-xs font-medium tabular-nums text-muted-foreground">
          {items.length}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2 pl-7">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className={cn(
                  'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                  accentClass.replace('text-', 'bg-'),
                )}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

interface StageDetailDialogProps {
  /** Ícone omitido: não é serializável através da fronteira servidor→cliente */
  stage: Omit<TimelineStage, 'icon'>
  /**
   * Ilustração já renderizada no servidor. Vem pronta como elemento porque o
   * componente de arte precisa do ícone da era, que é uma função e não
   * atravessa a fronteira servidor→cliente como dado.
   */
  artwork: React.ReactNode
  /** Na linha de cinco colunas o botão ocupa a largura toda do card */
  compact?: boolean
}

export function StageDetailDialog({
  stage,
  artwork,
  compact,
}: StageDetailDialogProps) {
  const theme = stageThemeMap[stage.theme]

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            className={compact ? 'w-full' : 'w-full sm:w-auto'}
          />
        }
      >
        Ver detalhes
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <div className="relative">
          {artwork}
          <span
            className={cn(
              'absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full font-serif text-base font-bold elev-1',
              theme.marker,
            )}
          >
            {stage.number}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <DialogHeader className="text-left">
            <span
              className={cn(
                'inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium',
                theme.chip,
              )}
            >
              {stage.period}
            </span>
            <DialogTitle className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground">
              {stage.title}
            </DialogTitle>
            <DialogDescription className="text-pretty leading-relaxed">
              {stage.shortDescription}
            </DialogDescription>
          </DialogHeader>

          {stage.keyMessage ? (
            <p
              className={cn(
                'mt-5 border-l-2 pl-4 font-serif text-lg leading-relaxed text-balance text-foreground',
                theme.border,
              )}
            >
              {stage.keyMessage}
            </p>
          ) : null}

          {/*
            Acordeão em vez de grade: são cinco listas longas num diálogo que
            já rola muito. "Participação da química" abre sozinha — num
            trabalho de Química, é o painel que importa (a Regra do Âmbar
            aplicada à interação).
          */}
          <Accordion
            defaultValue={['quimica']}
            className="mt-6 border-t border-border"
          >
            <DetailAccordionItem
              id="caracteristicas"
              icon={ListChecks}
              title="Características"
              items={stage.characteristics}
              accentClass={theme.text}
            />
            <DetailAccordionItem
              id="tecnologias"
              icon={Wrench}
              title="Tecnologias"
              items={stage.technologies}
              accentClass={theme.text}
            />
            <DetailAccordionItem
              id="quimica"
              icon={FlaskConical}
              title="Participação da química"
              items={stage.chemistry}
              accentClass="text-accent"
            />
            <DetailAccordionItem
              id="beneficios"
              icon={ThumbsUp}
              title="Benefícios"
              items={stage.benefits}
              accentClass="text-primary"
            />
            <DetailAccordionItem
              id="desafios"
              icon={TriangleAlert}
              title="Desafios"
              items={stage.challenges}
              accentClass="text-earth"
            />
          </Accordion>

          {stage.activity ? (
            <div className="mt-6">
              <EquipmentActivity activity={stage.activity} />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
