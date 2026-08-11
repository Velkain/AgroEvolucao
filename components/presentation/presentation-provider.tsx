'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  /** A seção atual possui conteúdo abaixo da página visível */
  hasMoreContent: boolean
  /** A seção atual possui conteúdo acima da página visível */
  hasPreviousContent: boolean
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

/**
 * Entra na apresentação a partir da seção que a pessoa já está lendo. Usar o
 * estado inicial (zero) aqui faria o botão sempre voltar ao início da página.
 */
function visibleSectionIndex() {
  const readingLine = Math.min(81, window.innerHeight - 1)
  let visible = 0

  for (const [index, section] of siteSections.entries()) {
    const element = document.getElementById(section.id)
    if (element && element.getBoundingClientRect().top <= readingLine) {
      visible = index
    } else if (element) {
      break
    }
  }

  return visible
}

/** Posiciona o scrollport sem herdar o `scroll-behavior: smooth` do palco. */
function positionPresentationSection(index: number) {
  const scroller = document.getElementById('conteudo')
  const section = document.getElementById(siteSections[index]?.id ?? '')
  if (!scroller || !section) return

  const viewport = scroller.getBoundingClientRect()
  const sectionBounds = section.getBoundingClientRect()
  const previousScrollBehavior = scroller.style.scrollBehavior
  scroller.style.scrollBehavior = 'auto'
  scroller.scrollTop += sectionBounds.top - viewport.top
  scroller.style.scrollBehavior = previousScrollBehavior
}

