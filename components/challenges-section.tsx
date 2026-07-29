import { Wrench } from 'lucide-react'
import { challengeGroups, challengesClosing } from '@/lib/challenges-data'

export function ChallengesSection() {
  return (
    <section
      id="desafios"
      aria-labelledby="desafios-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="desafios-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Nem toda inovação é simples
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Os obstáculos da agricultura digital não são avulsos. Agrupados,
            fica claro que eles têm quatro causas em comum.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-10">
          {challengeGroups.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`desafio-${group.id}`}
              className="border-l-2 border-earth/40 pl-5 sm:pl-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-earth/12 text-earth">
                  <group.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3
                  id={`desafio-${group.id}`}
                  className="font-serif text-xl font-semibold text-foreground"
                >
                  {group.title}
                </h3>
              </div>

              <p className="mt-3 text-pretty leading-relaxed text-earth">
                {group.framing}
              </p>

              <dl className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <div key={item.title}>
                    <dt className="font-medium text-foreground">
                      {item.title}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl items-start gap-4 rounded-2xl border border-earth/30 bg-earth/5 p-6 sm:p-8">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-earth text-earth-foreground">
            <Wrench className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-balance font-serif text-lg leading-relaxed text-foreground sm:text-xl">
            {challengesClosing}
          </p>
        </div>
      </div>
    </section>
  )
}
