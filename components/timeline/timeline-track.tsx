'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * A linha da timeline, que se desenha de terra para tecnologia quando entra em
 * cena. É o único momento animado do site: a mesma ideia do North Star — o eixo
 * Terra→Silício — executada como movimento em vez de só como cor.
 *
 * Com `prefers-reduced-motion`, a linha aparece pronta. Nada de fade lento como
 * consolo: o estado final é idêntico, só o percurso deixa de existir.
 */
export function TimelineTrack({
  orientation,
  className,
  style,
}: {
  orientation: 'horizontal' | 'vertical'
  className?: string
  style?: React.CSSProperties
}) {
  const reduced = useReducedMotion()
  const isHorizontal = orientation === 'horizontal'

  return (
    <span
      aria-hidden="true"
      className={cn('overflow-hidden bg-border', className)}
      style={style}
    >
      <motion.span
        className={cn(
          'block h-full w-full',
          isHorizontal
            ? 'bg-gradient-to-r from-earth via-wheat to-tech'
            : 'bg-gradient-to-b from-earth via-wheat to-tech',
        )}
        initial={
          reduced ? { scaleX: 1, scaleY: 1 } : isHorizontal ? { scaleX: 0 } : { scaleY: 0 }
        }
        whileInView={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
        }
        style={{ transformOrigin: isHorizontal ? 'left center' : 'center top' }}
      />
    </span>
  )
}
