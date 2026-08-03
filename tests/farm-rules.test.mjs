import assert from 'node:assert/strict'
import test from 'node:test'
import {
  assessPlantingConditions,
  evaluate,
} from '../lib/farm-rules.ts'

const stableState = {
  soilMoisture: 48,
  ph: 6.2,
  temperature: 27,
  rainChance: 35,
  pestRisk: 'baixo',
  cropStage: 'vegetativo',
}

test('cenário dentro das faixas não dispara alerta', () => {
  const results = evaluate(stableState)
  assert.equal(results.length, 1)
  assert.equal(results[0].id, 'estavel')
  assert.equal(assessPlantingConditions(results).condition, 'favoravel')
})

test('solo seco sem chuva sugere avaliar irrigação', () => {
  const results = evaluate({
    ...stableState,
    soilMoisture: 18,
    rainChance: 20,
  })
  assert.ok(results.some((item) => item.id === 'irrigar'))
  assert.equal(assessPlantingConditions(results).condition, 'atencao')
})

test('solo seco com chuva provável recomenda aguardar atualização', () => {
  const results = evaluate({
    ...stableState,
    soilMoisture: 18,
    rainChance: 70,
  })
  assert.ok(results.some((item) => item.id === 'aguardar'))
})

test('pH baixo é classificado como fator limitante', () => {
  const results = evaluate({ ...stableState, ph: 4.4 })
  assert.ok(results.some((item) => item.id === 'ph-baixo'))
  assert.equal(assessPlantingConditions(results).condition, 'limitante')
})

test('risco alto de pragas tem atenção alta', () => {
  const results = evaluate({ ...stableState, pestRisk: 'alto' })
  const pestAlert = results.find((item) => item.id === 'pragas')
  assert.equal(pestAlert?.attention, 'alta')
})

test('calor aciona regra apenas em estágio sensível', () => {
  const sensitive = evaluate({ ...stableState, temperature: 38 })
  const mature = evaluate({
    ...stableState,
    temperature: 38,
    cropStage: 'maturacao',
  })
  assert.ok(sensitive.some((item) => item.id === 'calor'))
  assert.ok(!mature.some((item) => item.id === 'calor'))
})
