# HKW Site 2026

Portfolio/agency website built with React 19, Vite 8, and GSAP animations.

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite 8** with `@vitejs/plugin-react` (Oxc) and `vite-plugin-svgr`
- **Styled Components 6** for styling (CSS-in-JS)
- **GSAP 3** with `@gsap/react` for animations
- **React Router 7** for routing
- **Path alias**: `@` maps to `src/`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── characters/      # Marmot mascot variants
│   └── ui/              # Buttons, typography, form fields
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── context/             # React context providers
├── data/                # Static data (services, case studies, testimonials)
├── styles/              # Theme, global styles, animations
└── assets/              # Images, SVGs, fonts
```

## Conventions

- **Styling**: Use styled-components with the theme from `src/styles/theme.js`. Access colors via `theme.colors.*`, typography via `theme.typography.*`, breakpoints via `theme.breakpoints.*`.
- **Breakpoints**: Mobile `767px`, Tablet `1024px`
- **Font**: Acumin Variable Concept (variable font with weight 100-900 and width 75%-100%)
- **Animations**: Use GSAP timelines. Respect `prefers-reduced-motion` (already handled in GlobalStyle).
- **SVGs**: Import as React components via SVGR (`import { ReactComponent as Icon } from './icon.svg'` or `import Icon from './icon.svg?react'`)
- **Components**: PascalCase filenames, one component per file
- **No semicolons** in JS/JSX files (project convention)

## Commands

- `npm run dev` — Start dev server (port 5175)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build
