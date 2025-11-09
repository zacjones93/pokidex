import type { Route } from "./+types/home-outlet.$id";
import { Outlet, useNavigation } from "react-router";
import { getPokemonById } from "~/services/pokemon.service";
import { PokemonEvolutions } from "~/components/pokemon-evolutions";
import { PokemonCard } from "~/components/pokemon-card";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Pokemon Not Found" }];
  }

  const types = data.types.map((t) => t.type.name).join(", ");
  return [
    { title: `${capitalize(data.name)} - Pokidex` },
    { name: "description", content: `${capitalize(data.name)} - Type: ${types}` },
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

export default function PokemonDetailOutlet({ loaderData }: Route.ComponentProps) {
  const pokemon = loaderData;
  const navigation = useNavigation();
  const isTransitioning = navigation.state === "loading";
  const primaryType = pokemon.types[0].type.name;

  return (
    <>
      {/* Middle column: Pokemon detail */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <PokemonEvolutions
            key={pokemon.id}
            pokemonId={pokemon.id}
            currentPokemonName={pokemon.name}
            primaryType={primaryType}
          />
        </div>

        <PokemonCard pokemon={pokemon} variant="full" showSkeleton={isTransitioning} />
      </div>

      {/* Right column: Notes outlet */}
      <div className="space-y-4">
        <Outlet />
      </div>
    </>
  );
}

// Helper functions
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
