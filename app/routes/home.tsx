import type { Route } from "./+types/home";
import { PokemonList } from "~/components/pokemon-list";
import { getPokemonList } from "~/services/pokemon.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokidex" },
    { name: "description", content: "Welcome to Pokidex!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const { pokemon, totalCount } = await getPokemonList(limit, offset);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      pokemon,
      page,
      totalPages,
      totalCount,
    };
  } catch (error) {
    throw new Response("Failed to load Pokemon", { status: 500 });
  }
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=300, s-maxage=3600",
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse and explore Pokémon data
          </p>
        </div>
        <PokemonList loaderData={loaderData} />
      </div>
    </div>
  );
}
