---
name: AgroEvolução
description: Do arado à inteligência artificial — a temperatura da cor conta a história da agricultura.
colors:
  background: "oklch(0.99 0.006 95)"
  foreground: "oklch(0.24 0.02 150)"
  card: "oklch(1 0 0)"
  primary: "oklch(0.47 0.055 152)"
  primary-foreground: "oklch(0.98 0.01 95)"
  secondary: "oklch(0.94 0.022 145)"
  secondary-foreground: "oklch(0.32 0.04 150)"
  muted: "oklch(0.96 0.01 120)"
  muted-foreground: "oklch(0.5 0.02 140)"
  accent: "oklch(0.72 0.13 72)"
  accent-foreground: "oklch(0.28 0.04 65)"
  border: "oklch(0.9 0.012 120)"
  earth: "oklch(0.52 0.075 55)"
  earth-foreground: "oklch(0.98 0.01 80)"
  wheat: "oklch(0.79 0.125 82)"
  wheat-foreground: "oklch(0.36 0.05 65)"
  leaf: "oklch(0.62 0.13 146)"
  tech: "oklch(0.56 0.09 218)"
  tech-foreground: "oklch(0.98 0.01 220)"
  destructive: "oklch(0.577 0.245 27.325)"
  chart-temp: "oklch(0.55 0.13 55)"
  chart-rain: "oklch(0.52 0.12 230)"
  dark-background: "oklch(0.18 0.012 150)"
  dark-foreground: "oklch(0.94 0.008 95)"
  dark-card: "oklch(0.22 0.014 150)"
  dark-primary: "oklch(0.74 0.09 152)"
  dark-secondary: "oklch(0.28 0.025 148)"
  dark-muted-foreground: "oklch(0.72 0.018 140)"
  dark-accent: "oklch(0.79 0.135 75)"
  dark-border: "oklch(0.33 0.016 145)"
  dark-earth: "oklch(0.7 0.085 55)"
  dark-wheat: "oklch(0.83 0.12 82)"
  dark-leaf: "oklch(0.74 0.14 146)"
  dark-tech: "oklch(0.72 0.1 218)"
  dark-chart-temp: "oklch(0.64 0.14 55)"
  dark-chart-rain: "oklch(0.64 0.13 230)"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.11
    letterSpacing: "normal"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "0.05em"
  nav:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  2xl: "1.125rem"
  3xl: "1.375rem"
  4xl: "1.625rem"
spacing:
  card: "1rem"
  section-y: "5rem"
  section-y-lg: "6rem"
  gutter: "1rem"
  gutter-lg: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
    typography: "{typography.label}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2.25rem"
  badge-chemistry:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.4xl}"
    padding: "0.125rem 0.5rem"
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.4xl}"
    padding: "0.125rem 0.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "1rem 0"
  nav-link:
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.625rem"
  stage-marker-earth:
    backgroundColor: "{colors.earth}"
    textColor: "{colors.earth-foreground}"
    rounded: "{rounded.4xl}"
    size: "3rem"
  stage-marker-wheat:
    backgroundColor: "{colors.wheat}"
    textColor: "{colors.wheat-foreground}"
    rounded: "{rounded.4xl}"
    size: "3rem"
  stage-marker-green:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.4xl}"
    size: "3rem"
---

# Design System: AgroEvolução

> Extraído da implementação existente. Duas decisões foram **evoluções escolhidas pelo usuário**, não extrações do estado atual, e estão marcadas como `[decidido]`: a escala de elevação em três níveis (o sistema hoje é plano) e o caráter científico da tipografia (hoje é mais caloroso que preciso).

## Overview

**Creative North Star: "O Eixo Terra→Silício"**

O sistema tem uma única ideia estruturante, e ela é espacial: a agricultura evoluiu da terra para o silício, e a página inteira é organizada nesse eixo. O hero divide literalmente o fundo em dois — terroso e quente à esquerda, tecnológico e frio à direita — e coloca uma seta âmbar no meio. A comparação Passado × Presente repete o mesmo par de temperaturas. A linha do tempo caminha do marcador terroso (Agricultura 1.0) ao verde (Revolução Verde). A temperatura da cor conta a história antes de qualquer texto ser lido.

O verde floresta é a constante que atravessa o eixo: é a cor da marca, dos títulos e do rodapé, e não pertence nem ao passado nem ao futuro. Ele representa a agricultura em si, que permanece enquanto a técnica muda.

