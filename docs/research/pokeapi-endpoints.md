# PokeAPI Integration Guide

## Overview
Base URL: `https://pokeapi.co/api/v2`
No auth required, rate limiting recommended

---

## Key Endpoints

### 1. List Pokemon (Index Page)
```
GET /pokemon?limit=20&offset=0
```

**Response:**
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    }
  ]
}
```

**Pagination:**
- Default: 20 items
- Use `limit` & `offset` params
- `next`/`previous` URLs provided

---

### 2. Pokemon Detail
```
GET /pokemon/{id or name}
```

**Key Fields:**

| Field | Type | Use Case |
|-------|------|----------|
| `id` | int | Unique identifier |
| `name` | string | Display name |
| `height` | int | Size (decimetres) |
| `weight` | int | Mass (hectograms) |
| `base_experience` | int | XP value |
| `sprites` | object | Image URLs |
| `types` | array | Type(s) with slot |
| `stats` | array | Base stats (HP, Atk, etc) |
| `abilities` | array | Ability list + hidden flag |
| `moves` | array | Full moveset |

---

## Image Assets

### Primary Images
```json
{
  "sprites": {
    "front_default": "url",     // Main image
    "front_shiny": "url",       // Shiny variant
    "other": {
      "official-artwork": {
        "front_default": "url"  // High-quality art
      },
      "home": {
        "front_default": "url"  // Home quality
      }
    }
  }
}
```

**Recommended:** Use `sprites.other.official-artwork.front_default` for detail page

---

## Implementation Checklist

### Index Page
- [ ] Fetch `/pokemon?limit=X` with pagination
- [ ] Display name from `results[].name`
- [ ] Extract ID from `results[].url` or fetch detail for image
- [ ] Implement pagination with offset
- [ ] Optional: Cache list results

### Detail Page
- [ ] Fetch `/pokemon/{id}`
- [ ] Display official artwork sprite
- [ ] Show stats array (map to HP, Attack, Defense, etc)
- [ ] Render types with styling
- [ ] List abilities (mark hidden ones)
- [ ] Format height/weight (÷10 for metres, ÷10 for kg)

---

## Data Notes

1. **Types** have `slot` (1 or 2) for primary/secondary
2. **Stats** reference base values: hp, attack, defense, special-attack, special-defense, speed
3. **Abilities** include `is_hidden` flag
4. **Height/Weight** need conversion (÷10)
5. **No auth** but respect rate limits
6. **Encounters** available at `/pokemon/{id}/encounters`

---

## Response Pattern
All nested resources use `NamedAPIResource`:
```json
{
  "name": "string",
  "url": "https://pokeapi.co/api/v2/{resource}/{id}/"
}
```
