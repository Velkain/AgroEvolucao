'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CircuitBoard, SkipForward, Wheat } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { BrandMark } from '@/components/brand-mark'
import { cn } from '@/lib/utils'

export const SPLASH_SESSION_KEY = 'agroevolucao:splash:v1'

const HOLD_DURATION_MS = 900
const OPEN_DURATION_SECONDS = 0.9
const OPEN_FALLBACK_MS = 1200
const OPEN_EASE = [0.16, 1, 0.3, 1] as const

type SplashPhase = 'holding' | 'opening' | 'done'
type GateSide = 'left' | 'right'

interface GateLeafProps {
  side: GateSide
  opening: boolean
  onOpened?: () => void
}

function GateLeaf({ side, opening, onOpened }: GateLeafProps) {
  const isLeft = side === 'left'
  const AccentIcon = isLeft ? Wheat : CircuitBoard

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'splash-gate-leaf absolute inset-y-0 w-[calc(50%+1px)] overflow-hidden',
        isLeft
          ? 'splash-gate-leaf-left left-0'
          : 'splash-gate-leaf-right right-0',
      )}
      initial={false}
      animate={{ rotateY: opening ? (isLeft ? -105 : 105) : 0 }}
      transition={{ duration: OPEN_DURATION_SECONDS, ease: OPEN_EASE }}
      onAnimationComplete={() => {
        if (opening) onOpened?.()
      }}
      style={{
        backfaceVisibility: 'hidden',
        transformOrigin: isLeft ? 'left center' : 'right center',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div className="absolute inset-[5%] border-[clamp(0.7rem,2vw,1.5rem)] border-splash-wood-dark/90" />

      {[20, 48, 76].map((top) => (
        <span
          key={top}
          className="splash-gate-beam absolute inset-x-[5%] h-[clamp(0.8rem,2.4vw,1.8rem)]"
          style={{ top: `${top}%` }}
        />
      ))}

      <span
        className="splash-gate-beam absolute left-1/2 top-1/2 h-[clamp(0.8rem,2.4vw,1.8rem)] w-[130%]"
        style={{
          transform: `translate(-50%, -50%) rotate(${isLeft ? 31 : -31}deg)`,
        }}
      />

      <AccentIcon
        className={cn(
          'absolute left-1/2 top-1/2 h-[clamp(4rem,12vw,8rem)] w-[clamp(4rem,12vw,8rem)] -translate-x-1/2 -translate-y-1/2',
          isLeft ? 'text-wheat/25' : 'text-tech-foreground/20',
        )}
        strokeWidth={1.2}
      />

      <div
        className={cn(
          'absolute inset-y-0 flex w-5 flex-col justify-around py-[16%] sm:w-7',
          isLeft ? 'left-0' : 'right-0',
        )}
      >
        {[0, 1, 2].map((hinge) => (
          <span
            key={hinge}
            className="h-4 w-full rounded-sm border border-black/25 bg-splash-metal shadow-sm sm:h-5"
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SplashGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SplashPhase>('holding')
  const completed = useRef(false)
  const reducedMotion = useReducedMotion()
  const active = phase !== 'done'
  const opening = phase === 'opening'

  const finish = useCallback(() => {
    if (completed.current) return
    completed.current = true

    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, 'seen')
    } catch {
      // A abertura continua funcionando quando o armazenamento está bloqueado.
    }

    document.documentElement.dataset.splashSeen = 'true'
    setPhase('done')
  }, [])

  useEffect(() => {
    let seen = false

    try {
      seen = window.sessionStorage.getItem(SPLASH_SESSION_KEY) === 'seen'
    } catch {
      // Sem armazenamento, a splash reaparece no próximo carregamento.
    }

    if (seen || reducedMotion) {
      finish()
      return
    }

    const holdTimer = window.setTimeout(
      () => setPhase('opening'),
      HOLD_DURATION_MS,
    )

    return () => window.clearTimeout(holdTimer)
  }, [finish, reducedMotion])

  useEffect(() => {
    if (!opening) return

    const fallbackTimer = window.setTimeout(finish, OPEN_FALLBACK_MS)
    return () => window.clearTimeout(fallbackTimer)
  }, [finish, opening])

  useEffect(() => {
    if (!active) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, finish])

  return (
    <>
      {active ? (
        <div
          data-splash-screen
          role="dialog"
          aria-modal="true"
          aria-labelledby="splash-title"
          className="fixed inset-0 z-[100] overflow-hidden [perspective:1400px]"
        >
          <GateLeaf side="left" opening={opening} />
          <GateLeaf side="right" opening={opening} onOpened={finish} />

          <motion.div
            className="absolute left-1/2 top-1/2 z-20 w-[min(88vw,28rem)] -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={{
              opacity: opening ? 0 : 1,
              scale: opening ? 0.94 : 1,
            }}
            transition={{ duration: opening ? 0.25 : 0.2, ease: OPEN_EASE }}
          >
            <div className="rounded-3xl border border-border/80 bg-card/95 px-6 py-7 text-center elev-3 backdrop-blur-sm sm:px-10 sm:py-9">
              <BrandMark className="mx-auto h-16 w-16 sm:h-20 sm:w-20" />
              <h1
                id="splash-title"
                className="mt-4 font-serif text-3xl font-semibold text-primary sm:text-4xl"
              >
                AgroEvolução
              </h1>
              <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
                Do arado à inteligência artificial
              </p>
            </div>
          </motion.div>

          <motion.button
            type="button"
            onClick={finish}
            aria-label="Pular abertura"
            className="absolute right-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
            initial={false}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: opening ? 'none' : 'auto' }}
          >
            Pular abertura
            <SkipForward className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      ) : null}

      <div data-site-shell inert={active || undefined}>
        {children}
      </div>
    </>
  )
}
