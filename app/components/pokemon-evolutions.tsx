import { useEffect } from "react";
import { Link, useFetcher } from "react-router";
import type { Evolution } from "~/types/pokemon.types";

interface PokemonEvolutionsProps {
  pokemonId: number;
  currentPokemonName: string;
}

export function PokemonEvolutions({ pokemonId, currentPokemonName }: PokemonEvolutionsProps) {
  const fetcher = useFetcher<Evolution[]>();

  useEffect(() => {
    // Load evolutions after component mounts
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(`/api/evolutions/${pokemonId}`);
    }
  }, [pokemonId, fetcher]);

  // Show loading skeleton while fetching
  if (fetcher.state === "loading" || !fetcher.data) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Evolutions</h2>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // Filter out current Pokemon and check if there are other evolutions
  const otherEvolutions = fetcher.data.filter(
    (evo) => evo.name.toLowerCase() !== currentPokemonName.toLowerCase()
  );

  // Don't show section if no other evolutions exist
  if (otherEvolutions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Evolution Chain</h2>
      <div className="flex flex-wrap gap-3">
        {fetcher.data.map((evo) => {
          const isCurrent = evo.name.toLowerCase() === currentPokemonName.toLowerCase();

          return (
            <Link
              key={evo.id}
              to={`/pokemon/${evo.id}`}
              className={`
                px-4 py-3 rounded-lg font-medium text-sm transition-all
                ${
                  isCurrent
                    ? "bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
            >
              {capitalize(evo.name)}
              {isCurrent && <span className="ml-2 text-xs">(Current)</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
