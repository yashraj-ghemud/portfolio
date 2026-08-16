# portfolio

> Frontend developer portfolio built with Next.js (App Router) and TypeScript. The repo contains app/ pages (home, projects, skills, contact), client-only components using dynamic imports, Framer Motion animations, Tailwind CSS global styles, small data modules for projects and skills, and utility hooks.

## Overview

Renders a modern animated personal portfolio web site. Pages included: Home (client-only animation heavy), Projects (client-only list with SVG icons and data from data/projects.ts), Skills (animated categories from app/skills/page.tsx), Contact (interactive "hacker/matrix" UI). Uses dynamic imports to disable SSR for animation-heavy components.

## Key capabilities

- Animated Hero and UI using Framer Motion (components/HeroImage.tsx, SectionHeader.tsx)
- Client-only dynamic imports to avoid SSR for heavy animations (app/ClientOnly.tsx, app/projects/ClientOnly.tsx)
- Contact page with matrix rain, glitch and typing effects (app/contact/page.tsx)
- Data-driven Projects and Skills (data/projects.ts, data/skills.ts)
- Responsive layout and navbar (components/Navbar.tsx)
- TypeScript with strict compiler options (tsconfig.json)

## Technology

- Next.js (15.5.4) - App Router
- React (19.1.0)
- TypeScript
- Tailwind CSS (dependency present)
- Framer Motion
- ESLint (with eslint-config-next)
- Turbopack (used in npm scripts)
- Next/Image

## Repository structure

The following top-level files and directories were observed in the repository:

- `.eslint.config.mjs`
- `.eslintrc.json`
- `.gitignore`
- `README.md`
- `app`
- `components`
- `data`
- `git`
- `hooks`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `public`
- `tsconfig.json`

## Getting started

This repository includes a `package.json`. Install dependencies with the package manager declared by the project, then use the scripts below where applicable.

```bash
npm install
npm run dev
npm run start
npm run build
npm run lint
```

Available package scripts:
- `npm run dev` — next dev --turbopack
- `npm run build` — next build --turbopack
- `npm run start` — next start
- `npm run lint` — eslint

## Configuration

Next.js App Router structure (app/layout.tsx, app/page.tsx, nested route folders like app/projects and app/contact). Server components are used for top-level pages with client-only UI split into dynamic imports (ClientOnly components in app/ and app/projects/). Presentational components live in components/ (Navbar, HeroImage, SectionHeader). Small local data modules in data/. Global styles in app/globals.css. TypeScript project configured with path alias @/*. No API or server-side endpoints observed in repository.

## Development and quality notes

- No dedicated test files were identified in the audited tree.
- No continuous-integration configuration was identified during the audit.

### Current improvement opportunities

- Add missing repo hygiene files: .gitignore, LICENSE, README: expand project README with routes and local dev steps
- Add Tailwind configuration files if absent: tailwind.config.js and postcss.config.js to make Tailwind usage explicit (globals.css imports Tailwind)
- Verify and commit referenced assets: ensure /public/portfolio_logo.png and /public/images/projects/* exist
- Add an API route for contact form or remove form submission UI; implement server-side validation and rate limiting (suggested path: app/api/contact/route.ts)
- Run and fix ESLint warnings; avoid blanket eslint-disable comments (review app/contact/page.tsx)
- Run `npm audit` and update/patch vulnerable dependencies; pin devDependencies where appropriate

## Contributing

Before submitting changes, keep the implementation aligned with the existing project structure, add or update relevant tests where the project supports them, and describe any configuration changes in the pull request.
