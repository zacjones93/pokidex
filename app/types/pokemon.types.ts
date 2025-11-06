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

// Pokemon detail types
export interface PokemonSprite {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: {
    name: string;
    url: string;
  };
}

// PokeAPI detail response structure
export interface PokemonApiDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: {
    name: string;
    url: string;
  };
}

// Evolution types
export interface PokemonSpecies {
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface ChainLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface Evolution {
  name: string;
  id: number;
}
