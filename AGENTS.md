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
├── app/                 # App shell, router, layout, shared landscape runtime
├── routes/              # Route-owned pages, route config, scene specs, assets
├── components/          # Reusable components
├── hooks/               # Custom React hooks
├── context/             # React context providers
├── data/                # Static data
├── styles/              # Theme, global styles, animations
├── assets/              # Shared images, SVGs, fonts
└── __tests__/           # Vitest + Testing Library coverage and shared test utils
```

## Conventions

- **Styling**: Use styled-components with the theme from `src/styles/theme.js`. Access colors via `theme.colors.*`, typography via `theme.typography.*`, breakpoints via `theme.breakpoints.*`.
- **Breakpoints**: Mobile `767px`, Tablet `1024px`
- **Font**: Acumin Variable Concept (variable font with weight 100-900 and width 75%-100%)
- **Animations**: Use GSAP timelines. Respect `prefers-reduced-motion` (already handled in GlobalStyle).
- **SVGs**: Import as React components via SVGR (`import { ReactComponent as Icon } from './icon.svg'` or `import Icon from './icon.svg?react'`)
- **Components**: PascalCase filenames, one component per file
- **No semicolons** in JS/JSX files (project convention)
- **Routing ownership**: Keep app-level shell/router code in `src/app/*`. Keep page-specific code, route metadata, scene specs, and route assets inside the owning `src/routes/<route>/` folder, typically alongside that route's `route.js`.
- **Testing**: Vitest + Testing Library are set up under `src/__tests__`. Use `src/__tests__/testUtils.jsx` when rendering themed components so tests inherit the shared `ThemeProvider`.

## Commands

- `npm run dev` — Start dev server (port 5175)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest
- `npm run preview` — Preview production build