O caráter é científico e preciso `[decidido]`: rigor visível, estrutura declarada, rótulos em caixa alta com entreletra aberta, contraste alto o bastante para sobreviver a um projetor de sala. A Fraunces serifada carrega a autoridade acadêmica nos títulos; a Inter desaparece e deixa ler. Nada aqui é decorativo — cada cor temática tem um significado atribuído, e usar uma delas fora do seu significado quebra o sistema.

**Key Characteristics:**
- Eixo horizontal terra→tecnologia expresso por temperatura de cor, não por texto
- Verde floresta como constante neutra que atravessa as eras
- Âmbar reservado exclusivamente à química
- Fundo creme, nunca branco puro; superfícies brancas só em cards
- Rótulos em caixa alta com entreletra aberta como marca de rigor
- Legibilidade a cinco metros como restrição de projeto, não como acessibilidade opcional

## Colors

Uma paleta de duas temperaturas ancorada num verde neutro: quentes (terra, trigo, âmbar) codificam o passado e a química, frias (tecnologia) codificam o futuro, e o verde floresta pertence às duas pontas.

### Primary
- **Verde Floresta** (`oklch(0.47 0.055 152)`): a marca. Títulos de seção, botão primário, rodapé sólido, anel de foco, e o marcador da Agricultura 3.0 (Revolução Verde). É a única cor que aparece em todas as seções — é o que dá unidade ao percurso. Dessaturado de propósito: não é o verde vibrante do agronegócio.

### Secondary
- **Âmbar de Colheita** (`oklch(0.72 0.13 72)`): **a cor da química.** Ver a Regra do Âmbar abaixo. Aparece no badge do hero, no bloco "Momento de conversa" e na seta de transição entre eras.

### Tertiary
Quatro cores temáticas que carregam significado fixo. Nenhuma delas é decorativa.

- **Terra** (`oklch(0.52 0.075 55)`): o passado agrícola. Coluna "Passado", marcador e borda da Agricultura 1.0, listas de desafios.
- **Trigo** (`oklch(0.79 0.125 82)`): a era mecânica. Marcador e moldura da Agricultura 2.0, blocos de atividade prática. Claro demais para texto — use `wheat-foreground` (`oklch(0.36 0.05 65)`) sobre ele.
- **Folha** (`oklch(0.62 0.13 146)`): vida e crescimento. Usada com parcimônia, sobretudo em fundos suaves.
- **Tecnologia** (`oklch(0.56 0.09 218)`): o futuro. Coluna "Presente"/"Futuro", drones, sensores, dados, IA. É o único azul do sistema e a única cor fria.

### Neutral
- **Creme de Papel** (`oklch(0.99 0.006 95)`): o fundo de toda a página. Levemente amarelado — nunca `#ffffff`.
- **Verde Tinta** (`oklch(0.24 0.02 150)`): todo o texto principal. É um quase-preto esverdeado, não um cinza neutro; é o que faz o texto pertencer à paleta.
- **Verde Névoa** (`oklch(0.5 0.02 140)`): texto secundário, descrições, legendas.
- **Branco de Card** (`oklch(1 0 0)`): a única superfície branca pura, reservada a cards e popovers para que se destaquem do creme.
- **Borda Pálida** (`oklch(0.9 0.012 120)`): divisórias e contornos.

### Tema escuro

O escuro inverte a lógica do claro, não a copia: no claro o fundo é creme e o card é branco; no escuro o fundo é um quase-preto esverdeado (`oklch(0.18 0.012 150)`) e o card é **mais claro** que ele (`oklch(0.22 0.014 150)`). Em ambos, a superfície elevada é a mais clara — é isso que A Regra do Creme protege.

As cores de marca clareiam para continuar liderando: verde floresta vai de `oklch(0.47 …)` para `oklch(0.74 …)`. Os quatro tokens temáticos sobem junto, preservando o eixo terra→tecnologia nos dois temas.

### Conversões sRGB

Três contextos não aceitam `oklch()` e exigem hex literal: a meta tag `theme-color`, o renderizador do `next/og` e atributos de apresentação SVG. Os valores abaixo são conversão exata dos tokens, não cores novas — ao mudar um token, reconverta, porque eles não se atualizam sozinhos.

| Token | Hex |
|---|---|
| `--primary` | `#43644c` |
| `--background` | `#fdfcf7` |
| `--foreground` | `#19221a` |
| `--muted-foreground` | `#5d665b` |
| `--secondary` | `#e2efe2` |
| `--secondary-foreground` | `#243928` |
| `--background` (escuro) | `#0e130f` |

### Cores de série dos gráficos

