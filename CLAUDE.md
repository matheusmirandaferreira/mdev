# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server with HMR
npm run build        # tsc -b && vite build
npm run lint         # ESLint (treat warnings as errors per CLAUDE.local.md)
npm run preview      # Preview production build locally
npm run test         # Vitest single run
npm run test:watch   # Vitest watch mode
```

To run a single test file:
```bash
npx vitest run src/__tests__/Contact.test.tsx
```

## Architecture

**React 19 SPA** — client-side only, no SSR, no external API calls. All portfolio content lives in `src/data/portfolio.ts` — this is the single source of truth for personal info, skills, projects, and experience. To update the portfolio, edit this file.

### Key layers

| Layer | Path | Purpose |
|---|---|---|
| Data | `src/data/portfolio.ts` | All content: name, bio, skills, projects, experience |
| Sections | `src/components/sections/` | One component per page section (Hero, About, Skills, Projects, Experience, Contact) |
| Layout | `src/components/layout/` | Header, Footer, SectionWrapper |
| UI primitives | `src/components/ui/` | shadcn/UI components — avoid modifying these |
| Icons | `src/components/icons/` | Custom SVG icon components shared across sections |
| Validation | `src/lib/schemas.ts` | Zod schemas (contact form) |
| Utils | `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| Hook | `src/hooks/useInView.ts` | IntersectionObserver for scroll-triggered animations |

### Scroll animations pattern

Sections use `useInView` + Framer Motion. The hook wraps `IntersectionObserver` and is mocked in `src/__tests__/setup.ts` for tests.

### Theme

Defined entirely via CSS variables in `src/styles/globals.css`. Primary colors: neon blue `#0066ff` / `#00d4ff` on dark `#050810` background. Fonts: Syne (headings), Plus Jakarta Sans (body) — loaded from Google Fonts in `index.html`.

Path alias `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Testing

Tests live in `src/__tests__/`. `IntersectionObserver` is globally mocked in `setup.ts`. New logic (schemas, hooks, form behaviour) should have coverage; UI-only rendering changes don't require tests.
