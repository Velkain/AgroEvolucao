import Image from 'next/image'
import {
  Sparkles,
  Sprout,
  Wheat,
  ArrowRight,
  PlayCircle,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { heroTags } from '@/lib/site-data'

export function HeroSection() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-20 items-center overflow-hidden"
    >
      {/* Fundo dividido: passado (terroso) x futuro (verde/tec) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-earth/10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-tech/10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-dot-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Conteúdo */}
        <div className="max-w-2xl">
          <Badge className="gap-1.5 bg-accent text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Tecnologia e Química em Ação
          </Badge>

          <h1
            id="hero-title"
            className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            Do arado à inteligência artificial
          </h1>

          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Descubra como conhecimento do solo, química, máquinas e dados
            mudaram a produção de alimentos — e teste decisões de uma fazenda
            conectada ao longo do percurso.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/*
              `nativeButton={false}` é obrigatório aqui: o alvo do render é uma
              âncora, não um <button>, e sem isso o Base UI aplica semântica de
              botão sobre um elemento que não é botão.
            */}
            <Button
              render={<a href="#evolucao" />}
              nativeButton={false}
              size="lg"
            >
              <PlayCircle className="h-5 w-5" />
              Começar pela linha do tempo
            </Button>
            <Button
              render={<a href="#fazenda-inteligente" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              Testar a fazenda
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Temas abordados">
            {heroTags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Cena passado -> futuro */}
        <figure className="group relative overflow-hidden rounded-3xl border border-border bg-card elev-3">
          <Image
            src="/images/hero-agroevolucao-v2.webp"
            alt="Paisagem agrícola que evolui do arado manual para o trator, sensores, satélite e drone"
            width={1672}
            height={941}
            priority
            sizes="(min-width: 1024px) 44vw, 92vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 p-4 text-xs font-semibold text-white sm:text-sm">
            <span className="flex items-center gap-1.5"><Wheat className="h-4 w-4" /> Experiência</span>
            <span className="flex items-center justify-center gap-1.5"><Sprout className="h-4 w-4" /> Ciência</span>
            <span className="flex items-center justify-end gap-1.5"><Cpu className="h-4 w-4" /> Dados</span>
          </figcaption>
          <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            Agricultura 1.0 → 5.0
          </span>
        </figure>
      </div>
    </section>
  )
}
