// Pokemon list item from the index endpoint
export interface PokemonListItem {
  id: number;
  name: string;
}

// PokeAPI list response structure
export interface PokemonApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// Loader data structure for the index page
export interface PokemonIndexData {
  pokemon: PokemonListItem[];
  page: number;
  totalPages: number;
  totalCount: number;
}
