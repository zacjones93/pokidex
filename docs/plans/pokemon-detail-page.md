# Pokemon Detail Page Implementation Plan

## Overview
Implement a detail page for individual Pokemon following React Router v7 best practices, matching the pattern used in the index page.

## Implementation Steps

### 1. Add Pokemon Detail Types
**File**: `app/types/pokemon.types.ts`

Add interfaces for the Pokemon detail API response:
- `PokemonSprite` - sprite URLs (front_default, official artwork)
- `PokemonType` - type data with name and slot
- `PokemonStat` - stat data with base_stat, effort, and stat name
- `PokemonAbility` - ability data with name and hidden flag
- `Pokemon` - complete Pokemon detail data
- `PokemonApiDetailResponse` - raw PokeAPI response structure

### 2. Add Pokemon Detail Service
**File**: `app/services/pokemon.service.ts`

Implement `getPokemonById(id: string | number)`:
- Fetch from `https://pokeapi.co/api/v2/pokemon/{id}`
- Transform API response to `Pokemon` type
- Handle errors and invalid IDs
- Return typed Pokemon data

### 3. Create Detail Route
**File**: `app/routes.ts`

Add dynamic route:
```typescript
route("pokemon/:id", "routes/pokemon.$id.tsx")
```

### 4. Create Detail Page Component
**File**: `app/routes/pokemon.$id.tsx` (new file)

Export the following:

**`meta` function**:
- Dynamic title with Pokemon name
- Description with Pokemon types

**`loader` function**:
- Extract `id` param from `Route.LoaderArgs`
- Call `getPokemonById(id)`
- Return Pokemon data
- Throw 404 Response if not found
- Throw 500 Response on error

**Default component**:
- Display official artwork sprite
- Show capitalized Pokemon name
- Display type badges with colors
- Show stats with progress bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- Display height and weight
- List abilities
- Add back button/link to home

### 5. Update Pokemon List Component
**File**: `app/components/pokemon-list.tsx`

- Wrap Pokemon cards with `<Link to={`/pokemon/${id}`}>`
- Add hover effects for better UX
- Make entire card clickable

## React Router v7 Patterns
- ✅ Dynamic route using `$id` file convention
- ✅ Typed exports via `+types/pokemon.$id`
- ✅ Server-side data loading with `loader`
- ✅ Type-safe params from `Route.LoaderArgs`
- ✅ Error handling with thrown Responses
- ✅ SEO optimization with dynamic `meta`

## Files to Create/Modify
- ✏️ `app/types/pokemon.types.ts` - Add detail types
- ✏️ `app/services/pokemon.service.ts` - Add `getPokemonById`
- ✏️ `app/routes.ts` - Add detail route
- ➕ `app/routes/pokemon.$id.tsx` - New detail page
- ✏️ `app/components/pokemon-list.tsx` - Add navigation links

## API Reference
- List endpoint: `GET /pokemon?limit={limit}&offset={offset}`
- Detail endpoint: `GET /pokemon/{id}`
- PokeAPI base: `https://pokeapi.co/api/v2`
