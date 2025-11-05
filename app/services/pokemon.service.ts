import type { PokemonApiListResponse, PokemonListItem } from "~/types/pokemon.types";

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
