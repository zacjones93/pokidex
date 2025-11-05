# Pokemon API Integration Plan

## Objective
Replace stub data in `PokemonTable` component with live PokeAPI data using React Router framework mode data loading patterns.

**Index Page Strategy:** Use limited data from list endpoint only (name + ID). Save detailed data (sprites, types, abilities, stats) for detail page.

---

## Current State Analysis

**Component:** `app/components/pokemon-table.tsx`
- Uses `stubPokemonData` from `~/data/pokemon`
- Client-side pagination with `useState`
- Displays: ID, sprite, name, types, height, weight, abilities
- 10 items per page

**Issues:**
- Static stub data
- Client-side pagination doesn't scale
- No real API integration

**Design Decision:** Simplify index to show only name + ID (clickable links). List endpoint lacks sprites/types/abilities - save those for detail page.

---

## React Router Framework Approach

### 1. Route Loader Pattern
Use `loader` function for server-side data fetching:
```typescript
// In route file (e.g., app/routes/home.tsx)
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  // Single fetch from PokeAPI list endpoint
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();

  // Transform results to include extracted ID
  const pokemon = data.results.map((p: any) => ({
    name: p.name,
    id: parseInt(p.url.split('/').filter(Boolean).pop()!),
  }));

  return {
    pokemon,
    page,
    totalCount: data.count,
    totalPages: Math.ceil(data.count / limit)
  };
}
```

### 2. Data Transformation Layer
Simple transformation from list endpoint:

**API Response Structure:**
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }
  ]
}
```

**Transformation:**
- Extract ID from URL: `url.split('/').filter(Boolean).pop()` → "1"
- Capitalize name for display: "bulbasaur" → "Bulbasaur"
- Create link to detail page: `/pokemon/{id}`

**Output Format:**
```typescript
{
  id: number;
  name: string;
}
```

### 3. Component Update
Simplify to show list of Pokemon with links to detail:
```typescript
export function PokemonList({ loaderData }: Route.ComponentProps) {
  const { pokemon, page, totalPages, totalCount } = loaderData;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.id}`}>
            <div className="border rounded p-4 hover:bg-gray-50">
              <span className="text-gray-500">#{p.id}</span>
              <p className="font-semibold capitalize">{p.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination with Link components */}
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
```

---

## Implementation Steps

### Phase 1: Types & Service Layer ✅
- [x] Create `app/types/pokemon.types.ts` - **Commit: `448e9ac`**
  - Define `PokemonListItem` type: `{ id: number; name: string }`
  - Define `PokemonListResponse` from API
- [x] Create `app/services/pokemon.service.ts` - **Commit: `7ce3e2a`**
  - Implement `getPokemonList(limit, offset)` - single fetch
  - Add ID extraction utility
  - Error handling

### Phase 2: Route Loader ✅
- [x] Add `loader` to `app/routes/home.tsx` - **Commit: `a503928`**
- [x] Extract `page` from URL search params
- [x] Calculate `limit=20` and `offset`
- [x] Fetch list, transform to extract IDs
- [x] Return `{ pokemon, page, totalPages, totalCount }`

### Phase 3: Component Simplification ✅
- [x] Rename/refactor `PokemonTable` → `PokemonList` - **Commit: `4bec13d`**
- [x] Remove all stub data references
- [x] Replace table with grid layout
- [x] Each item: clickable card with ID + name
- [x] Link to `/pokemon/{id}` for detail
- [x] Update pagination to use `<Link to="/?page=X">`

### Phase 4: Polish
- [ ] Add error boundary
- [ ] Loading states (if needed)
- [x] Responsive grid (2 cols mobile, 5 cols XL)
- [x] Hover states on cards

---

## Data Fetching Strategy

### ✅ Chosen: List Only (Fast & Simple)
```
GET /pokemon?limit=20&offset=0
```
**Pros:**
- Single request per page load
- Fast, no N+1 problem
- Simple to implement
- Suitable for index/browse view

**Cons:**
- No images/types/abilities on index
- Detail page required for full data

**Rationale:** Index page is for browsing/finding Pokemon. Users click through to detail page for full information. Keeps index fast and scalable.

### ❌ Rejected: List + Individual Details
```
GET /pokemon?limit=20&offset=0          # List
GET /pokemon/1                          # Detail for each
...
GET /pokemon/20                         # 21 total requests
```
**Why not:** N+1 query problem, slow page loads, unnecessary for index view

### Future: Detail Page Strategy
Detail page will use:
```
GET /pokemon/{id}
```
Full response includes sprites, types, abilities, stats, moves - everything needed for comprehensive view.

---

## URL Structure

**Index/List Page:**
```
/                           # Page 1 (default)
/?page=2                    # Page 2
/?page=5                    # Page 5
```

**Future Detail Page:**
```
/pokemon/1                  # Bulbasaur detail
/pokemon/pikachu            # By name
```

---

## Error Handling

**Loader Level:**
```typescript
export async function loader({ request }: Route.LoaderArgs) {
  try {
    // fetch...
  } catch (error) {
    throw new Response("Failed to load Pokemon", { status: 500 });
  }
}
```

**Component Level:**
- Use ErrorBoundary export from route
- Display user-friendly message
- Retry button

---

## Testing Checklist

- [ ] Pagination works (prev/next, page links)
- [ ] Data shows ID + name correctly
- [ ] Cards clickable, navigate to `/pokemon/{id}`
- [ ] Page 1 has no previous button/disabled state
- [ ] Last page has no next button/disabled state
- [ ] Invalid page numbers handled gracefully
- [ ] API errors show error boundary
- [ ] Total count displayed correctly
- [ ] Responsive grid (mobile vs desktop)

---

## Files to Modify/Create

1. **Create:** `app/types/pokemon.types.ts` - Simple types (`PokemonListItem`)
2. **Create:** `app/services/pokemon.service.ts` - List fetching + ID extraction
3. **Modify:** `app/routes/home.tsx` - Add loader function
4. **Refactor:** `app/components/pokemon-table.tsx` → `pokemon-list.tsx`
   - Grid layout instead of table
   - Cards with links to detail
   - Accept loaderData prop
5. **Optional:** Error boundary component

---

## React Router Specific Patterns

### Loader Function
```typescript
import type { Route } from "./+types/home";

export async function loader({ request }: Route.LoaderArgs) {
  // Server-side fetch
  // Code here is removed from client bundle
  return data;
}
```

### Component Props
```typescript
export default function Home({ loaderData }: Route.ComponentProps) {
  // Auto-typed loaderData
  return <PokemonTable data={loaderData} />;
}
```

### Navigation for Pagination
```typescript
import { Link } from "react-router";

<Link to={`?page=${nextPage}`}>Next</Link>
```

Or programmatic:
```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate(`?page=${page}`);
```

---

## Next Steps After Index Page

1. **Detail Page** (Next priority)
   - Route: `/pokemon/{id}`
   - Fetch full Pokemon data
   - Display sprites, types, abilities, stats, moves
   - Back to index navigation

2. **Future Enhancements**
   - Search by name
   - Filter by type
   - Sort options
   - Infinite scroll
   - Favorites (localStorage)
