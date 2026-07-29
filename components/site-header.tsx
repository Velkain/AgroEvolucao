'use client'

import { useState } from 'react'
import { Menu, MonitorPlay } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { BrandMark } from '@/components/brand-mark'
import { ThemeToggle } from '@/components/theme-toggle'
import { usePresentation } from '@/components/presentation/presentation-provider'
import { navLinks, siteConfig } from '@/lib/site-data'
import { useActiveSection } from '@/lib/use-active-section'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const { enter } = usePresentation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logotipo */}
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <BrandMark className="h-8 w-8 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-lg font-semibold text-primary">
              {siteConfig.name}
            </span>
            {/*
              O subtítulo só aparece onde a barra completa cabe. Entre sm e xl
              o menu disputa o mesmo espaço e ele quebrava em três linhas.
            */}
            <span className="hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground 2xl:block">
              {siteConfig.subtitle}
            </span>
          </span>
        </a>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-0.5 xl:flex"
        >
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-md px-2.5 py-2 text-[0.8125rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  isActive
                    ? 'bg-secondary text-primary'
                    : 'text-foreground/80 hover:bg-secondary hover:text-primary',
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Controles: tema sempre visível, menu só abaixo de xl */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={enter}
            aria-label="Entrar no modo apresentação"
            title="Modo apresentação"
            className="hidden shrink-0 lg:inline-flex"
          >
            <MonitorPlay className="h-4 w-4" aria-hidden="true" />
            {/* Rótulo só onde sobra largura; abaixo disso o ícone basta */}
            <span className="hidden 2xl:inline">Modo apresentação</span>
          </Button>

          <ThemeToggle />

          <div className="xl:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Abrir menu de navegação"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <BrandMark className="h-6 w-6" />
                  <span className="font-serif text-primary">
                    {siteConfig.name}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Navegação móvel"
                className="mt-2 flex flex-col gap-1 overflow-y-auto px-2 pb-4"
              >
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1)
                  return (
                    <SheetClose
                      key={link.href}
                      render={<a href={link.href} />}
                      nativeButton={false}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'rounded-md px-3 py-2.5 text-left text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        isActive
                          ? 'bg-secondary text-primary'
                          : 'text-foreground/85 hover:bg-secondary hover:text-primary',
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  )
                })}

                <SheetClose
                  render={<button type="button" />}
                  onClick={enter}
                  className="mt-3 flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-left text-base font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                >
                  <MonitorPlay className="h-4 w-4" aria-hidden="true" />
                  Modo apresentação
                </SheetClose>
              </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
