import { School, Users, GraduationCap, CalendarDays, Info } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'
import { siteConfig, projectInfo } from '@/lib/site-data'

const details = [
  { icon: School, label: 'Escola', value: projectInfo.school },
  { icon: Users, label: 'Turma', value: projectInfo.grade },
  { icon: Users, label: 'Integrantes', value: projectInfo.members },
  { icon: GraduationCap, label: 'Professora', value: projectInfo.teacher },
]

export function SiteFooter() {
  return (
    <footer
      id="ficha-projeto"
      className="scroll-mt-20 border-t border-border bg-primary text-primary-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="h-9 w-9" />
              <div className="leading-tight">
                <p className="font-serif text-xl font-semibold">
                  {siteConfig.name}
                </p>
                <p className="text-sm text-primary-foreground/70">
                  {siteConfig.subtitle}
                </p>
              </div>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-primary-foreground/80">
              <CalendarDays className="h-4 w-4" />
              Ano letivo {siteConfig.academicYear}
            </p>
          </div>

          {/* Informações editáveis */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              Ficha do projeto
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-4"
                >
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/60">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-base font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-primary-foreground/75">
            <Info className="h-4 w-4 shrink-0" />
            Projeto com finalidade estritamente educacional.
          </p>
          <p className="text-sm text-primary-foreground/60">
            © {siteConfig.academicYear} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
