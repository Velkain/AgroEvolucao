'use client'

import { useEffect, useState } from 'react'
import { siteSections } from '@/lib/site-data'

/**
 * Devolve o id da seção atualmente em leitura.
 *
 * Usa IntersectionObserver com uma faixa estreita logo abaixo do cabeçalho
 * fixo: a seção "ativa" é a que cruza essa linha, e não a que ocupa mais tela.
 * Isso evita que uma seção muito alta continue marcada como ativa depois que a
 * seguinte já começou.
 */
export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = siteSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio)
          } else {
            visible.delete(entry.target.id)
          }
        }

        // Entre as que cruzam a linha, vence a primeira na ordem do documento.
        const firstVisible = siteSections.find((section) =>
          visible.has(section.id),
        )
        if (firstVisible) setActive(firstVisible.id)
      },
      {
        // Faixa de ~20% da altura, logo abaixo do cabeçalho de 4rem.
        rootMargin: '-72px 0px -75% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
