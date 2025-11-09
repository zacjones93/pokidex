# Pokemon Notes Feature Plan

## Overview
Add ability to save and view notes for individual Pokemon using IndexedDB for client-side persistence. Uses nested routing with outlets and deferred data loading.

## Architecture
Uses nested routes with outlet pattern for 3-column layout:
- `/home-outlet` - Pokemon list (left column, parent)
- `/home-outlet/:id` - Pokemon detail (middle column, child outlet)
- `/home-outlet/:id/notes` - Notes section (right column, nested child outlet)

**Layout**: `[List] [Detail] [Notes]` - 3 equal columns

Notes loaded via deferred loader with `<Await>` and `<Suspense>` for non-blocking UI.

## User Flow
1. User selects a Pokemon from the list (home-outlet page)
2. Pokemon detail displays on the right side
3. Below the Pokemon card and evolutions, notes outlet renders
4. Notes load asynchronously with Suspense fallback
5. User can:
   - View all existing notes for that Pokemon
   - Add new notes via a form
   - Delete existing notes
   - Notes persist across sessions (IndexedDB)

## Implementation Steps

### 1. IndexedDB Service Setup
**File**: `app/services/notes.service.ts`

**Responsibilities**:
- Initialize IndexedDB with database name "pokidex-notes"
- Create object store "notes" with schema:
  ```ts
  {
    id: string (auto-generated UUID)
    pokemonId: number
    content: string
    timestamp: number
    createdAt: string (ISO date)
  }
  ```
- Index on `pokemonId` for efficient queries
- Export functions:
  - `initDB()` - Initialize database
  - `getNotesByPokemonId(pokemonId: number)` - Get all notes for a Pokemon
  - `addNote(pokemonId: number, content: string)` - Add new note
  - `deleteNote(id: string)` - Delete note by ID

### 2. TypeScript Types
**File**: `app/types/notes.types.ts`

```ts
export interface PokemonNote {
  id: string;
  pokemonId: number;
  content: string;
  timestamp: number;
  createdAt: string;
}
```

### 3. Notes Route Component
**File**: `app/routes/home-outlet.$id.notes.tsx`

**Loader**:
- Returns deferred promise for notes data
- Loads notes from IndexedDB asynchronously
- Uses `defer()` from React Router

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const pokemonId = parseInt(params.id!, 10);

  // Return deferred data - notes load in background
  return defer({
    notes: getNotesByPokemonId(pokemonId),
    pokemonId,
  });
}
```

**Component**:
- Uses `<Await>` to unwrap deferred notes
- `<Suspense>` with loading skeleton fallback
- Display notes list in reverse chronological order
- Form with textarea for adding new notes
- Delete button for each note
- Empty state when no notes exist
- Optimistic UI updates via `useRevalidator()`

**UI Structure**:
```
┌─────────────────────────────────┐
│ Notes                           │
│ ┌─────────────────────────────┐ │
│ │ [Textarea]                  │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│ [Add Note Button]               │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Note content...             │ │
│ │ Jan 9, 2025 2:30 PM    [×]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Another note...             │ │
│ │ Jan 8, 2025 10:15 AM   [×]  │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### 4. Update Routes Configuration
**File**: `app/routes.ts`

**Changes**:
- Add nested route under `home-outlet.$id`
- Notes route as index child (auto-renders in outlet)

```tsx
route("home-outlet", "routes/home-outlet.tsx", [
  index("routes/home-outlet._index.tsx"),
  route(":id", "routes/home-outlet.$id.tsx", [
    index("routes/home-outlet.$id.notes.tsx"), // Auto-loads notes
  ]),
]),
```

### 5. Update Parent Layout (3 Columns)
**File**: `app/routes/home-outlet.tsx`

**Changes**:
- Change from 2-column to 3-column grid
- Left: Pokemon list (20% width)
- Middle: Detail outlet (40% width)
- Right: Notes outlet (40% width)

reference @../research/notes-page-mockup-3col.md

```tsx
export default function HomeOutlet({ loaderData }: Route.ComponentProps) {
  const { pokemon, page, totalPages, totalCount } = loaderData;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* 3-column grid */}
      <div className="grid lg:grid-cols-[300px_1fr_1fr] gap-6">
        {/* LEFT: Pokemon List */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Browse Pokémon
            </p>
          </div>

          {/* Pokemon buttons (2 columns) */}
          <div className="grid grid-cols-2 gap-4">
            {pokemon.map((p) => (
              <PokemonGridItem key={p.id} pokemon={p} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination>...</Pagination>
        </div>

        {/* MIDDLE: Pokemon Detail Outlet */}
        <div>
          <Outlet />
        </div>

        {/* RIGHT: Notes Outlet (handled by nested route) */}
      </div>
    </div>
  );
}
```

### 6. Update Detail Page (Middle Column)
**File**: `app/routes/home-outlet.$id.tsx`

**Changes**:
- Return detail card in middle column + outlet for notes in right column
- Use 2-column grid to position detail and notes side-by-side

```tsx
import { Outlet } from "react-router";

export default function PokemonDetailOutlet({ loaderData }: Route.ComponentProps) {
  const pokemon = loaderData;

  return (
    <>
      {/* Middle column content */}
      <div className="space-y-4">
        <PokemonCard pokemon={pokemon} variant="full" />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <PokemonEvolutions key={pokemon.id} pokemonId={pokemon.id} />
        </div>
      </div>

      {/* Right column: Notes outlet */}
      <div className="space-y-4">
        <Outlet />
      </div>
    </>
  );
}
```

