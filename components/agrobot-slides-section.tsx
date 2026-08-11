'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Presentation,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AGROBOT_PDF_URL, agrobotSlides } from '@/lib/agrobot-slides'

export function AgroBotSlidesSection() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)

  function previous() {
    setPage((current) => Math.max(0, current - 1))
  }

  function next() {
    setPage((current) => Math.min(agrobotSlides.length - 1, current + 1))
  }

  async function openFullscreen() {
    try {
      await stageRef.current?.requestFullscreen?.()
    } catch {
      // O diálogo continua utilizável quando o navegador nega tela cheia.
    }
  }

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('button, a, input, select, textarea, [contenteditable]'),
      )

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        setPage((current) => Math.max(0, current - 1))
      }

      if (event.key === 'ArrowRight' || (event.code === 'Space' && !isInteractive)) {
        event.preventDefault()
        event.stopPropagation()
        setPage((current) => Math.min(agrobotSlides.length - 1, current + 1))
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setPage(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        setPage(agrobotSlides.length - 1)
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open])

  return (
    <section
      id="slides-agrobot"
      aria-labelledby="slides-agrobot-title"
      className="scroll-mt-20 border-t border-border/70 bg-secondary/45 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-primary/25 bg-card elev-2">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tech text-tech-foreground shadow-sm">
                <Bot className="h-8 w-8" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tech">
                  Apresentação complementar
                </span>
                <h2
                  id="slides-agrobot-title"
                  className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground"
                >
                  Apresente os slides do AgroBot Vision
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  Navegue pelos 7 slides em um palco próprio, usando os controles,
                  o teclado ou a tela cheia. O PDF original também permanece disponível.
                </p>
              </div>
            </div>

            <Dialog
              open={open}
              onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (isOpen) setPage(0)
              }}
            >
              <DialogTrigger
                render={
                  <Button type="button" size="lg" className="w-full px-5 lg:w-auto" />
                }
              >
                <Presentation className="h-5 w-5" aria-hidden="true" />
                Apresentar slides
              </DialogTrigger>

              <DialogContent
                showCloseButton
                className="h-[calc(100dvh-1rem)] max-h-none w-[calc(100vw-1rem)] max-w-none gap-0 overflow-hidden rounded-2xl bg-neutral-950 p-0 text-white sm:max-w-none"
              >
                <div
                  ref={stageRef}
                  data-slide-stage
                  className="flex h-full min-h-0 flex-col bg-neutral-950 text-white"
                >
                  <DialogHeader
                    data-slide-header
                    className="flex-row items-center justify-between gap-3 border-b border-white/10 bg-neutral-950 px-4 py-3 pr-14"
                  >
                    <div className="min-w-0">
                      <DialogTitle className="truncate font-serif text-lg text-white">
                        AgroBot Vision
                      </DialogTitle>
                      <DialogDescription className="hidden text-neutral-400 sm:block">
                        Use ← →, Início, Fim ou a barra de espaço para navegar.
                      </DialogDescription>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={openFullscreen}
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      >
                        <Maximize2 aria-hidden="true" />
                        <span className="hidden sm:inline">Tela cheia</span>
                      </Button>
                      <Button
                        nativeButton={false}
                        render={
                          <a
                            href={AGROBOT_PDF_URL}
                            target="_blank"
                            rel="noreferrer"
                          />
                        }
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink aria-hidden="true" />
                        <span className="hidden sm:inline">Abrir PDF</span>
                      </Button>
                    </div>
                  </DialogHeader>

                  <div
                    data-slide-canvas
                    className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#292929_0%,_#0a0a0a_72%)] p-2 sm:p-5 lg:p-8"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 48, scale: 0.985 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -48, scale: 0.985 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        data-slide-frame
                        className="relative mx-auto aspect-video h-auto max-h-full w-full max-w-[min(100%,calc((100dvh-9rem)*16/9))] overflow-hidden rounded-md bg-black shadow-2xl ring-1 ring-white/15"
                      >
                        <Image
                          src={agrobotSlides[page].src}
                          alt={`Slide ${page + 1} de ${agrobotSlides.length}: ${agrobotSlides[page].title}`}
                          fill
                          priority={page === 0}
                          sizes="100vw"
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <button
                      data-slide-arrow
                      type="button"
                      onClick={previous}
                      disabled={page === 0}
                      aria-label="Slide anterior"
                      className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/80 text-white shadow-xl backdrop-blur transition hover:scale-105 hover:bg-black disabled:pointer-events-none disabled:opacity-20 sm:left-6 sm:h-14 sm:w-14"
                    >
                      <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                      data-slide-arrow
                      type="button"
                      onClick={next}
                      disabled={page === agrobotSlides.length - 1}
                      aria-label="Próximo slide"
                      className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/80 text-white shadow-xl backdrop-blur transition hover:scale-105 hover:bg-black disabled:pointer-events-none disabled:opacity-20 sm:right-6 sm:h-14 sm:w-14"
                    >
                      <ChevronRight className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div
                    data-slide-footer
                    className="flex items-center justify-center border-t border-white/10 bg-neutral-950 px-4 py-2.5"
                  >
                    <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium tabular-nums text-neutral-300">
                      {page + 1} / {agrobotSlides.length}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}
