'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  Lightbulb,
  RotateCcw,
  Trophy,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { quizQuestions, quizIntro } from '@/lib/quiz-data'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

type Phase = 'answering' | 'feedback' | 'done'

export function QuizSection() {
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('answering')
  const [answers, setAnswers] = useState<number[]>([])

  const question = quizQuestions[index]
  const total = quizQuestions.length
  const isCorrect = choice === question.answer

  const wrong = useMemo(
    () =>
      quizQuestions
        .map((item, i) => ({ item, given: answers[i] }))
        .filter(({ item, given }) => given !== undefined && given !== item.answer),
    [answers],
  )
  const score = answers.filter(
    (given, i) => given === quizQuestions[i].answer,
  ).length

  function confirm() {
    if (choice === null) return
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = choice
      return next
    })
    setPhase('feedback')
  }

  function advance() {
    if (index + 1 >= total) {
      setPhase('done')
      return
    }
    setIndex(index + 1)
    setChoice(null)
    setPhase('answering')
  }

  function restart() {
    setIndex(0)
    setChoice(null)
    setAnswers([])
    setPhase('answering')
  }

  const progress = phase === 'done' ? 100 : (index / total) * 100

  return (
    <section
      id="quiz"
      aria-labelledby="quiz-title"
      className="scroll-mt-20 border-t border-border/60 bg-card py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="quiz-title"
            className="text-balance font-serif text-3xl font-semibold text-primary sm:text-4xl"
          >
            Teste o que você aprendeu
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {quizIntro}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-background p-6 elev-1 sm:p-8">
          {phase === 'done' ? (
            <div>
              <div className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Trophy className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                  Você acertou {score} de {total}
                </h3>
                <p
                  className="mt-2 text-muted-foreground"
                  aria-live="polite"
                  data-numeric
                >
                  {score} {score === 1 ? 'acerto' : 'acertos'} ·{' '}
                  {total - score} {total - score === 1 ? 'erro' : 'erros'}
                </p>
              </div>

              {wrong.length > 0 ? (
                <div className="mt-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Questões para revisar
                  </h4>
                  <ul className="mt-4 space-y-4">
                    {wrong.map(({ item, given }) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-earth/30 bg-earth/5 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-earth">
                          {item.topic}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                          {item.statement}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Sua resposta:{' '}
                          <span className="font-medium">
                            {LETTERS[given as number]}
                          </span>{' '}
                          · Correta:{' '}
                          <span className="font-medium text-primary">
                            {LETTERS[item.answer]}
                          </span>
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.explanation}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 text-center leading-relaxed text-muted-foreground">
                  Você acertou todas. Vale conferir as explicações mesmo assim —
                  elas trazem detalhes que a alternativa correta não mostra.
                </p>
              )}

              <Button
                type="button"
                onClick={restart}
                className="mt-8 w-full sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Refazer o quiz
              </Button>
            </div>
          ) : (
            <div>
              {/* Progresso */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Questão <span data-numeric>{index + 1}</span> de{' '}
                  <span data-numeric>{total}</span>
                </p>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {question.topic}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={index + 1}
                aria-valuemin={1}
                aria-valuemax={total}
                aria-label={`Questão ${index + 1} de ${total}`}
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h3 className="mt-6 text-pretty font-serif text-xl leading-relaxed text-foreground">
                {question.statement}
              </h3>

              <fieldset className="mt-6" disabled={phase === 'feedback'}>
                <legend className="sr-only">Alternativas</legend>
                <div className="space-y-2">
                  {question.options.map((option, i) => {
                    const selected = choice === i
                    const revealCorrect = phase === 'feedback' && i === question.answer
                    const revealWrong =
                      phase === 'feedback' && selected && i !== question.answer

                    return (
                      <label
                        key={option}
                        className={cn(
                          'flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors',
                          revealCorrect && 'border-primary/50 bg-primary/8',
                          revealWrong && 'border-earth/50 bg-earth/8',
                          !revealCorrect &&
                            !revealWrong &&
                            selected &&
                            'border-primary/40 bg-primary/5',
                          !revealCorrect &&
                            !revealWrong &&
                            !selected &&
                            'border-border hover:bg-muted',
                          phase === 'feedback' && 'cursor-default',
                        )}
                      >
                        <input
                          type="radio"
                          name={`quiz-${question.id}`}
                          value={i}
                          checked={selected}
                          onChange={() => setChoice(i)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                            revealCorrect
                              ? 'bg-primary text-primary-foreground'
                              : revealWrong
                                ? 'bg-earth text-earth-foreground'
                                : selected
                                  ? 'bg-primary/15 text-primary'
                                  : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {revealCorrect ? (
                            <Check className="h-4 w-4" />
                          ) : revealWrong ? (
                            <X className="h-4 w-4" />
                          ) : (
                            LETTERS[i]
                          )}
                        </span>
                        <span className="text-sm leading-relaxed text-foreground">
                          {option}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {phase === 'feedback' ? (
                <div
                  aria-live="polite"
                  className={cn(
                    'mt-6 rounded-xl border p-4 sm:p-5',
                    isCorrect
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-earth/30 bg-earth/5',
                  )}
                >
                  <p
                    className={cn(
                      'flex items-center gap-2 font-semibold',
                      isCorrect ? 'text-primary' : 'text-earth',
                    )}
                  >
                    {isCorrect ? (
                      <>
                        <Check className="h-5 w-5" aria-hidden="true" />
                        Resposta correta
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5" aria-hidden="true" />
                        Resposta incorreta — a correta é a{' '}
                        {LETTERS[question.answer]}
                      </>
                    )}
                  </p>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                    <Lightbulb
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground"
                      aria-hidden="true"
                    />
                    {question.explanation}
                  </p>
                </div>
              ) : null}

              <div className="mt-6">
                {phase === 'answering' ? (
                  <Button
                    type="button"
                    onClick={confirm}
                    disabled={choice === null}
                    className="w-full sm:w-auto"
                  >
                    Confirmar resposta
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={advance}
                    className="w-full sm:w-auto"
                  >
                    {index + 1 >= total ? 'Ver resultado' : 'Próxima questão'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
