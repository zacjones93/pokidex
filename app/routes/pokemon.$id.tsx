import type { Route } from "./+types/pokemon.$id";
import { Link, useNavigation } from "react-router";
import { getPokemonById } from "~/services/pokemon.service";
import { PokemonEvolutions } from "~/components/pokemon-evolutions";
import { PokemonCard } from "~/components/pokemon-card";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Pokemon Not Found" }];
  }

  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const types = data.types.map((t) => t.type.name).join(", ");
  return [
    { title: `${name} - Pokidex` },
    { name: "description", content: `${name} - Type: ${types}` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Pokemon ID is required", { status: 400 });
  }

  try {
    const pokemon = await getPokemonById(id);
    return pokemon;
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new Response("Pokemon not found", { status: 404 });
    }
    throw new Response("Failed to load Pokemon", { status: 500 });
  }
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  };
}

export default function PokemonDetail({ loaderData }: Route.ComponentProps) {
  const pokemon = loaderData;
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const primaryType = pokemon.types[0].type.name;

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        ← Back to Pokédex
        {isNavigating && (
          <div className="w-4 h-4 border-2 border-gray-600 dark:border-gray-400 border-t-transparent rounded-full animate-spin" />
        )}
      </Link>

      {/* Pokemon Card */}
      <div className="max-w-md mx-auto">
        <PokemonCard pokemon={pokemon} variant="full" />

        {/* Evolutions Section - Outside Card */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <PokemonEvolutions
            pokemonId={pokemon.id}
            currentPokemonName={pokemon.name}
            primaryType={primaryType}
          />
        </div>
      </div>
    </div>
  );
}