Croma mais alto que os tokens temáticos, porque marca fina sobre superfície clara precisa disso. Validadas nos dois temas quanto a faixa de luminosidade, piso de croma, separação para daltonismo e contraste mínimo de 3:1 contra a superfície — o token `wheat` reprovou nesse teste (1,96:1 sobre card branco) e por isso não aparece em gráfico algum.

- **Temperatura**: `oklch(0.55 0.13 55)` no claro, `oklch(0.64 0.14 55)` no escuro
- **Chuva**: `oklch(0.52 0.12 230)` no claro, `oklch(0.64 0.13 230)` no escuro

### Named Rules

**A Regra do Âmbar.** Âmbar é a cor da química e de mais nada. Onde houver conteúdo químico — elementos, reações, fertilizantes, defensivos, análise de solo, pH — o âmbar aparece. Onde não houver, ele não entra, por mais que caiba esteticamente. Sendo este um trabalho de Química, a cor é o índice visual da disciplina: um leitor deve conseguir varrer a página e achar toda a química só pela cor.

**A Regra do Eixo.** Terra e tecnologia nunca se misturam num mesmo elemento. Quente é passado, frio é futuro; um card, uma coluna ou um marcador escolhe um lado. A única coisa autorizada a atravessar o eixo é o verde floresta e a seta âmbar de transição.

**A Regra das Duas Tintas.** Cada família de cor tem dois papéis distintos e trocá-los produz texto invisível. `--x-foreground` é o texto que vai **por cima de x preenchido** — usado no marcador da linha do tempo, onde o fundo é a cor cheia. `--x-ink` é o texto **dessa família sobre a superfície da página** — usado em períodos, etiquetas e listas. Não são intercambiáveis: `--wheat-foreground` sobre o card escuro rende 1,01:1, ou seja, nada. Antes de usar um token de cor em texto, pergunte sobre o que ele vai pousar.

**A Regra do Creme.** O fundo é creme, não branco. Branco puro é exclusividade de cards e popovers, e é justamente o contraste creme × branco que define uma superfície elevada. Pintar o fundo de branco apaga o sistema de elevação inteiro.

## Typography

**Display Font:** Fraunces (com fallback Georgia, serif) — via `--font-serif`
**Body Font:** Inter (com fallback system-ui, sans-serif) — via `--font-sans`

**Character:** Uma serifada de contraste alto e formas levemente idiossincráticas contra uma sem-serifa completamente neutra. A Fraunces dá autoridade acadêmica sem parecer livro didático antigo; a Inter não tem opinião nenhuma, que é exatamente o que se quer no corpo de texto. O par é o de um artigo científico bem diagramado, não o de uma apresentação escolar.

### Hierarchy
- **Display** (Fraunces 600, `clamp(2.25rem, 5vw, 3.75rem)`, altura 1.25, entreletra −0.025em): exclusivo do título do hero. Um por página.
- **Headline** (Fraunces 600, `1.875rem` → `2.25rem` a partir de 640px, altura 1.11): títulos de seção. Sempre em verde floresta.
- **Title** (Fraunces 600, `1.125rem`, altura 1.375): títulos de card e de etapa da linha do tempo. Em verde tinta, não em verde floresta — o verde floresta é reservado ao nível de seção.
- **Body** (Inter 400, `1rem`, altura 1.5): texto corrido padrão.
- **Body-lead** (Inter 400, `1.125rem`, altura 1.625): o parágrafo de abertura de cada seção, sempre em verde névoa e centrado, com largura máxima de 48rem.
- **Label** (Inter 600, `0.75rem`, entreletra 0.05em, **caixa alta**): marcadores de coluna ("PASSADO", "FUTURO") e etiquetas de rigor.
- **Nav** (Inter 500, `0.8125rem`, altura 1.5): passo exclusivo dos links do cabeçalho. Existe porque são onze seções e elas precisam caber numa linha a partir de 1280px — é o único lugar do sistema autorizado a usar este tamanho.

### Named Rules

**A Regra dos Cinco Metros.** Este site é projetado numa sala de aula e lido num celular. Nenhum texto que carregue informação essencial fica abaixo de `0.875rem`, e nenhuma informação existe apenas em texto de `0.75rem`. Rótulos pequenos rotulam; eles nunca informam sozinhos.

**A Regra das Duas Vozes.** Serifada pensa, sem-serifa explica. Fraunces só em títulos e números de etapa; Inter em absolutamente todo o resto. Não há terceira fonte, e nenhuma das duas invade o território da outra.

**A Regra do Verde de Seção.** Verde floresta em título é sinal de nível de seção. Um título de card em verde floresta compete com a seção que o contém e achata a hierarquia — títulos de card são verde tinta.

## Layout

