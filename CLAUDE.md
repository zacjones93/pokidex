# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: React Router v7 (with SSR enabled by default)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
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
```

## Architecture

### Routing
- Routes defined in `app/routes.ts` using `@react-router/dev/routes`
- Route components live in `app/routes/` directory
- Each route uses typed exports from `+types/[route-name]` for type safety
- Example: `app/routes/home.tsx` exports `meta`, `loader`, `action`, etc.

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
