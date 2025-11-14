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

# Type checking (generates React Router types, then runs tsc)
npm run typecheck

# Production build
npm run build

# Run production server (from build/server/index.js)
npm start

# Add shadcn/ui components (runs shadcn CLI interactively)
npx shadcn@latest add [component-name]
```

**Common Workflow:**
```bash
npm run dev          # Dev loop with HMR
npm run typecheck    # Check types before commit
npm run build        # Test production build locally
npm start            # Run built server
```

## Architecture

### Routing

**Route Definition:**
- Defined in `app/routes.ts` using `@react-router/dev/routes` config
- Route components in `app/routes/` directory
- Dynamic segments use `$` prefix: `pokemon.$id.tsx` → `/pokemon/:id`
- Typed via auto-generated `+types/[route-name].ts` files

**Current Routes:**
- `/` → `home.tsx` (Pokemon list, pagination, 20 per page)
- `/pokemon/:id` → `pokemon.$id.tsx` (Detail page)
- `/home-outlet` → `home-outlet.tsx` (Alternative layout, horizontal grid, 12 per page)
  - `/home-outlet/` → `home-outlet._index.tsx` (Index within outlet)
  - `/home-outlet/:id` → `home-outlet.$id.tsx` (Detail in outlet sidebar)
    - Nested: `home-outlet.$id.notes.tsx` (Notes tab)
- `/api/evolutions/:id` → `api.evolutions.$id.tsx` (API endpoint for evolution data)

**Features:**
- View transitions on navigation (CSS Transitions API)
- Random Pokemon link generation
- State persistence via URL search params (pagination)

### Data Loading Patterns

**Blocking Loaders (Data Before Render):**
- Define `loader` export in route files
- Runs server-side before page render
- Data accessed via `useLoaderData<Route.ComponentProps['loaderData']>()`
- Type-safe via auto-generated `+types/[route-name]` imports
- Use for critical data (Pokemon list, detail view)
- Example: `home.tsx` loader paginates from `getPokemonList(limit, offset)`

**Non-Blocking Data (Parallel Loading):**
- Use `useFetcher` hook for secondary data loads
- Data fetches after initial render via API routes or actions
- Example: Evolution chains fetch separately to avoid blocking initial render
- Routes ending in `.tsx` with `loader`/`action` act as API endpoints

**Cache Headers:**
- Apply cache headers in loaders for CDN/browser caching
- Example: `Cache-Control: public, max-age=300, s-maxage=3600`

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
- **Pokemon Service** (`app/services/pokemon.service.ts`):
  - All PokeAPI calls via `https://pokeapi.co/api/v2`
  - Key functions: `getPokemonList()`, `getPokemonById()`, `getPokemonSpecies()`, `getEvolutions()`
  - Parsing utilities: `extractPokemonId()`, `parseEvolutionChain()`
  - Cache headers on loaders: `Cache-Control: public, max-age=300, s-maxage=3600`
- **Notes Service** (`app/services/notes.service.ts`):
  - Client-side IndexedDB storage (`pokidex-notes` db)
  - Functions: `initDB()`, `getNotesByPokemonId()`, `addNote()`, `deleteNote()`
  - 800ms simulated delay for learning purposes
  - SSR-safe (checks `typeof window`)

### Type Safety
- Types defined in `app/types/pokemon.types.ts`
- Route loaders/actions typed via `+types/[route-name]` imports
- Path aliases: `~/*` maps to `app/*`, `@/*` maps to `app/*`

### UI & Feature Components
- **UI Components** (`app/components/ui/`): shadcn/ui wrappers (Button, Pagination, Table, Textarea)
- **Feature Components**:
  - `PokemonCard`: Displays Pokemon with sprite, stats, types (variants: full/compact)
    - Skeleton loading with shimmer animation
    - Image lazy loading with opacity transition
    - Type-based gradient backgrounds
  - `PokemonList`: Pagination + table layout wrapper
  - `PokemonTable`: Table view of Pokemon data
  - `PokemonEvolutions`: Shows evolution chains
- **Styling**:
  - `cn()` utility (tailwind-merge + clsx) in `app/lib/utils.ts`
  - TailwindCSS v4 with OKLch color space
  - Type-color mapping: `app/lib/type-colors.ts` (18 Pokemon types)
  - Custom animations: shimmer, spin, pulse
  - Dark mode support via `.dark` class

### Layout & Error Handling
- `app/root.tsx` contains:
  - `Layout` component wrapping all pages
  - Global error boundary with dev-mode stack traces
  - Font loading via `links` export (Inter font from Google Fonts)

### SSR Configuration
- SSR enabled in `react-router.config.ts`
- Set `ssr: false` to switch to SPA mode

### Build Output & Deployment
```
build/
├── client/    # Browser assets (JS, CSS, images)
└── server/    # SSR Node.js server code
```

**Production Build:**
- `npm run build` creates optimized bundles
- `npm start` runs SSR server from `build/server/index.js`
- Can be deployed to: Node.js servers, Docker, Fly.io, Railway, Cloud Run, ECS, etc.
- Docker support via included `Dockerfile`

**Performance Considerations:**
- Images lazy-loaded with opacity transitions
- Skeleton loading states with shimmer animation
- Route-based code splitting via React Router
- Cache headers on API responses (Pokemon list caches for 5min client, 1hr CDN)

## Common Patterns & Gotchas

### Type Generation
- Run `npm run typecheck` before committing to generate fresh `+types` files
- Route-specific types auto-generated from `loader`/`action` function signatures
- Don't manually edit `.react-router/types/` files—they're regenerated

### SSR Considerations
- Client-only code: wrap with `typeof window !== 'undefined'` checks
- Example: Notes service checks for window before accessing IndexedDB
- Use `isbot` package (already imported) to detect crawlers if needed

### Data Fetching
- **Loaders block render**—use for critical path data only
- **useFetcher for non-critical data**—loads after initial render
- API routes (e.g., `api.evolutions.$id.tsx`) return JSON via loader
- Don't fetch in components—use loaders or fetchers instead

### Component State
- Minimize component state; prefer URL search params for pagination
- Use `useSearchParams` to read/update pagination state
- Global state not needed for this project (URL + IndexedDB sufficient)

### Styling
- Use `cn()` utility for combining Tailwind classes
- Import type-colors for Pokemon type styling: `getTypeColor()`, `getTypeBackgroundGradient()`
- Dark mode: add `.dark` class to root element (handled in root.tsx)
- Custom animations in `app.css` (shimmer, spin, pulse)