Contêiner central de `80rem` (`max-w-7xl`) com medianizes progressivas: `1rem` no celular, `1.5rem` a partir de 640px, `2rem` a partir de 1024px.

O ritmo vertical é o esqueleto do percurso: toda seção respira `5rem` acima e abaixo, subindo para `6rem` a partir de 640px. Seções consecutivas se separam por uma borda de topo a 60% de opacidade e por alternância de fundo (creme → branco de card → creme → verde-suave), nunca por espaço apenas.

Cabeçalhos de seção seguem uma fórmula fixa: pílula de sobretítulo, título centrado, parágrafo de abertura limitado a `48rem`, tudo centrado. Grades de conteúdo abrem abaixo em duas ou três colunas.

O cabeçalho é fixo, com `4rem` de altura e fundo translúcido a 85% com desfoque. Como ele cobre o topo, **toda seção com id de âncora carrega `scroll-mt-20`** — sem isso o título some atrás do cabeçalho ao navegar pelo menu.

Pontos de quebra: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. A navegação horizontal completa só aparece a partir de `xl`, porque são onze seções; abaixo disso vira menu lateral.

A linha do tempo troca de eixo, não só de largura: horizontal com três colunas a partir de `lg`, vertical com linha contínua à esquerda abaixo disso.

## Elevation & Depth

`[decidido]` — o sistema implementado hoje é plano (anel de 1px, sombra só no hover). A direção escolhida é uma **escala de elevação de três níveis**, com uma exigência de craft: as sombras são tingidas com o verde tinta do texto, **nunca pretas**. Sombra preta sobre fundo creme suja a cor e faz a página parecer cinza.

O anel de contorno permanece em todos os níveis: sobre creme, é ele que mantém a aresta nítida onde a sombra é difusa demais para definir borda.

### Shadow Vocabulary
- **Nível 0 — Fundo** (sem sombra): o creme da página e as faixas de seção. Nada flutua no nível base.
- **Nível 1 — Card** (`box-shadow: 0 2px 8px oklch(0.24 0.02 150 / 0.10)`): cards de conteúdo, cards de etapa, blocos temáticos. O estado de repouso de qualquer superfície branca.
- **Nível 2 — Destaque** (`box-shadow: 0 8px 24px oklch(0.24 0.02 150 / 0.14)`): hover de card, etapa ativa da linha do tempo, blocos que pedem atenção. É também o alvo de qualquer transição de hover.
- **Nível 3 — Modal** (`box-shadow: 0 20px 50px oklch(0.24 0.02 150 / 0.20)`): diálogos de detalhe da etapa e o menu lateral. Único nível que se descola claramente da página.

### Named Rules

**A Regra da Sombra Verde.** Nenhuma sombra usa preto ou cinza neutro. Toda sombra é `oklch(0.24 0.02 150)` com opacidade variável — a mesma cor do texto. A página não tem um único pixel de cinza puro, e isso é deliberado.

**A Regra do Anel Permanente.** O anel de `1px` a 10% acompanha todos os níveis e não é substituído pela sombra. Sombra dá profundidade; anel dá aresta. Sobre fundo creme os dois são necessários.

## Shapes

Raio derivado de uma base única de `0.625rem`, escalada por multiplicação — mudar a base reescala o sistema inteiro de forma proporcional.

A forma comunica a natureza do elemento: quanto mais permanente e estrutural, menor o raio; quanto mais efêmero e de etiqueta, mais arredondado. Botões e links de navegação usam raios pequenos (`0.5rem`–`0.625rem`); cards e diálogos usam médios (`0.875rem`); blocos temáticos e painéis usam grandes (`1.125rem`); pílulas, badges e marcadores de etapa são completamente circulares.

O marcador numerado da linha do tempo é a forma-assinatura: um círculo de `3rem` com anel de `4px` na cor do fundo, que cria um recorte limpo onde ele cruza a linha da timeline. É o único lugar do sistema onde um anel serve de máscara e não de borda.

Contornos são finos e discretos: `1px` na cor da borda pálida, ou a cor temática a 25–40% de opacidade quando o bloco pertence a uma era. Seções em construção usam borda tracejada — a única quebra do vocabulário sólido, e ela significa "ainda não existe".

## Components

