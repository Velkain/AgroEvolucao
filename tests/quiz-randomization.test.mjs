import assert from 'node:assert/strict'
import test from 'node:test'
import { quizQuestions } from '../lib/quiz-data.ts'
import {
  prepareQuizQuestions,
  restorePreparedQuestions,
} from '../lib/quiz-randomization.ts'

function seededRandom(seed) {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

test('embaralhar alternativas preserva o texto da resposta correta', () => {
  for (let seed = 1; seed <= 100; seed += 1) {
    const randomized = prepareQuizQuestions(quizQuestions, seededRandom(seed))

    for (const prepared of randomized) {
      const question = quizQuestions.find((item) => item.id === prepared.id)
      assert.ok(question)
      const correctText = question.options[question.answer]

      assert.equal(prepared.options[prepared.answer], correctText)
      assert.equal(prepared.options.length, question.options.length)
    }
  }
})

test('o gabarito é preservado pelo índice de origem mesmo com textos repetidos', () => {
  const repeatedOptions = {
    ...quizQuestions[0],
    options: ['Repetida', 'Repetida', 'C', 'D', 'E'],
    answer: 1,
  }

  const [prepared] = prepareQuizQuestions([repeatedOptions], seededRandom(9))

  assert.equal(prepared.optionOrder[prepared.answer], repeatedOptions.answer)
})

test('embaralhamento não altera as perguntas originais', () => {
  const snapshot = structuredClone(quizQuestions)

  prepareQuizQuestions(quizQuestions, seededRandom(42))

  assert.deepEqual(quizQuestions, snapshot)
})

test('a resposta correta pode ocupar todas as letras de A a E', () => {
  const positions = new Set()
  const question = quizQuestions[0]

  for (let seed = 1; seed <= 100; seed += 1) {
    positions.add(prepareQuizQuestions([question], seededRandom(seed))[0].answer)
  }

  assert.deepEqual([...positions].sort(), [0, 1, 2, 3, 4])
})

test('uma rodada salva é restaurada com a mesma ordem e o mesmo gabarito', () => {
  const prepared = prepareQuizQuestions(quizQuestions, seededRandom(2026))
  const questionIds = prepared.map((question) => question.id)
  const optionOrders = Object.fromEntries(
    prepared.map((question) => [question.id, question.optionOrder]),
  )

  const restored = restorePreparedQuestions(questionIds, optionOrders, quizQuestions)

  assert.ok(restored)
  assert.deepEqual(restored, prepared)
})

test('restauração rejeita permutações repetidas, incompletas ou fora da faixa', () => {
  const [question] = quizQuestions
  const ids = [question.id]

  assert.equal(
    restorePreparedQuestions(ids, { [question.id]: [0, 1, 2, 3, 3] }, quizQuestions),
    null,
  )
  assert.equal(
    restorePreparedQuestions(ids, { [question.id]: [0, 1, 2, 3] }, quizQuestions),
    null,
  )
  assert.equal(
    restorePreparedQuestions(ids, { [question.id]: [0, 1, 2, 3, 5] }, quizQuestions),
    null,
  )
})

test('restauração rejeita sessão parcial, questão desconhecida ou ID repetido', () => {
  const [first, second] = quizQuestions
  const validOrder = [0, 1, 2, 3, 4]

  assert.equal(
    restorePreparedQuestions(
      [first.id, second.id],
      { [first.id]: validOrder },
      quizQuestions,
    ),
    null,
  )
  assert.equal(
    restorePreparedQuestions(
      ['questao-inexistente'],
      { 'questao-inexistente': validOrder },
      quizQuestions,
    ),
    null,
  )
  assert.equal(
    restorePreparedQuestions(
      [first.id, first.id],
      { [first.id]: validOrder },
      quizQuestions,
    ),
    null,
  )
})

test('restauração trata formatos persistidos malformados como sessão inválida', () => {
  const [question] = quizQuestions

  assert.equal(restorePreparedQuestions(null, {}, quizQuestions), null)
  assert.equal(restorePreparedQuestions([question.id], null, quizQuestions), null)
  assert.equal(
    restorePreparedQuestions([question.id], [], quizQuestions),
    null,
  )
})

test('cada questão do banco tem cinco alternativas e gabarito válido', () => {
  const ids = new Set()

  for (const question of quizQuestions) {
    assert.equal(question.options.length, 5, `${question.id} deve ter cinco alternativas`)
    const normalizedOptions = question.options.map((option) =>
      option.trim().toLocaleLowerCase('pt-BR'),
    )
    assert.equal(
      new Set(normalizedOptions).size,
      question.options.length,
      `${question.id} não deve repetir alternativas`,
    )
    assert.ok(
      Number.isInteger(question.answer) &&
        question.answer >= 0 &&
        question.answer < question.options.length,
      `${question.id} deve apontar para uma alternativa existente`,
    )
    assert.ok(!ids.has(question.id), `${question.id} está duplicado`)
    ids.add(question.id)
  }
})

test('o banco ampliado mantém vinte questões bem distribuídas', () => {
  assert.equal(quizQuestions.length, 20)

  for (const difficulty of ['fundamentos', 'aplicacao', 'desafio']) {
    const total = quizQuestions.filter(
      (question) => question.difficulty === difficulty,
    ).length
    assert.ok(total >= 6, `${difficulty} deve oferecer pelo menos seis questões`)
  }
})
