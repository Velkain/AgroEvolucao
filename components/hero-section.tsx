import {
  Sparkles,
  Sprout,
  Wheat,
  Shovel,
  ArrowRight,
  PlayCircle,
  Cpu,
  Radar,
  Plane,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { heroTags } from '@/lib/site-data'

const pastItems = [
  { icon: Shovel, label: 'Arado' },
  { icon: Sprout, label: 'Cultivo manual' },
  { icon: Wheat, label: 'Solo e colheita' },
]

const futureItems = [
  { icon: Plane, label: 'Drones' },
  { icon: Radar, label: 'Sensores' },
  { icon: Cpu, label: 'Dados' },
  { icon: Brain, label: 'IA' },
]

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
        <div className="max-w-xl">
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
            Uma viagem interativa pelos principais acontecimentos, tecnologias e
            transformações que marcaram a agricultura desde os primeiros
            cultivos até a Agricultura 5.0.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/*
              `nativeButton={false}` é obrigatório aqui: o alvo do render é uma
              âncora, não um <button>, e sem isso o Base UI aplica semântica de
              botão sobre um elemento que não é botão.
            */}
            <Button
              render={<a href="#objetivo" />}
              nativeButton={false}
              size="lg"
            >
              <PlayCircle className="h-5 w-5" />
              Iniciar apresentação
            </Button>
            <Button
              render={<a href="#introducao" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              Explorar evolução
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

        {/* Visual passado -> futuro */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
          {/* Passado */}
          <div className="rounded-2xl border border-earth/30 bg-earth/10 p-4 sm:p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-earth">
              Passado
            </p>
            <ul className="flex flex-col gap-3">
              {pastItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-earth/15 text-earth">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-foreground/85">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transição */}
          <div
            className="flex flex-col items-center gap-1 text-accent"
            aria-hidden="true"
          >
            <span className="h-10 w-px bg-gradient-to-b from-earth/40 to-accent sm:h-16" />
            <ArrowRight className="h-6 w-6" />
            <span className="h-10 w-px bg-gradient-to-b from-accent to-primary sm:h-16" />
          </div>

          {/* Futuro */}
          <div className="rounded-2xl border border-tech/30 bg-tech/10 p-4 sm:p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-tech">
              Futuro
            </p>
            <ul className="flex flex-col gap-3">
              {futureItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tech/15 text-tech">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-foreground/85">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
