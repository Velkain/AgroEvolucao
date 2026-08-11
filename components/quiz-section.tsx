'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ExternalLink,
  Flame,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  quizLicenseUrls,
  quizQuestions,
  quizIntro,
  type QuizQuestion,
} from '@/lib/quiz-data'
import {
  prepareQuizQuestions,
  restorePreparedQuestions,
  type PreparedQuizQuestion,
} from '@/lib/quiz-randomization'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']
type Phase = 'intro' | 'answering' | 'feedback' | 'done'
const QUIZ_STORAGE_KEY = 'agroevolucao:quiz:v3'

interface SavedQuiz {
  questionIds: string[]
  optionOrders: Record<string, number[]>
  index: number
  choice: number | null
  phase: Exclude<Phase, 'intro'>
  answers: number[]
  streak: number
  bestStreak: number
}

export function QuizSection() {
  const [questions, setQuestions] = useState<PreparedQuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [savedQuiz, setSavedQuiz] = useState<SavedQuiz | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY)
        if (raw) setSavedQuiz(JSON.parse(raw) as SavedQuiz)
      } catch {
        // O quiz continua normalmente quando o armazenamento está indisponível.
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (phase === 'intro' || questions.length === 0) return
    const session: SavedQuiz = {
      questionIds: questions.map((item) => item.id),
      optionOrders: Object.fromEntries(
        questions.map((item) => [item.id, item.optionOrder]),
      ),
      index,
      choice,
      phase,
      answers,
      streak,
      bestStreak,
    }
    try {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(session))
    } catch {
      // Persistência é uma conveniência, não requisito para responder.
    }
  }, [answers, bestStreak, choice, index, phase, questions, streak])

  const question = questions[index]
  const total = questions.length
  const questionInProgress = phase === 'answering' || phase === 'feedback'
  const isCorrect = question ? choice === question.answer : false
  const score = answers.filter((given, i) => given === questions[i]?.answer).length
  const progress = phase === 'done' ? 100 : total ? ((index + (phase === 'feedback' ? 1 : 0)) / total) * 100 : 0

  const topicResults = useMemo(() => {
    const topics = new Map<string, { correct: number; total: number }>()
    questions.forEach((item, i) => {
      const current = topics.get(item.topic) ?? { correct: 0, total: 0 }
      current.total += 1
      if (answers[i] === item.answer) current.correct += 1
      topics.set(item.topic, current)
    })
    return [...topics.entries()]
  }, [answers, questions])

  function start(difficulty?: QuizQuestion['difficulty']) {
    const pool = difficulty
      ? quizQuestions.filter((item) => item.difficulty === difficulty)
      : quizQuestions
    setQuestions(prepareQuizQuestions(pool))
    setIndex(0)
    setChoice(null)
    setAnswers([])
    setStreak(0)
    setBestStreak(0)
    setPhase('answering')
  }

  function resume() {
    if (!savedQuiz) return
    const restored = restorePreparedQuestions(
      savedQuiz.questionIds,
      savedQuiz.optionOrders,
      quizQuestions,
    )
    if (!restored) {
      setSavedQuiz(null)
      try {
        window.localStorage.removeItem(QUIZ_STORAGE_KEY)
      } catch {
        // O quiz ainda pode iniciar uma rodada nova sem armazenamento.
      }
      return
    }
    setQuestions(restored)
    setIndex(Math.min(savedQuiz.index, restored.length - 1))
    setChoice(savedQuiz.choice)
    setAnswers(savedQuiz.answers)
    setStreak(savedQuiz.streak)
    setBestStreak(savedQuiz.bestStreak)
    setPhase(savedQuiz.phase)
  }

  function confirm() {
    if (choice === null || !question) return
    setAnswers((previous) => [...previous, choice])
    const nextStreak = choice === question.answer ? streak + 1 : 0
    setStreak(nextStreak)
    setBestStreak((previous) => Math.max(previous, nextStreak))
    setPhase('feedback')
  }

  function advance() {
    if (index + 1 >= total) return setPhase('done')
    setIndex((current) => current + 1)
    setChoice(null)
    setPhase('answering')
  }

  return (
    <section
      id="quiz"
      data-quiz-section
      data-quiz-phase={phase}
      aria-labelledby="quiz-title"
      className="scroll-mt-20 border-t border-border/60 bg-card py-20 sm:py-24"
    >
      <div
        data-quiz-container
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          questionInProgress ? 'max-w-6xl' : 'max-w-3xl',
        )}
      >
        <div data-quiz-heading className="mx-auto max-w-3xl text-center">
          <h2 id="quiz-title" className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl">Teste o que você aprendeu</h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{quizIntro}</p>
        </div>

        <div
          data-quiz-card
          className={cn(
            'mt-12 rounded-2xl border border-border bg-background elev-1',
            questionInProgress ? 'overflow-hidden' : 'p-6 sm:p-8',
          )}
        >
          {phase === 'intro' ? (
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-tech/12 text-tech"><Sparkles className="h-7 w-7" /></span>
              <h3 className="mt-4 font-serif text-2xl font-semibold">Escolha seu desafio</h3>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">As perguntas e as alternativas mudam de ordem a cada rodada. Você recebe explicação imediata e um diagnóstico dos temas no final.</p>
              {savedQuiz && savedQuiz.phase !== 'done' ? (
                <button type="button" onClick={resume} className="mt-6 w-full rounded-xl border border-accent/40 bg-accent/10 p-4 text-left transition hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-ring">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">Progresso salvo neste aparelho</span>
                  <span className="mt-1 block font-semibold">Continuar da questão {savedQuiz.index + 1}</span>
                </button>
              ) : null}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => start('fundamentos')} className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-left transition hover:-translate-y-0.5 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fundamentos</span>
                  <span className="mt-1 block font-serif text-xl font-semibold">Conceitos essenciais</span>
                  <span className="mt-1 block text-sm text-muted-foreground">História, química básica e sustentabilidade.</span>
                </button>
                <button type="button" onClick={() => start('aplicacao')} className="rounded-xl border border-accent/40 bg-accent/8 p-5 text-left transition hover:-translate-y-0.5 hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-ring">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">Aplicação</span>
                  <span className="mt-1 block font-serif text-xl font-semibold">Relacionar conhecimentos</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Interprete situações de manejo e tecnologia.</span>
                </button>
                <button type="button" onClick={() => start('desafio')} className="rounded-xl border border-earth/30 bg-earth/5 p-5 text-left transition hover:-translate-y-0.5 hover:bg-earth/10 focus-visible:outline-2 focus-visible:outline-ring">
                  <span className="text-xs font-semibold uppercase tracking-wider text-earth">Desafio</span>
                  <span className="mt-1 block font-serif text-xl font-semibold">Decisão e análise</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Exige interpretar limites e combinar informações.</span>
                </button>
                <button type="button" onClick={() => start()} className="rounded-xl border border-tech/30 bg-tech/5 p-5 text-left transition hover:-translate-y-0.5 hover:bg-tech/10 focus-visible:outline-2 focus-visible:outline-ring">
                  <span className="text-xs font-semibold uppercase tracking-wider text-tech">Completo</span>
                  <span className="mt-1 block font-serif text-xl font-semibold">{quizQuestions.length} questões</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Todos os níveis e temas em uma rodada.</span>
                </button>
              </div>
            </div>
          ) : phase === 'done' ? (
            <div>
              <div className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Trophy className="h-7 w-7" /></span>
                <h3 className="mt-4 font-serif text-2xl font-semibold">Você acertou {score} de {total}</h3>
                <p className="mt-2 text-muted-foreground">Maior sequência: {bestStreak} {bestStreak === 1 ? 'acerto' : 'acertos'} seguidos</p>
              </div>
              <div className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider">Desempenho por tema</h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {topicResults.map(([topic, result]) => (
                    <li key={topic} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm">
                      <span>{topic}</span><strong className={result.correct === result.total ? 'text-primary' : 'text-earth'}>{result.correct}/{result.total}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button type="button" onClick={() => start()}><RotateCcw className="h-4 w-4" />Nova rodada completa</Button>
                <Button type="button" variant="outline" onClick={() => setPhase('intro')}>Escolher outro modo</Button>
              </div>
            </div>
          ) : question ? (
            <div
              data-quiz-question
              className="grid lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]"
            >
              <figure
                data-quiz-media
                className="relative aspect-[16/7] overflow-hidden bg-muted sm:aspect-[16/6] lg:aspect-auto lg:min-h-[32rem]"
              >
                <Image
                  key={question.id}
                  data-quiz-image
                  src={question.media.src}
                  alt={question.media.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className={cn(
                    'object-cover transition-[transform,filter] duration-700 ease-out motion-reduce:transition-none',
                    phase === 'feedback' && 'scale-[1.035] brightness-[0.72]',
                  )}
                  style={{ objectPosition: question.media.objectPosition ?? 'center' }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-background/20 lg:block"
                />
                <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-1.5 p-4 text-white sm:p-5">
                  <span className="rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                    {question.media.label}
                  </span>
                  <span
                    data-quiz-credit
                    className="flex max-w-full flex-wrap items-center gap-x-1 text-[0.6875rem] leading-snug text-white/90"
                  >
                    <a
                      href={question.media.credit.sourcePageUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Fonte da imagem: ${question.media.credit.author}, ${question.media.credit.sourceName}. Abre em nova aba.`}
                      className="inline-flex items-start gap-1 underline decoration-white/45 underline-offset-2 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span>
                        {question.media.credit.author} · {question.media.credit.sourceName}
                      </span>
                      <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={quizLicenseUrls[question.media.credit.license]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${question.media.credit.license}. Abre a licença em nova aba.`}
                      className="underline decoration-white/45 underline-offset-2 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {question.media.credit.license}
                    </a>
                  </span>
                </figcaption>
              </figure>

              <div data-quiz-content className="flex min-w-0 flex-col p-5 sm:p-6 lg:p-8">
                <div
                  data-quiz-meta
                  className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                >
                  <span data-numeric className="mr-auto">
                    Questão {index + 1} de {total}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-accent-foreground">
                    <Flame className="h-4 w-4" aria-hidden="true" />
                    Sequência {streak}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                    {question.topic} ·{' '}
                    {question.difficulty === 'fundamentos'
                      ? 'Fundamentos'
                      : question.difficulty === 'aplicacao'
                        ? 'Aplicação'
                        : 'Desafio'}
                  </span>
                </div>
                <div
                  data-quiz-progress
                  role="progressbar"
                  aria-label={`Progresso do quiz: ${Math.round(progress)}%`}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500 motion-reduce:transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <h3
                  id={`quiz-question-${question.id}`}
                  data-quiz-question-heading
                  className="mt-6 text-pretty font-serif text-xl leading-relaxed"
                >
                  {question.statement}
                </h3>
                <fieldset
                  data-quiz-options
                  aria-labelledby={`quiz-question-${question.id}`}
                  className="mt-6"
                  disabled={phase === 'feedback'}
                >
                  <legend className="sr-only">Escolha uma alternativa</legend>
                  <div className="space-y-2">
                    {question.options.map((option, i) => {
                      const selected = choice === i
                      const correct = phase === 'feedback' && i === question.answer
                      const wrong = phase === 'feedback' && selected && !correct
                      const optionState = correct
                        ? 'correct'
                        : wrong
                          ? 'wrong'
                          : selected
                            ? 'selected'
                            : 'idle'
                      const reviewLabel = correct
                        ? selected
                          ? 'Sua resposta · correta'
                          : 'Resposta correta'
                        : wrong
                          ? 'Sua resposta'
                          : null

                      return (
                        <label
                          key={question.optionOrder[i]}
                          data-quiz-option
                          data-state={optionState}
                          className={cn(
                            'relative flex min-h-11 items-start gap-3 rounded-xl border p-3.5 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring',
                            phase === 'answering' ? 'cursor-pointer' : 'cursor-default',
                            correct && 'border-primary/50 bg-primary/8',
                            wrong && 'border-earth/50 bg-earth/8',
                            phase === 'answering' && selected && 'border-primary bg-primary/5',
                            phase === 'answering' && !selected && 'hover:bg-muted',
                          )}
                        >
                          <input
                            className="absolute left-3.5 top-3.5 z-10 h-7 w-7 cursor-pointer opacity-0 disabled:cursor-default"
                            type="radio"
                            name={question.id}
                            checked={selected}
                            aria-label={`Alternativa ${LETTERS[i]}: ${option}`}
                            onChange={() => setChoice(i)}
                          />
                          <span
                            aria-hidden="true"
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                              correct
                                ? 'bg-primary text-primary-foreground'
                                : wrong
                                  ? 'bg-earth text-earth-foreground'
                                  : selected
                                    ? 'bg-primary/15 text-primary'
                                    : 'bg-muted text-muted-foreground',
                            )}
                          >
                            {correct ? (
                              <Check className="h-4 w-4" />
                            ) : wrong ? (
                              <X className="h-4 w-4" />
                            ) : (
                              LETTERS[i]
                            )}
                          </span>
                          <span className="min-w-0 text-sm leading-relaxed">
                            {reviewLabel ? (
                              <span className="block text-[0.65rem] font-bold uppercase tracking-wider opacity-75">
                                {reviewLabel}
                              </span>
                            ) : null}
                            <span className={cn('block', reviewLabel && 'mt-0.5 font-medium')}>
                              {option}
                            </span>
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
                {phase === 'feedback' ? (
                  <div
                    data-quiz-feedback
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'mt-6 rounded-xl border p-5',
                      isCorrect
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-earth/30 bg-earth/5',
                    )}
                  >
                    <p
                      className={cn(
                        'font-semibold',
                        isCorrect ? 'text-primary' : 'text-earth',
                      )}
                    >
                      {isCorrect
                        ? 'Boa! Resposta correta.'
                        : `Quase — a resposta correta é ${LETTERS[question.answer]}.`}
                    </p>
                    <p data-quiz-explanation className="mt-3 text-sm leading-relaxed">
                      {question.explanation}
                    </p>
                    <div
                      data-quiz-fact
                      className="mt-4 rounded-xl border border-accent/25 bg-accent/10 p-4"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                        <Lightbulb className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Você sabia?
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {question.fact}
                      </p>
                    </div>
                  </div>
                ) : null}
                <div data-quiz-action className="mt-6">
                  {phase === 'answering' ? (
                    <Button
                      type="button"
                      className="w-full sm:w-auto"
                      onClick={confirm}
                      disabled={choice === null}
                    >
                      Confirmar resposta
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="w-full sm:w-auto"
                      onClick={advance}
                    >
                      {index + 1 === total ? 'Ver meu diagnóstico' : 'Próxima questão'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
