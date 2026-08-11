import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import {
  AGROBOT_PDF_URL,
  agrobotSlides,
} from '../lib/agrobot-slides.ts'
import { siteSections } from '../lib/site-data.ts'

function publicPath(url) {
  return path.join(process.cwd(), 'public', ...url.split('/').filter(Boolean))
}

test('a apresentação do AgroBot possui sete slides locais e únicos', () => {
  assert.equal(agrobotSlides.length, 7)
  assert.equal(new Set(agrobotSlides.map((slide) => slide.src)).size, 7)

  for (const [index, slide] of agrobotSlides.entries()) {
    assert.equal(slide.src, `/slides/agrobot/slide-${index + 1}.jpg`)
    assert.ok(slide.title.trim(), `slide ${index + 1} deve possuir título acessível`)
    assert.ok(
      statSync(publicPath(slide.src)).size > 40_000,
      `slide ${index + 1} deve possuir um arquivo de imagem válido`,
    )
  }
})

test('o PDF original do AgroBot está disponível localmente', () => {
  const pdfPath = publicPath(AGROBOT_PDF_URL)
  assert.ok(statSync(pdfPath).size > 100_000)
  assert.equal(readFileSync(pdfPath).subarray(0, 5).toString('ascii'), '%PDF-')
})

test('os slides encerram a página e a sequência do modo apresentação', () => {
  assert.equal(siteSections.at(-1)?.id, 'slides-agrobot')
  assert.equal(siteSections.at(-1)?.inNav, false)
})
