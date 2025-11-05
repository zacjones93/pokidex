import type { Route } from "./+types/pokemon.$id";
import { Link } from "react-router";
import { getPokemonById } from "~/services/pokemon.service";

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

export default function PokemonDetail({ loaderData }: Route.ComponentProps) {
  const pokemon = loaderData;
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        ← Back to Pokédex
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
            {sprite ? (
              <img
                src={sprite}
                alt={pokemon.name}
                className="w-full max-w-sm"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                #{pokemon.id.toString().padStart(3, "0")}
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                {capitalize(pokemon.name)}
              </h1>
            </div>

            {/* Types */}
            <div>
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Type
              </h2>
              <div className="flex gap-2">
                {pokemon.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(
                      typeInfo.type.name
                    )}`}
                  >
                    {capitalize(typeInfo.type.name)}
                  </span>
                ))}
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Height
                </div>
                <div className="text-xl font-semibold">
                  {(pokemon.height / 10).toFixed(1)} m
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Weight
                </div>
                <div className="text-xl font-semibold">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((abilityInfo) => (
                  <span
                    key={abilityInfo.ability.name}
                    className="px-3 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {capitalize(abilityInfo.ability.name.replace("-", " "))}
                    {abilityInfo.is_hidden && (
                      <span className="text-xs text-gray-500 ml-1">
                        (Hidden)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-xl font-semibold mb-4">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((statInfo) => {
              const statName = formatStatName(statInfo.stat.name);
              const maxStat = 255;
              const percentage = (statInfo.base_stat / maxStat) * 100;

              return (
                <div key={statInfo.stat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {statName}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {statInfo.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatStatName(stat: string): string {
  const statMap: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };
  return statMap[stat] || capitalize(stat);
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-600",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300",
  };
  return colors[type] || "bg-gray-500";
}