export function PresentationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)
  const [current, setCurrent] = useState(0)
  const [fullscreenDenied, setFullscreenDenied] = useState(false)
  const [hasMoreContent, setHasMoreContent] = useState(false)
  const [hasPreviousContent, setHasPreviousContent] = useState(false)
  const total = siteSections.length

  const scrollTo = useCallback(
    (
      index: number,
      behavior?: ScrollBehavior,
      block: ScrollLogicalPosition = 'start',
    ) => {
      const section = siteSections[index]
      if (!section) return
      document.getElementById(section.id)?.scrollIntoView({
        behavior:
          behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth'),
        block,
      })
    },
    [],
  )

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1))
      setCurrent(clamped)
      scrollTo(clamped)
    },
    [scrollTo, total],
  )

  const scrollPage = useCallback((direction: -1 | 1, index: number) => {
    const scroller = document.getElementById('conteudo')
    const section = document.getElementById(siteSections[index]?.id ?? '')
    if (!scroller || !section) return

    const viewport = scroller.getBoundingClientRect()
    const sectionBounds = section.getBoundingClientRect()
    const sectionStart =
      scroller.scrollTop + sectionBounds.top - viewport.top
    const sectionEnd = Math.max(
      sectionStart,
      sectionStart + sectionBounds.height - scroller.clientHeight,
    )
    const target = Math.max(
      sectionStart,
      Math.min(
        sectionEnd,
        scroller.scrollTop + direction * scroller.clientHeight * 0.85,
      ),
    )

    scroller.scrollTo({
      top: target,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  /*
   * Se a seção for maior que o palco, os controles percorrem suas páginas
   * antes de trocar de seção. Nenhuma parte de uma seção longa é pulada.
   */
  const next = useCallback(() => {
    const scroller = document.getElementById('conteudo')
    const section = document.getElementById(siteSections[current]?.id ?? '')
    if (scroller && section) {
      const viewport = scroller.getBoundingClientRect()
      if (section.getBoundingClientRect().bottom > viewport.bottom + 2) {
        scrollPage(1, current)
        return
      }
    }

    if (current < total - 1) goTo(current + 1)
  }, [current, goTo, scrollPage, total])

  const prev = useCallback(() => {
    const scroller = document.getElementById('conteudo')
    const section = document.getElementById(siteSections[current]?.id ?? '')
    if (scroller && section) {
      const viewport = scroller.getBoundingClientRect()
      if (section.getBoundingClientRect().top < viewport.top - 2) {
        scrollPage(-1, current)
        return
      }
    }

    if (current > 0) {
      const previous = current - 1
      setCurrent(previous)
      scrollTo(previous, undefined, 'end')
    }
  }, [current, scrollPage, scrollTo])

  const enter = useCallback(() => {
    const visible = visibleSectionIndex()
    setCurrent(visible)
    setHasMoreContent(false)
    setHasPreviousContent(false)
    document.documentElement.classList.add('presenting')
    setActive(true)
    setFullscreenDenied(false)

    /* Aguarda o palco trocar de layout antes de posicionar a seção. */
    window.requestAnimationFrame(() => {
      positionPresentationSection(visible)
      setCurrent(visible)
    })

    // Tela cheia é um pedido, não uma garantia: navegador ou política podem negar.
    const requestFullscreen = document.documentElement.requestFullscreen
    if (!requestFullscreen) {
      setFullscreenDenied(true)
      return
    }

    requestFullscreen.call(document.documentElement).catch(() => {
      setFullscreenDenied(true)
    })
  }, [])

  const exit = useCallback(() => {
    setActive(false)
    setFullscreenDenied(false)
    setHasMoreContent(false)
    setHasPreviousContent(false)
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
        event.defaultPrevented ||
        document.querySelector('[data-slot="dialog-content"]') ||
        tag === 'INPUT' ||
        tag === 'SELECT' ||
        tag === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          next()
          break
        case 'ArrowLeft':
          event.preventDefault()
          prev()
          break
        case 'PageDown':
          event.preventDefault()
          next()
          break
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
  }, [active, current, next, prev, scrollPage, exit])

  /** Mantém o contador correto quando a pessoa navega com roda, trackpad ou toque. */
  useEffect(() => {
    if (!active) return

    const scroller = document.getElementById('conteudo')
    if (!scroller) return

    const elements = siteSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)
    let animationFrame: number | null = null

    const updateCurrent = () => {
      animationFrame = null
      const bounds = scroller.getBoundingClientRect()
      const readingLine = bounds.top + Math.min(80, bounds.height * 0.15)
      let visible = 0

      for (const [index, element] of elements.entries()) {
        if (element.getBoundingClientRect().top <= readingLine) {
          visible = index
        } else {
          break
        }
      }

      setCurrent((previous) => (previous === visible ? previous : visible))
      const visibleBounds = elements[visible]?.getBoundingClientRect()
      setHasMoreContent(
        Boolean(visibleBounds && visibleBounds.bottom > bounds.bottom + 2),
      )
      setHasPreviousContent(
        Boolean(visibleBounds && visibleBounds.top < bounds.top - 2),
      )
    }

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateCurrent)
      }
    }

    scroller.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      scroller.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [active])

  /** Marca o documento para o CSS do modo apresentação. */
  useEffect(() => {
    document.documentElement.classList.toggle('presenting', active)
    return () => document.documentElement.classList.remove('presenting')
  }, [active])

  /**
   * O palco rola dentro de `main`. Ao sair, devolve a rolagem ao documento na
   * mesma seção, inclusive quando a tela cheia foi encerrada pelo navegador.
   */
  const wasPresenting = useRef(false)
  useEffect(() => {
    if (active) {
      wasPresenting.current = true
      return
    }

    if (!wasPresenting.current) return
    wasPresenting.current = false
    const animationFrame = window.requestAnimationFrame(() => {
      scrollTo(current, 'auto')
    })
    return () => window.cancelAnimationFrame(animationFrame)
  }, [active, current, scrollTo])

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
      hasMoreContent,
      hasPreviousContent,
    }),
    [
      active,
      current,
      total,
      enter,
      exit,
      next,
      prev,
      goTo,
      fullscreenDenied,
      hasMoreContent,
      hasPreviousContent,
    ],
  )

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  )
}
