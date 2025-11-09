import { useEffect } from "react";
import { Link, useFetcher } from "react-router";
import type { Evolution } from "~/types/pokemon.types";
import { getTypeColor } from "~/lib/type-colors";

interface PokemonEvolutionsProps {
  pokemonId: number;
  currentPokemonName: string;
  primaryType: string;
}

export function PokemonEvolutions({ pokemonId, currentPokemonName, primaryType }: PokemonEvolutionsProps) {
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
              to={`/home-outlet/${evo.id}`}
              preventScrollReset
              className={`
                px-4 py-3 rounded-lg font-medium text-sm text-white transition-all shadow-md
                ${getTypeColor(primaryType)}
                ${
                  isCurrent
                    ? "ring-2 ring-offset-2 ring-yellow-400"
                    : "hover:scale-105 hover:shadow-lg"
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
