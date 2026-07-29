import { cn } from '@/lib/utils'

/**
 * Marca do AgroEvolução: uma folha combinada com nós de circuito,
 * unindo natureza e tecnologia.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="AgroEvolução"
      className={cn('h-8 w-8', className)}
    >
      {/* Folha */}
      <path
        d="M26 5c0 11-6 19-16 21C9 15 15 6 26 5Z"
        className="fill-secondary stroke-primary"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      {/* Nervura central como trilha de circuito */}
      <path
        d="M11 25C16 19 20 13 23 8"
        className="stroke-primary"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      {/* Ramos / trilhas */}
      <path
        d="M18 15l4 1M15 19l3 2"
        className="stroke-tech"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* Nós do circuito */}
      <circle cx="23" cy="8" r="1.8" className="fill-tech" />
      <circle cx="22.5" cy="16" r="1.6" className="fill-tech" />
      <circle cx="18" cy="21" r="1.6" className="fill-tech" />
    </svg>
  )
}
