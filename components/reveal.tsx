'use client'

import { motion, useReducedMotion } from 'motion/react'

interface RevealProps {
  children: React.ReactNode
  /** Atraso em segundos — use com o índice para escalonar uma lista */
  delay?: number
  className?: string
  /** Elemento a renderizar. `li` para itens de lista, senão quebra a semântica. */
  as?: 'div' | 'li'
}

/**
 * Revela o conteúdo quando ele entra na tela.
 *
 * Sobe 16px e aparece — deslocamento curto de propósito: entrada longa faz o
 * leitor esperar o texto em vez de ler. Acontece uma vez só; ao rolar de volta
 * o conteúdo continua visível, porque reanimar a cada passagem irrita.
 *
 * Com `prefers-reduced-motion`, entra pronto. Sem fade lento como consolo: o
 * estado final é idêntico, só o percurso deixa de existir.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = as === 'li' ? motion.li : motion.div

  if (reduced) {
    const Plain = as === 'li' ? 'li' : 'div'
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -80px 0px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  )
}