### Buttons
- **Shape:** cantos suaves (`0.625rem`), altura `2rem` no padrão e `2.25rem` no tamanho grande
- **Primary:** verde floresta com texto creme; hover clareia para 80% de opacidade
- **Outline:** fundo creme com borda pálida; hover vai para o cinza-esverdeado suave
- **Hover / Focus:** transição de `0.15s` em todas as propriedades; foco visível com anel de `3px` em verde floresta a 50%. Ao pressionar, o botão desce `1px`.
- **Como link:** este projeto usa base-ui, que **não tem `asChild`**. Um botão que navega se escreve `<Button render={<a href="..." />}>`. Usar `asChild` renderiza uma âncora dentro de um botão — HTML inválido e navegação quebrada.

### Chips / Badges
- **Style:** pílula totalmente arredondada (`1.625rem`), altura `1.25rem`, texto de `0.75rem` peso 500
- **Química (âmbar):** fundo âmbar com texto marrom-escuro. Reservado por A Regra do Âmbar.
- **Secundário:** fundo verde-suave com texto verde-escuro. É o padrão para etiquetas de tema.
- **Chip de era:** cor temática a 10–15% de fundo com o texto na cor cheia, sempre acompanhado do ícone da etapa.

### Cards / Containers
- **Corner Style:** `0.875rem`
- **Background:** branco puro sobre o creme da página — o contraste é o que define a superfície
- **Shadow Strategy:** Nível 1 em repouso, Nível 2 no hover (ver Elevation & Depth)
- **Border:** anel de `1px` em verde tinta a 10%, ou a cor da era a 25–40% quando o card pertence a uma etapa
- **Internal Padding:** `1rem` via `--card-spacing`; cards de etapa sobrescrevem para `1.25rem`
- **Imagem:** quando o card abre com imagem, ela é sangrada até a borda com proporção 16/10 e o topo herda o raio do card

### Navigation
- **Style:** links de `0.8125rem` peso 500 em verde tinta a 80%, raio `0.5rem`, respiro `0.5rem × 0.625rem`
- **Hover:** fundo verde-suave e texto em verde floresta
- **Focus:** contorno de `2px` deslocado `2px`
- **Mobile:** abaixo de `xl` vira menu lateral pela direita com `18rem` de largura, links de `1rem` e rolagem própria — são onze seções

### Timeline Stage Marker (assinatura)
O componente que define o sistema. Círculo de `3rem` com o número da etapa em Fraunces peso 700, preenchido com a cor da era e cercado por um anel de `4px` na cor do fundo. Em telas grandes ele se alinha sobre uma linha horizontal contínua; em telas pequenas, sobre uma linha vertical à esquerda. O anel na cor do fundo é o que faz o marcador parecer perfurar a linha em vez de flutuar sobre ela.

Cada era tem seu par de cores fixo — terra para a 1.0, trigo para a 2.0, verde floresta para a 3.0 — definido em `components/timeline/stage-theme.ts`. Esse arquivo é a fonte da verdade: uma era nova entra adicionando uma chave lá, nunca escrevendo classes de cor direto no componente.

## Do's and Don'ts

### Do:
- **Do** reservar o âmbar para conteúdo químico, e usar o âmbar em todo conteúdo químico.
- **Do** manter o fundo em creme (`oklch(0.99 0.006 95)`) e reservar o branco puro a cards e popovers.
- **Do** tingir toda sombra com `oklch(0.24 0.02 150)`, a cor do texto, em vez de preto.
- **Do** adicionar `scroll-mt-20` a qualquer seção nova que tenha id, porque o cabeçalho fixo tem `4rem`.
- **Do** declarar uma era nova como chave em `stage-theme.ts` e consumir o mapa, seguindo o padrão que `introduction-section.tsx` também usa.
- **Do** usar `render={<a href="..." />}` quando um botão precisa navegar; `asChild` não existe em base-ui.
- **Do** manter rótulos em caixa alta com entreletra de `0.05em` como marca de rigor.

### Don't:
- **Don't** usar gradiente roxo-azul, glassmorphism, texto com gradiente ou qualquer vocabulário de dashboard de startup — confirmado como anti-referência.
- **Don't** usar foto de banco de imagens de produtor sorrindo, verde saturado ou linguagem publicitária — o site é didático, não promocional.
- **Don't** colorir tudo ao mesmo tempo nem colocar ícone em cada frase; número gigante sem fonte é proibido pela regra de não inventar estatística.
- **Don't** misturar cor terrosa e cor de tecnologia num mesmo elemento; cada bloco escolhe um lado do eixo.
- **Don't** aplicar verde floresta em título de card — ele é reservado ao nível de seção.
- **Don't** introduzir uma terceira família tipográfica.
- **Don't** escrever classes de cor de era direto no componente em vez de consumir `stageThemeMap`.
- **Don't** deixar informação essencial abaixo de `0.875rem`; o site é lido a cinco metros de distância num projetor.
