import {
  ArrowRight,
  Brain,
  HelpCircle,
  ListOrdered,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { stagger } from '@/lib/animation'

interface ActivityLink {
  href: string
  icon: LucideIcon
  title: string
  description: string
  /** Onde a atividade vive de fato */
  location: string
}

/**
 * Índice das partes interativas — atalhos, não cópias. Cada atividade continua
 * morando na seção a que pertence; aqui elas só ficam achaveis de uma vez,
 * o que serve tanto para estudar quanto para saltar direto durante a
 * apresentação.
 */
const activities: ActivityLink[] = [
  {
    href: '#evolucao',
    icon: HelpCircle,
    title: 'Você reconhece este equipamento?',
    description:
      'Identifique uma grade agrícola pela ilustração antes de ver a resposta.',
    location: 'No detalhe da Agricultura 2.0',
  },
  {
    href: '#atividade-eras',
    icon: Sparkles,
    title: 'De que era é isso?',
    description:
      'Uma tecnologia por vez: descubra em qual das cinco etapas ela se consolidou.',
    location: 'Após o atlas de tecnologias',
  },
  {
    href: '#fazenda-inteligente',
    icon: SlidersHorizontal,
    title: 'E se as condições fossem outras?',
    description:
      'Parta do clima real de Sorriso e mude umidade, pH e chuva para ver a recomendação mudar.',
    location: 'Na fazenda inteligente',
  },
  {
    href: '#atividade-ordenar',
    icon: ListOrdered,
    title: 'Ordene a linha do tempo',
    description:
      'Coloque as cinco etapas da agricultura em ordem cronológica.',
    location: 'No resumo',
  },
  {
    href: '#quiz',
    icon: Brain,
    title: 'Quiz no estilo ENEM',
    description:
      'Doze questões com explicação em cada resposta e revisão dos erros ao final.',
    location: 'Seção própria',
  },
]

export function ActivitiesSection() {
  return (
    <section
      id="atividades"
      aria-labelledby="atividades-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="atividades-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Atividades
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Tudo que há para fazer neste site, reunido. Cada atividade continua
            na seção a que pertence — aqui ficam os atalhos.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {activities.map((activity, index) => (
            <Reveal as="li" key={activity.href} delay={stagger(index)}>
              <a
                href={activity.href}
                className="group flex h-full gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
                  <activity.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-serif text-base font-semibold text-foreground">
                      {activity.title}
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </span>
                  <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                    {activity.location}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
