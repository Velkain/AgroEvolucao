'use client'

import { useEffect, useState } from 'react'
import { siteSections } from '@/lib/site-data'

/**
 * Devolve o id da seção atualmente em leitura.
 *
 * A linha de leitura fica um pixel abaixo do `scroll-mt-20` usado pelas
 * seções. Assim, quando um link de âncora posiciona seu destino a 80px do topo,
 * essa seção — e não a anterior — passa a ser a ativa.
 */
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = siteSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    let animationFrame: number | null = null

    const updateActive = () => {
      animationFrame = null
      const readingLine = Math.min(81, window.innerHeight - 1)
      let current = elements[0]

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= readingLine) {
          current = element
        } else {
          break
        }
      }

      setActive((previous) =>
        previous === current.id ? previous : current.id,
      )
    }

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActive)
      }
    }

    updateActive()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return active
}
