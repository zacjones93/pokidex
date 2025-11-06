import type {
  PokemonApiListResponse,
  PokemonListItem,
  Pokemon,
  PokemonApiDetailResponse,
  PokemonSpecies,
  EvolutionChain,
  ChainLink,
  Evolution
} from "~/types/pokemon.types";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Extract Pokemon ID from the API URL
 * Example: "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 */
export function extractPokemonId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  const id = parts[parts.length - 1];
  return parseInt(id, 10);
}

/**
 * Fetch a paginated list of Pokemon
 */
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<{ pokemon: PokemonListItem[]; totalCount: number }> {
  try {
    const response = await fetch(
      `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    const data: PokemonApiListResponse = await response.json();

    const pokemon: PokemonListItem[] = data.results.map((result) => ({
      id: extractPokemonId(result.url),
      name: result.name,
    }));

    return {
      pokemon,
      totalCount: data.count,
    };
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
}

/**
 * Fetch a single Pokemon by ID or name
 */
export async function getPokemonById(id: string | number): Promise<Pokemon> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon not found: ${id}`);
      }
      throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    const data: PokemonApiDetailResponse = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites,
      types: data.types,
      stats: data.stats,
      abilities: data.abilities,
      species: data.species,
    };
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch Pokemon species data
 */
export async function getPokemonSpecies(id: string | number): Promise<PokemonSpecies> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species: ${response.statusText}`);
    }

    const data: PokemonSpecies = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon species ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch evolution chain data
 */
export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/evolution-chain/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain: ${response.statusText}`);
    }

    const data: EvolutionChain = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching evolution chain ${id}:`, error);
    throw error;
  }
}

/**
 * Parse evolution chain into flat array of evolutions
 */
export function parseEvolutionChain(chain: ChainLink): Evolution[] {
  const evolutions: Evolution[] = [];

  function traverse(link: ChainLink) {
    // Extract ID from species URL
    const id = extractPokemonId(link.species.url);
    evolutions.push({
      name: link.species.name,
      id,
    });

    // Recursively process evolutions
    link.evolves_to.forEach(traverse);
  }

  traverse(chain);
  return evolutions;
}

/**
 * Get all evolutions for a Pokemon
 */
export async function getEvolutions(pokemonId: string | number): Promise<Evolution[]> {
  try {
    // Get species data
    const species = await getPokemonSpecies(pokemonId);

    // Extract evolution chain ID from URL
    const chainId = extractPokemonId(species.evolution_chain.url);

    // Get evolution chain
    const evolutionChain = await getEvolutionChain(chainId);

    // Parse and return evolutions
    return parseEvolutionChain(evolutionChain.chain);
  } catch (error) {
    console.error(`Error fetching evolutions for Pokemon ${pokemonId}:`, error);
    // Return empty array on error so page doesn't break
    return [];
  }
}
