'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useIsClient } from '@/lib/use-is-client'

/**
 * Alternador claro/escuro. Antes da montagem o tema real é desconhecido
 * (fica no localStorage), então renderiza um botão inerte do mesmo tamanho
 * para o cabeçalho não pular de largura na hidratação.
 */
export function ThemeToggle() {
  const mounted = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none opacity-0"
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