**Note**: The detail route now returns a Fragment with TWO divs:
- First div: Detail card (middle column)
- Second div: Notes outlet (right column)

### 5. Utility Functions
**File**: `app/lib/notes-utils.ts`

**Functions**:
- `generateNoteId()` - Generate UUID for note IDs
- `formatNoteDate(timestamp: number)` - Format timestamp for display

## Technical Considerations

### IndexedDB Implementation
- Use `idb` library wrapper for promise-based API (optional, can use native)
- Handle browser compatibility (graceful degradation)
- Database version: 1
- Object store: auto-increment not needed (using UUIDs)

### State Management
- Client-side only (IndexedDB)
- Deferred loading via `defer()` in loader
- `<Await>` + `<Suspense>` for progressive rendering
- `useRevalidator()` to refresh notes after add/delete
- Client-side mutations (no server actions)

### Error Handling
- Try/catch around all IndexedDB operations
- Toast notifications for errors (optional)
- Fallback if IndexedDB unavailable

### Performance
- Index on `pokemonId` for O(log n) queries
- Lazy load notes (only when Pokemon selected)
- Debounce rapid add/delete operations

## File Structure
```
app/
├── services/
│   └── notes.service.ts              # New: IndexedDB operations
├── types/
│   └── notes.types.ts               # New: Note types
├── lib/
│   └── notes-utils.ts               # New: Helper functions
├── routes/
│   ├── home-outlet.$id.tsx          # Modified: Add <Outlet />
│   └── home-outlet.$id.notes.tsx    # New: Notes route with loader
└── routes.ts                         # Modified: Add nested route
```

## Dependencies
- No new dependencies required (using native IndexedDB)
- Optional: `idb` package for cleaner API (`npm install idb`)

## Future Enhancements (Out of Scope)
- Edit existing notes
- Rich text formatting
- Tags/categories for notes
- Search/filter notes
- Export notes to JSON/CSV
- Sync notes across devices (requires backend)
- Attachments/images in notes

## Testing Checklist
- [ ] Notes persist after page refresh
- [ ] Notes are Pokemon-specific (don't show on wrong Pokemon)
- [ ] Add note with empty content is prevented
- [ ] Delete note removes from UI and database
- [ ] Multiple notes display in correct order
- [ ] Works in incognito mode
- [ ] No memory leaks when switching Pokemon rapidly
- [ ] Handles database errors gracefully

## Implementation Order
1. ✅ Create IndexedDB service with basic CRUD (`notes.service.ts`) - `8ed523a`
2. ✅ Add simulated async delays to service for learning - `2a4a95b`
3. ✅ Create TypeScript types (`notes.types.ts`) - `338f3a1`
4. ✅ Create helper utilities (`notes-utils.ts`) - `1ea29af`
5. ✅ Update routes config (`routes.ts`) to add nested notes route - `81ee775`
6. ✅ Create notes route component (`home-outlet.$id.notes.tsx`) with:
   - Deferred loader (raw object with promise, v7 style)
   - Component with `<Suspense>` and `<Await>`
   - Form component with action handler
   - Intent-based actions (add/delete)
   - useNavigation() for pending states - `64c27ff`
7. ✅ Add `<Outlet />` to detail page (`home-outlet.$id.tsx`) - `8a2d8cb`
8. ✅ Update parent layout to 3-column grid - `3b3f86a`

## Code Example: Deferred Loading Pattern (React Router v7)

**Loader** (in `home-outlet.$id.notes.tsx`):
```tsx
import type { Route } from "./+types/home-outlet.$id.notes";
import { getNotesByPokemonId } from "~/services/notes.service";

// Note: defer() is deprecated in v7 - return raw objects with promises
export function loader({ params }: Route.LoaderArgs) {
  const pokemonId = parseInt(params.id!, 10);

  return {
    notes: getNotesByPokemonId(pokemonId), // Return promise directly
    pokemonId,
  };
}
```

**Action** (in `home-outlet.$id.notes.tsx`):
```tsx
import { redirect } from "react-router";
import { addNote, deleteNote } from "~/services/notes.service";

// Handle Form submissions with intent-based actions
export async function action({ request, params }: Route.ActionArgs) {
  const pokemonId = parseInt(params.id!, 10);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add") {
    const content = formData.get("content") as string;
    await addNote(pokemonId, content.trim());
  } else if (intent === "delete") {
    const noteId = formData.get("noteId") as string;
    await deleteNote(noteId);
  }

  return redirect(`/home-outlet/${pokemonId}`);
}
```

**Component** (in `home-outlet.$id.notes.tsx`):
```tsx
import { Suspense } from "react";
import { Await, Form, useNavigation } from "react-router";
import type { Route } from "./+types/home-outlet.$id.notes";

export default function PokemonNotes({ loaderData }: Route.ComponentProps) {
  const { notes, pokemonId } = loaderData;
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "add";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      {/* Form with action - automatic revalidation */}
      <Form method="post">
        <input type="hidden" name="intent" value="add" />
        <textarea name="content" disabled={isAdding} />
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Note"}
        </button>
      </Form>

      <Suspense fallback={<NotesLoadingSkeleton />}>
        <Await resolve={notes}>
          {(resolvedNotes) => (
            <NotesList notes={resolvedNotes} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
```
