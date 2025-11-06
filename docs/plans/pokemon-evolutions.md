# Pokemon Evolutions Feature Plan

## Overview
Add evolution chain display to Pokemon detail page using React Router v7 pending UI patterns for non-blocking parallel data fetching.

## Important Note on Pending UI
React Router v7's docs focus on `useNavigation` and `useFetcher` for pending states, **not** `Await`/`defer` (older pattern). For non-blocking evolution data that loads after main page:
- **Option A**: Use `useFetcher` to fetch evolutions after initial render
- **Option B**: Use `defer` from loader (if still supported, needs verification)

This plan uses **Option A (useFetcher)** as it's documented and recommended.

## Evolution API Flow
1. Pokemon detail response includes `species.url`
2. Fetch species data to get `evolution_chain.url`
3. Fetch evolution chain to get full tree
4. Parse chain to extract evolution stages
5. Display as linked buttons

**Example**: Bulbasaur (#1) → species → evolution chain #1 → {Bulbasaur, Ivysaur, Venusaur}

## Implementation Steps

### 1. Add Evolution Types
**File**: `app/types/pokemon.types.ts`

Add interfaces:
```typescript
// Species API response (minimal subset needed)
interface PokemonSpecies {
  name: string;
  evolution_chain: {
    url: string;
  };
}

// Evolution chain structures
interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

interface ChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
}

// Flattened evolution for UI
interface Evolution {
  name: string;
  id: number;
}
```

### 2. Add Evolution Service Functions
**File**: `app/services/pokemon.service.ts`

**`getPokemonSpecies(id: string | number)`**:
- Fetch `https://pokeapi.co/api/v2/pokemon-species/{id}`
- Return species data with evolution_chain URL

**`getEvolutionChain(id: number)`**:
- Fetch `https://pokeapi.co/api/v2/evolution-chain/{id}`
- Return evolution chain data

**`parseEvolutionChain(chain: ChainLink)`**:
- Recursively flatten chain into Evolution[]
- Extract name and ID from each species URL
- Return array of all evolutions in order

**Combined helper `getEvolutions(pokemonId: string | number)`**:
- Call species → extract chain ID → fetch chain → parse
- Handle errors gracefully (return empty array)
- Single function for fetcher to call

### 3. Update Pokemon Detail Types
**File**: `app/types/pokemon.types.ts`

Add `species` to `Pokemon` and `PokemonApiDetailResponse`:
```typescript
species: {
  name: string;
  url: string;
}
```

### 4. Update getPokemonById Service
**File**: `app/services/pokemon.service.ts`

Include `species` field in return object:
```typescript
return {
  // ... existing fields
  species: data.species,
};
```

### 5. Create Evolutions Component
**File**: `app/components/pokemon-evolutions.tsx` (new)

Component using `useFetcher`:
```typescript
export function PokemonEvolutions({ pokemonId }: Props) {
  const fetcher = useFetcher<Evolution[]>();

  useEffect(() => {
    // Load evolutions after mount
    fetcher.load(`/api/evolutions/${pokemonId}`);
  }, [pokemonId]);

  // Show loading state
  if (fetcher.state === "loading") {
    return <Skeleton />;
  }

  // Show evolutions
  return (
    <div className="evolution-section">
      <h2>Evolutions</h2>
      <div className="evolution-buttons">
        {fetcher.data?.map((evo) => (
          <Link to={`/pokemon/${evo.id}`}>
            {capitalize(evo.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### 6. Create Evolution API Route
**File**: `app/routes/api.evolutions.$id.tsx` (new)

```typescript
export async function loader({ params }: Route.LoaderArgs) {
  const evolutions = await getEvolutions(params.id);
  return evolutions;
}
```

Add to `app/routes.ts`:
```typescript
route("api/evolutions/:id", "routes/api.evolutions.$id.tsx")
```

### 7. Update Detail Page
**File**: `app/routes/pokemon.$id.tsx`

Add evolutions section after Stats:
```tsx
{/* Evolutions Section */}
<div className="border-t border-gray-200 dark:border-gray-700 p-8">
  <PokemonEvolutions pokemonId={pokemon.id} />
</div>
```

### 8. Style Evolution Buttons
**Styling approach**:
- Horizontal flex layout with gap
- Button-like appearance matching type badges
- Hover effects for interactivity
- Loading skeleton matches button dimensions
- Filter out current Pokemon from evolution list

## Why This Approach?

✅ **Non-blocking**: Main page loads immediately with Pokemon data
✅ **Parallel**: Evolutions fetch separately, don't delay stats/abilities
✅ **Pending UI**: Skeleton loader shows while fetching
✅ **Navigation**: Direct links to evolution detail pages
✅ **Error resilient**: Failed evolution fetch doesn't break page
✅ **Type-safe**: Full TypeScript coverage

## Files to Create/Modify

- ✏️ `app/types/pokemon.types.ts` - Add evolution types, update Pokemon type
- ✏️ `app/services/pokemon.service.ts` - Add 4 new functions
- ➕ `app/components/pokemon-evolutions.tsx` - New component
- ➕ `app/routes/api.evolutions.$id.tsx` - New API route
- ✏️ `app/routes.ts` - Add API route
- ✏️ `app/routes/pokemon.$id.tsx` - Add evolutions section

## API Endpoints Used

- Species: `GET /pokemon-species/{id}`
- Evolution chain: `GET /evolution-chain/{id}`
- Existing: `GET /pokemon/{id}`

## Example Evolution Chains

- Bulbasaur (#1): Bulbasaur → Ivysaur → Venusaur
- Pikachu (#25): Pichu → Pikachu → Raichu
- Eevee (#133): Eevee → [8 evolutions]

## Open Questions

1. ⚠️ **Display current Pokemon?** - Filter out or highlight?
2. **Multi-branch evolutions** - Eevee has 8. Show all in row or grid?
3. **Pre-evolutions** - Show baby/pre-evolved forms too?
4. **Loading skeleton style** - Match button size or generic?

## Implementation Status

**Status**: ⏳ Pending Review

Next: Review plan → Implement → Test with various Pokemon
