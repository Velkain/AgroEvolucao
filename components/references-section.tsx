import { BookMarked, BookOpen, ExternalLink, Satellite } from 'lucide-react'
import {
  institutionalSources,
  usedInThisProject,
  contentSources,
} from '@/lib/references-data'

function SourceList({ items }: { items: typeof institutionalSources }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item.name}
          className="rounded-xl border border-border bg-card p-4 sm:p-5"
        >
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {item.name}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-medium text-foreground">{item.name}</span>
          )}
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function ReferencesSection() {
  return (
    <section
      id="referencias"
      aria-labelledby="referencias-title"
      className="scroll-mt-20 border-t border-border/60 bg-secondary/25 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="referencias-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Fontes e referências
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Instituições de referência para consulta, mais o que este site
            efetivamente usa. Nada aqui foi inventado para preencher espaço.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
            <BookMarked className="h-5 w-5 text-accent-foreground" aria-hidden="true" />
            Fontes consultadas para o conteúdo
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Estas páginas e publicações embasam os temas de solo, nutrientes,
            carbono, agricultura de precisão e bioinsumos apresentados no site.
          </p>
          <SourceList items={contentSources} />
        </div>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
            <Satellite className="h-5 w-5 text-tech" aria-hidden="true" />
            Fonte de dados usada neste site
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A seção de fazenda inteligente consome dados reais. A fonte precisa
            ser creditada, e a licença exige isso.
          </p>
          <SourceList items={usedInThisProject} />
        </div>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
            <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
            Instituições para consulta
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Endereços oficiais verificados. São pontos de partida para pesquisa,
            não citações de trabalhos específicos.
          </p>
          <SourceList items={institutionalSources} />
        </div>
      </div>
    </section>
  )
}
