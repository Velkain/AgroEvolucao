import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { stageThemeMap } from '@/components/timeline/stage-theme'
import {
  IllustrationConnectedField,
  IllustrationRegenerativeField,
} from '@/components/timeline/stage-illustration'
import type { TimelineStage, TimelineTheme } from '@/lib/timeline-data'
import { cn } from '@/lib/utils'

const illustrations = {
  'campo-conectado': IllustrationConnectedField,
  'campo-regenerativo': IllustrationRegenerativeField,
} as const

interface StageArtworkProps {
  image?: string
  imageAlt?: string
  illustration?: TimelineStage['illustration']
  theme: TimelineTheme
  number: string
  /** Ícone da era. Só usado se não houver imagem nem cena vetorial. */
  icon?: LucideIcon
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Ilustração da etapa, em três níveis: arte pintada quando existe, cena
 * vetorial própria para 4.0 e 5.0, e um painel temático como último recurso.
 */
export function StageArtwork({
  image,
  imageAlt,
  illustration,
  theme,
  number,
  icon: Icon,
  className,
  sizes,
  priority,
}: StageArtworkProps) {
  const themeClasses = stageThemeMap[theme]

  if (image) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={image}
          alt={imageAlt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    )
  }

  if (illustration) {
    const Scene = illustrations[illustration]
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Scene />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        themeClasses.soft,
        className,
      )}
      role="img"
      aria-label={imageAlt ?? `Etapa ${number} — ilustração ainda não definida`}
    >
      {Icon ? (
        <Icon
          aria-hidden="true"
          className={cn('relative h-16 w-16 opacity-80', themeClasses.text)}
          strokeWidth={1.25}
        />
      ) : null}
    </div>
  )
}
