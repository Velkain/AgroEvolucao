import type { QuizQuestion } from './quiz-data'

export type RandomSource = () => number

/**
 * `optionOrder[displayedIndex]` informa o índice que a alternativa ocupava no
 * banco. Guardar essa permutação permite retomar exatamente a mesma rodada.
 */
export type PreparedQuizQuestion = QuizQuestion & { optionOrder: number[] }

/**
 * Embaralha uma lista sem alterar o array recebido.
 *
 * A fonte de aleatoriedade pode ser injetada para permitir testes deterministas.
 */
export function shuffleItems<T>(
  items: readonly T[],
  random: RandomSource = Math.random,
): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const sample = random()
    if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
      throw new RangeError('A fonte aleatória deve retornar um número entre 0 e 1.')
    }
    const target = Math.floor(sample * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[target]
    shuffled[target] = current
  }

  return shuffled
}

function prepareQuestion(
  question: QuizQuestion,
  random: RandomSource = Math.random,
): PreparedQuizQuestion {
  const optionOrder = shuffleItems(
    question.options.map((_, originalIndex) => originalIndex),
    random,
  )
  const answer = optionOrder.indexOf(question.answer)

  if (answer < 0) {
    throw new RangeError(`Gabarito inválido na questão "${question.id}".`)
  }

  return {
    ...question,
    options: optionOrder.map((originalIndex) => question.options[originalIndex]),
    answer,
    optionOrder,
  }
}

/** Cria uma rodada com perguntas e alternativas em novas ordens. */
export function prepareQuizQuestions(
  pool: readonly QuizQuestion[],
  random: RandomSource = Math.random,
): PreparedQuizQuestion[] {
  return shuffleItems(pool, random).map((question) =>
    prepareQuestion(question, random),
  )
}

function isPermutation(order: readonly number[], length: number): boolean {
  if (order.length !== length) return false

  const uniqueIndexes = new Set(order)
  return (
    uniqueIndexes.size === length &&
    order.every(
      (originalIndex) =>
        Number.isInteger(originalIndex) &&
        originalIndex >= 0 &&
        originalIndex < length,
    )
  )
}

/**
 * Reconstrói uma rodada salva apenas quando todos os IDs e permutações são
 * íntegros. Um estado parcial nunca é aceito silenciosamente.
 */
export function restorePreparedQuestions(
  questionIds: readonly string[],
  optionOrders: Readonly<Record<string, readonly number[]>>,
  bank: readonly QuizQuestion[],
): PreparedQuizQuestion[] | null {
  if (
    !Array.isArray(questionIds) ||
    questionIds.length === 0 ||
    new Set(questionIds).size !== questionIds.length ||
    !optionOrders ||
    typeof optionOrders !== 'object' ||
    Array.isArray(optionOrders)
  ) {
    return null
  }

  const questionsById = new Map(bank.map((question) => [question.id, question]))
  const restored: PreparedQuizQuestion[] = []

  for (const id of questionIds) {
    const question = questionsById.get(id)
    const optionOrder = optionOrders[id]

    if (
      !question ||
      !Array.isArray(optionOrder) ||
      !isPermutation(optionOrder, question.options.length) ||
      !Number.isInteger(question.answer) ||
      question.answer < 0 ||
      question.answer >= question.options.length
    ) {
      return null
    }

    const answer = optionOrder.indexOf(question.answer)
    restored.push({
      ...question,
      options: optionOrder.map((originalIndex) => question.options[originalIndex]),
      answer,
      optionOrder: [...optionOrder],
    })
  }

  return restored
}
