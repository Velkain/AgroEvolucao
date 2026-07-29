import { MapPin, School, UsersRound } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { stagger } from '@/lib/animation'
import { groupMembers, projectInfo } from '@/lib/site-data'

export function GroupMembersSection() {
  return (
    <section
      id="integrantes"
      aria-labelledby="integrantes-title"
      className="scroll-mt-20 border-t border-border/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <UsersRound className="h-4 w-4" aria-hidden="true" />
            Nossa equipe
          </span>
          <h2
            id="integrantes-title"
            className="mt-5 text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Integrantes do grupo
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Estudantes responsáveis pela pesquisa e pela apresentação do
            projeto AgroEvolução.
          </p>
        </div>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groupMembers.map((member, index) => (
            <Reveal as="li" key={member} delay={stagger(index)}>
              <div className="flex h-full items-center rounded-xl border border-border bg-card px-5 py-4 elev-1">
                <span className="font-medium text-foreground">{member}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <address className="mx-auto mt-12 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-6 not-italic sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <School className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Instituição de ensino
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
                {projectInfo.school}
              </h3>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{projectInfo.schoolAddress}</span>
              </p>
            </div>
          </div>
        </address>
      </div>
    </section>
  )
}
