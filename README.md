<p align="center">
  <img src="./public/icon.svg" alt="Símbolo do AgroEvolução" width="96" />
</p>

<h1 align="center">AgroEvolução</h1>

<p align="center">
  <strong>Do arado à inteligência artificial</strong>
</p>

<p align="center">
  Uma experiência educacional interativa sobre a evolução da agricultura,
  desenvolvida para apresentação escolar de Química.
</p>

## Sobre o projeto

O AgroEvolução apresenta as transformações da agricultura desde os primeiros
cultivos até a Agricultura 5.0. O conteúdo relaciona história, química,
tecnologia e sustentabilidade sem reduzir o tema a uma simples sequência de
máquinas.

O site foi pensado para dois contextos:

- **apresentação em sala**, com modo próprio para projetor e navegação por
  teclado;
- **consulta pelo celular**, com conteúdo responsivo, tema claro e escuro e
  atividades interativas.

## O que há no site

- linha do tempo da Agricultura 1.0 à 5.0;
- participação da química em cada etapa;
- atlas de tecnologias agrícolas;
- painel de fazenda inteligente com clima e condições do solo;
- comparação entre benefícios, desafios e sustentabilidade;
- atividades de associação e ordenação;
- quiz no estilo ENEM com explicação das respostas;
- modo apresentação com tela cheia, progresso e navegação entre seções;
- abertura cinematográfica com porteiras rurais e opção de pular;
- seção de integrantes e identificação da instituição de ensino.

## Como apresentar na escola

### Pelo site publicado

1. Abra o endereço de produção em uma janela anônima.
2. Teste o link usando a mesma rede que será utilizada na apresentação.
3. Clique em **Modo apresentação** no cabeçalho.
4. Navegue pelas seções usando os botões da barra, `Page Up`, `Page Down` ou as
   setas do teclado.
5. Leve um QR Code do endereço para quem quiser acompanhar pelo celular.

Se a API de clima não responder, o painel usa automaticamente uma medição real
gravada no repositório. Assim, a apresentação continua funcionando e informa
com clareza que o dado exibido é um registro anterior.

### Rodando no computador

Requer [Node.js 20.9 ou superior](https://nodejs.org/) e
[pnpm](https://pnpm.io/).

```bash
corepack enable
pnpm install
pnpm dev
```

Depois, abra [http://localhost:3000](http://localhost:3000).

Para testar exatamente o build de produção:

```bash
pnpm build
pnpm start
```

## Publicação

O projeto está preparado para implantação na
[Vercel](https://vercel.com/), com integração automática ao GitHub:

1. entre na Vercel usando a conta do GitHub;
2. selecione **Add New → Project**;
3. importe este repositório;
4. mantenha o preset **Next.js** e o diretório raiz `./`;
5. clique em **Deploy**.

Não são necessárias chaves de API nem variáveis de ambiente para a configuração
atual. Depois da primeira publicação, cada novo push para `main` gera uma nova
versão de produção.

## Tecnologias

- [Next.js 16](https://nextjs.org/) com App Router;
- [React 19](https://react.dev/);
- [TypeScript](https://www.typescriptlang.org/);
- [Tailwind CSS 4](https://tailwindcss.com/);
- [Motion](https://motion.dev/) para animações;
- [Recharts](https://recharts.org/) para os gráficos;
- [Base UI](https://base-ui.com/) e componentes shadcn;
- [Open-Meteo](https://open-meteo.com/) para dados meteorológicos.

## Organização do conteúdo

Os textos e dados ficam separados dos componentes visuais. Na maioria das
alterações editoriais, basta modificar um arquivo em `lib/`.

| Arquivo | Conteúdo |
|---|---|
| `lib/site-data.ts` | Identidade, integrantes, escola, menu e ordem das seções |
| `lib/timeline-data.ts` | Etapas, características, tecnologias e desafios |
| `lib/chemistry-data.ts` | Temas de química aplicados ao campo |
| `lib/technology-data.ts` | Tecnologias exibidas no atlas |
| `lib/sustainability-data.ts` | Pilares da sustentabilidade |
| `lib/challenges-data.ts` | Desafios da agricultura digital |
| `lib/quiz-data.ts` | Questões e explicações do quiz |
| `lib/references-data.ts` | Fontes, referências e créditos |
| `lib/summary-data.ts` | Marcos e conclusões |
| `lib/farm-rules.ts` | Regras do simulador da fazenda inteligente |
| `lib/weather-snapshot.json` | Medição de segurança usada quando a rede falha |

## Estrutura

```text
app/            layout, página principal, estilos e imagem de compartilhamento
components/     seções e componentes da interface
  activities/   atividades interativas
  presentation/ modo apresentação
  smart-farm/   painel da fazenda e gráficos
  timeline/     linha do tempo e detalhes das etapas
  ui/           componentes reutilizáveis
lib/            conteúdo, dados e regras
public/         ícones e ilustrações
patches/        correções temporárias de dependências
```

## Qualidade e confiabilidade

O projeto segue alguns compromissos editoriais:

- não apresenta estatísticas, datas ou porcentagens sem fonte;
- não inventa referências bibliográficas;
- não oferece doses ou recomendações de aplicação de fertilizantes e
  defensivos;
- identifica a classificação Agricultura 1.0–5.0 como uma organização didática;
- diferencia dados ao vivo, medições gravadas e hipóteses do simulador;
- respeita preferências de redução de movimento e navegação por teclado.

Antes de enviar alterações, execute:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Documentação

- [`PRODUCT.md`](./PRODUCT.md): objetivos, público e regras de conteúdo;
- [`DESIGN.md`](./DESIGN.md): identidade visual, cores e decisões de interface.

## Créditos

Projeto desenvolvido por estudantes do
**Colégio Estadual Cleoracy Aparecida Gil**, em Douradina, Paraná.

Os nomes dos integrantes e a ficha completa do projeto estão disponíveis na
seção **Integrantes do grupo** do site.

## Pendências editoriais

- registrar em `lib/references-data.ts` os materiais efetivamente consultados
  pelo grupo;
- substituir as ilustrações vetoriais das etapas 4.0 e 5.0 caso o grupo produza
  artes definitivas no mesmo estilo das demais.

---

Projeto com finalidade estritamente educacional.
