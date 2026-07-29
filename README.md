# AgroEvolução

Site de apresentação sobre a evolução da agricultura, da Agricultura 1.0 à 5.0,
com foco na participação da química. Trabalho escolar de Química.

O site é usado de duas formas, e as duas contam: **projetado na sala** durante a
apresentação e **lido no celular** pelo link depois. Toda decisão de tipografia e
contraste leva as duas em conta.

## Rodando o projeto

Requer Node 20+ e [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Outros comandos:

```bash
pnpm build    # build de produção, com checagem de tipos
pnpm lint     # eslint
```

## Onde editar o conteúdo

**Você quase nunca precisa mexer em componente.** Todo o texto vive em
`lib/*-data.ts`, separado da apresentação:

| Arquivo | O que contém |
|---|---|
| `lib/site-data.ts` | Nome do projeto, **ficha da escola**, menu e ordem das seções |
| `lib/timeline-data.ts` | As cinco etapas: características, tecnologias, química, benefícios, desafios |
| `lib/chemistry-data.ts` | Os 10 temas de "A química no campo" |
| `lib/technology-data.ts` | As 16 tecnologias do atlas |
| `lib/sustainability-data.ts` | Os quatro pilares |
| `lib/challenges-data.ts` | Os desafios, agrupados por causa |
| `lib/quiz-data.ts` | As 12 questões do quiz |
| `lib/references-data.ts` | **Bibliografia** |
| `lib/summary-data.ts` | Marcos e conclusões do resumo |
| `lib/farm-rules.ts` | Regras e limiares do painel da fazenda inteligente |

Adicionar uma etapa na linha do tempo, por exemplo, é acrescentar um objeto em
`timelineStages` e uma chave em `components/timeline/stage-theme.ts`. Os
componentes se viram sozinhos.

## Regras que o conteúdo precisa respeitar

Não são preferências de estilo — são compromissos do projeto, registrados em
`PRODUCT.md`:

1. **Nenhum número inventado.** Nada de estatística, porcentagem ou data sem
   fonte. Sem fonte, descreva qualitativamente.
2. **Nenhuma fonte inventada.** Não crie artigo, autor, link ou data de
   publicação. Espaço em branco declarado é melhor que referência falsa.
3. **Sem doses nem recomendações de aplicação** de fertilizante ou defensivo. O
   material é didático e traz o aviso de que não substitui profissional
   habilitado.
4. A classificação 1.0–5.0 é **organização didática** e varia conforme a fonte —
   o site diz isso explicitamente.

## Dados reais

A seção "Fazenda inteligente" consome clima e umidade do solo de Sorriso (MT) da
API pública [Open-Meteo](https://open-meteo.com/) (licença CC BY 4.0, sem chave
de API), no servidor, com revalidação de 1 hora.

Se a rede falhar — Wi-Fi de escola no meio da apresentação é o caso real que isso
protege — o painel cai para `lib/weather-snapshot.json`, uma medição real gravada
no repositório, e troca o selo para "medição gravada" com a data honesta. **Nunca
mostra erro e nunca inventa número.**

pH, risco de pragas e estágio da cultura são hipóteses do simulador, marcadas
como tal na interface: nenhuma API gratuita mede isso num talhão específico.

## Design

`DESIGN.md` documenta o sistema visual e vale a leitura antes de mexer no visual.
As armadilhas que já cobraram caro:

- **`--x-ink` × `--x-foreground`**: `-ink` é texto sobre a superfície da página;
  `-foreground` é texto sobre a cor cheia. Trocar produz texto invisível.
- **`asChild` não existe** neste projeto (é base-ui, não Radix). Botão que navega
  usa `render={<a href="..." />}` mais `nativeButton={false}`.
- Seção nova com `id` precisa de `scroll-mt-20`, senão o título some atrás do
  cabeçalho fixo.

## Estrutura

```
app/            layout, página única e imagem de preview do link
components/     seções da página
  ui/           primitivos shadcn/base-ui
  timeline/     linha do tempo e detalhe das etapas
  smart-farm/   painel de clima e gráficos
  activities/   atividades interativas
  presentation/ modo apresentação
lib/            dados e utilitários
public/images/  ilustrações (WebP)
```

## Ainda falta preencher

- [ ] **Ficha do projeto** — escola, turma, integrantes e professor, em
      `lib/site-data.ts` (`projectInfo`). Hoje aparece texto reservado no rodapé.
- [ ] **Bibliografia** — material de aula e páginas efetivamente consultadas, em
      `lib/references-data.ts` (`toFill`). As instituições já listadas tiveram os
      endereços verificados; falta o que o grupo usou.
- [ ] **Ilustrações da 4.0 e 5.0** — hoje são cenas vetoriais desenhadas em
      `components/timeline/stage-illustration.tsx`. Funcionam, mas se aparecerem
      ilustrações no estilo das outras três, é só preencher `image` e `imageAlt`
      em `timeline-data.ts`.

---

Projeto com finalidade estritamente educacional.
