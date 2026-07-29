import { MessagesSquare, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { objectiveCards } from '@/lib/site-data'

export function LessonObjective() {
  return (
    <section
      id="objetivo"
      aria-labelledby="objetivo-title"
      className="scroll-mt-20 border-t border-border/60 bg-card py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Target className="h-4 w-4" />
            Objetivo da apresentação
          </span>
          <h2
            id="objetivo-title"
            className="mt-5 text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Identificar os marcos que transformaram a agricultura
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Identificar os principais marcos históricos, eventos e mudanças que
            influenciaram a prática agrícola desde os primórdios da civilização
            até os dias atuais.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {objectiveCards.map((card, index) => (
            <Card
              key={card.title}
              className="h-full border-border/70 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-2xl font-semibold text-border">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <CardTitle className="mt-3 text-lg text-foreground">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Momento de conversa */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-accent/30 bg-accent/5">
          <div className="relative bg-dot-grid">
            <div className="flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <MessagesSquare className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Momento de conversa
                </p>
                <p className="mt-2 text-balance font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                  Como era a produção agrícola na época dos nossos avós? Quais
                  mudanças conseguimos perceber em relação à agricultura atual?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
