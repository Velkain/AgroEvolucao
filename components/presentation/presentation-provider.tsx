'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { siteSections } from '@/lib/site-data'

interface PresentationContextValue {
  /** Modo apresentação ligado */
  active: boolean
  /** Índice da seção atual em `siteSections` */
  current: number
  total: number
  enter: () => void
  exit: () => void
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  /** Tela cheia foi negada pelo navegador; o layout de apresentação segue valendo */
  fullscreenDenied: boolean
}

const PresentationContext = createContext<PresentationContextValue | null>(null)

export function usePresentation() {
  const value = useContext(PresentationContext)
  if (!value) {
    throw new Error('usePresentation precisa estar dentro de PresentationProvider')
  }
  return value
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PresentationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)
  const [current, setCurrent] = useState(0)
  const [fullscreenDenied, setFullscreenDenied] = useState(false)
  const total = siteSections.length

  const scrollTo = useCallback((index: number) => {
    const section = siteSections[index]
    if (!section) return
    document.getElementById(section.id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1))
      setCurrent(clamped)
      scrollTo(clamped)
    },
    [scrollTo, total],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const enter = useCallback(() => {
    setActive(true)
    // Tela cheia é um pedido, não uma garantia: navegador ou política podem negar.
    document.documentElement.requestFullscreen?.().catch(() => {
      setFullscreenDenied(true)
    })
  }, [])

  const exit = useCallback(() => {
    setActive(false)
    setFullscreenDenied(false)
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  /** Sair da tela cheia por fora (F11, Esc do navegador) encerra o modo. */
  useEffect(() => {
    function onFullscreenChange() {
      if (!document.fullscreenElement) setActive(false)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  /** Teclado: só captura quando o foco não está num campo de entrada. */
  useEffect(() => {
    if (!active) return

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const tag = target?.tagName
      if (
        tag === 'INPUT' ||
        tag === 'SELECT' ||
        tag === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          prev()
          break
        case 'Escape':
          event.preventDefault()
          exit()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, next, prev, exit])

  /** Marca o documento para o CSS do modo apresentação. */
  useEffect(() => {
    document.documentElement.classList.toggle('presenting', active)
    return () => document.documentElement.classList.remove('presenting')
  }, [active])

  const value = useMemo(
    () => ({
      active,
      current,
      total,
      enter,
      exit,
      next,
      prev,
      goTo,
      fullscreenDenied,
    }),
    [active, current, total, enter, exit, next, prev, goTo, fullscreenDenied],
  )

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  )
}
