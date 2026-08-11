import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { LessonObjective } from '@/components/lesson-objective'
import { IntroductionSection } from '@/components/introduction-section'
import { EvolutionTimeline } from '@/components/evolution-timeline'
import { DataFlowSection } from '@/components/data-flow-section'
import { DecisionCaseSection } from '@/components/decision-case-section'
import { ChemistrySection } from '@/components/chemistry-section'
import { TechnologyAtlas } from '@/components/technology-atlas'
import { SmartFarmSection } from '@/components/smart-farm-section'
import { SustainabilitySection } from '@/components/sustainability-section'
import { ChallengesSection } from '@/components/challenges-section'
import { ActivitiesSection } from '@/components/activities-section'
import { QuizSection } from '@/components/quiz-section'
import { SummarySection } from '@/components/summary-section'
import { ReferencesSection } from '@/components/references-section'
import { GroupMembersSection } from '@/components/group-members-section'
import { SiteFooter } from '@/components/site-footer'
import { PresentationProvider } from '@/components/presentation/presentation-provider'
import { PresentationBar } from '@/components/presentation/presentation-bar'
import { SplashGate } from '@/components/splash-gate'
import { AgroBotSlidesSection } from '@/components/agrobot-slides-section'

export default function HomePage() {
  return (
    <SplashGate>
      <PresentationProvider>
        <div className="presentation-shell min-h-screen bg-background">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Pular para o conteúdo
          </a>

          <SiteHeader />

          <main id="conteudo" className="pt-16">
            {/* Abertura: o que é, para que serve, de onde partimos */}
            <HeroSection />
            <LessonObjective />
            <IntroductionSection />

            {/* O percurso histórico */}
            <EvolutionTimeline />

            {/* Como a agricultura moderna decide */}
            <DataFlowSection />
            <DecisionCaseSection />
            <ChemistrySection />
            <TechnologyAtlas />
            <SmartFarmSection />

            {/* O que isso implica */}
            <SustainabilitySection />
            <ChallengesSection />

            {/* Fechamento */}
            <ActivitiesSection />
            <QuizSection />
            <SummarySection />
            <ReferencesSection />
            <GroupMembersSection />
            <AgroBotSlidesSection />
          </main>

          <SiteFooter />
          <PresentationBar />
        </div>
      </PresentationProvider>
    </SplashGate>
  )
}
