# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: React Router v7 (with SSR enabled by default)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Build**: Vite

## Development Commands

```bash
# Start dev server with HMR at http://localhost:5173
npm run dev

# Type checking (generates types, then runs tsc)
npm run typecheck

# Production build
npm run build

# Run production server
npm start

# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

## Architecture

### Routing
- Routes defined in `app/routes.ts` using `@react-router/dev/routes`
- Route components live in `app/routes/` directory
- Each route uses typed exports from `+types/[route-name]` for type safety
- Dynamic routes use `$` prefix (e.g., `pokemon.$id.tsx` for `/pokemon/:id`)

### Data Loading Pattern
- Server-side data fetching via `loader` functions in route files
- Loaders run on server before render, data available via `useLoaderData()`
- Type-safe loaders using `Route.LoaderArgs` from route `+types`
- For non-blocking parallel data: use `useFetcher` to load after initial render

### Project Structure
```
app/
├── routes/           # Route components with loaders
├── components/       # React components (UI + feature components)
├── services/         # API services (PokeAPI integration)
├── types/            # TypeScript type definitions
├── lib/              # Utility functions
└── root.tsx          # Root layout + error boundary
```

### Services Layer
- `app/services/pokemon.service.ts` handles all PokeAPI calls
- Functions: `getPokemonList()`, `getPokemonById()`, `extractPokemonId()`
- API base: `https://pokeapi.co/api/v2`

### Type Safety
- Types defined in `app/types/pokemon.types.ts`
- Route loaders/actions typed via `+types/[route-name]` imports
- Path aliases: `~/*` maps to `app/*`, `@/*` maps to `app/*`

### UI Components
- shadcn/ui components in `app/components/ui/`
- Styling uses `cn()` utility (tailwind-merge + clsx)
- Located in `app/lib/utils.ts`

### Layout & Error Handling
- `app/root.tsx` contains:
  - `Layout` component wrapping all pages
  - Global error boundary with dev-mode stack traces
  - Font loading via `links` export (Inter font from Google Fonts)

### SSR Configuration
- SSR enabled in `react-router.config.ts`
- Set `ssr: false` to switch to SPA mode

### Build Output
```
build/
├── client/    # Static assets for browser
└── server/    # SSR server code
```
