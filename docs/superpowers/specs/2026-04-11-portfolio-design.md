# Portfolio Pessoal — Design Spec
**Data:** 2026-04-11
**Autor:** Matheus de Miranda Ferreira

---

## Contexto

Portfólio pessoal com dupla função: vitrine técnica para recrutadores e **ferramenta de vendas** para apresentar serviços de desenvolvimento web a clientes não técnicos. O público-alvo principal é empresas e empreendedores brasileiros sem profundo conhecimento técnico. O objetivo primário é gerar contato via WhatsApp.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Estilização | Tailwind CSS |
| Animações | Framer Motion |
| Formulário | React Hook Form + Zod |
| Ícones | Lucide React |
| Componentes UI | Shadcn/UI |
| Fontes | Google Fonts (a definir na implementação — display moderna para títulos, sans-serif para corpo — não usar Inter, Roboto ou Arial) |

---

## Design

### Estética
**Tech/Azul Neon** — escuro, limpo, sem elementos decorativos de código (sem `const`, `//`, monospace ornamental). A interface deve parecer profissional e moderna, não excessivamente "nerd".

### Paleta
```
Fundo principal:   #050810
Fundo de cards:    #080f1e
Bordas padrão:     #0d1a30
Bordas hover:      #1a3a6a
Azul primário:     #0066ff
Ciano destaque:    #00d4ff
Verde status:      #4ade80
Texto principal:   #e0e8ff
Texto secundário:  #6a8aaa
Texto sutil:       #4a6a8a
```

### Tipografia
- Títulos: display font com personalidade e peso (ex: Syne, Space Grotesk, Outfit)
- Corpo: sans-serif elegante (ex: Plus Jakarta Sans, DM Sans)
- Detalhes técnicos (badges): mesma fonte do corpo, sem monospace

### Princípios de layout
- Espaçamento generoso entre seções
- Linha accent `#0066ff` de 2px no topo de cards e seções
- Cards com borda `#0d1a30` normal → `#0066ff` no hover + `box-shadow` azul sutil
- Scroll indicator discreto (linha vertical + texto "SCROLL") no hero
- Header fixo com scroll spy (seção ativa destacada)
- Botão "scroll to top" aparece após 300px de scroll

---

## Estrutura de Pastas

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/        Header, Footer, SectionWrapper
│   │   ├── sections/      Hero, About, Skills, Projects, Experience, Contact
│   │   └── ui/            Shadcn components (Button, Card, Badge, Input, Textarea, Form) + ScrollToTop
│   ├── data/
│   │   └── portfolio.ts   dados centralizados + tipos TypeScript
│   ├── hooks/
│   │   └── useInView.ts   detecção de seção para scroll spy e animações
│   ├── lib/
│   │   └── schemas.ts     schema Zod do formulário de contato
│   ├── styles/
│   │   └── globals.css    Tailwind directives + variáveis CSS customizadas
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Seções

### 1. Hero
- Indicador "DISPONÍVEL PARA PROJETOS" com dot verde animado
- Nome: **Matheus de Miranda Ferreira** (display grande, peso 800)
- Subtítulo: "Desenvolvedor Frontend Sênior" (azul `#0066ff`)
- Bio curta (1-2 linhas)
- CTA primário: **"Falar no WhatsApp"** (fundo `#0066ff`, destaque)
- CTA secundário: "Ver Projetos" (borda sutil)
- Avatar: div circular com iniciais **MMF**, borda com glow azul
- Localização + ícones GitHub/LinkedIn abaixo do avatar
- Animação de entrada: fade + slide up staggered (Framer Motion)

### 2. Sobre
- Bio expandida (~3 parágrafos)
- Avatar MMF à esquerda (maior), texto à direita
- Localização: São Paulo, Brasil
- Layout: grid 2 colunas em desktop, stack em mobile

### 3. Skills
- Agrupadas por categoria: Core, Styling, State/Data, Forms, Tooling, Realtime, Testing, Outros
- Componentes Shadcn utilizados: `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Form` (RHF integration)
- Badges: fundo `#0a1428`, borda `#1a2a4a`, texto `#00d4ff`
- Hover: borda → `#0066ff`, texto → `#e0e8ff`
- Animação: entrada staggered ao entrar no viewport

### 4. Projetos
- Grid 2 colunas (desktop) / 1 coluna (mobile)
- Card: área de preview (`#0a1428`) + título + descrição + tags de stack + links Demo/Repo
- Linha accent `#0066ff`→`#00d4ff` no topo de cada card
- Hover: borda acende para `#0066ff`, `box-shadow: 0 0 20px rgba(0,102,255,0.15)`
- 4 projetos conforme brief

### 5. Experiência
- Timeline vertical com linha central `#0066ff`
- Círculos nos pontos: `#0066ff` com borda `#050810`
- Alternância esquerda/direita em desktop
- Cargo (branco), empresa (azul), período (sutil), descrição (cinza)
- 2 entradas conforme brief

### 6. Contato
- **Bloco esquerdo:** botão WhatsApp grande (verde `#25D366`), + links GitHub e LinkedIn
- **Bloco direito:** formulário com campos nome, email, mensagem
- Validação: React Hook Form + Zod (required, email válido, min length)
- Envio simulado com `setTimeout` + feedback de sucesso/erro
- Layout: grid 2 colunas (desktop) / stack (mobile)

### 7. Footer
- Linha horizontal `#0d1a30`
- Esquerda: nome + copyright
- Direita: ícones GitHub, LinkedIn, WhatsApp

---

## Dados (`src/data/portfolio.ts`)

Todos os dados do brief original centralizados como objetos TypeScript tipados:
- `developerInfo` — nome, título, bio, localização, contatos
- `skills` — objeto com categorias
- `projects[]` — array de projetos
- `experience[]` — array de experiências

Nome real: **Matheus de Miranda Ferreira**
Placeholders a preencher: email, GitHub URL, LinkedIn URL, número WhatsApp

---

## Comportamentos

| Funcionalidade | Detalhe |
|---|---|
| Scroll spy | `useInView` hook + `IntersectionObserver`, destaca item ativo no header |
| Animações de entrada | `framer-motion` `whileInView` com `staggerChildren` |
| Scroll to top | Botão aparece após 300px, `framer-motion` `AnimatePresence` |
| Formulário | RHF + Zod, submit simulado com 1.5s delay + estado de loading |
| Links de âncora | IDs em cada seção, scroll suave via CSS `scroll-behavior: smooth` |
| Responsividade | Mobile-first, breakpoints Tailwind padrão (sm/md/lg) |
| Acessibilidade | Semântica HTML5, `aria-label` em ícones, contraste WCAG AA |

---

## Verificação

1. `npm run dev` — site abre sem erros de console
2. Navegar por todas as seções via header — scroll spy funciona
3. Hover nos cards de projeto — borda azul e sombra aparecem
4. Formulário de contato — validação exibe erros, envio exibe loading e mensagem de sucesso
5. Botão WhatsApp — abre `https://wa.me/<numero>` em nova aba
6. Responsividade — testar em 375px (mobile), 768px (tablet), 1280px (desktop)
7. Scroll to top — aparece após rolar, clique volta ao topo
