import { useState, useEffect } from "react";
import type { Pokemon } from "~/types/pokemon.types";
import { getTypeColor, getTypeBackgroundGradient } from "~/lib/type-colors";

interface PokemonCardProps {
  pokemon: Pokemon;
  variant?: "full" | "compact";
  showSkeleton?: boolean;
}

export function PokemonCard({ pokemon, variant = "full", showSkeleton = false }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;
  const primaryType = pokemon.types[0].type.name;
  const hpStat = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;

  // Reset image loaded state when skeleton is shown or pokemon changes
  useEffect(() => {
    if (showSkeleton) {
      setImageLoaded(false);
    }
  }, [showSkeleton, pokemon.id]);

  if (variant === "compact") {
    return (
      <div
        className={`rounded-xl shadow-xl overflow-hidden border-4 border-yellow-400 ${getTypeBackgroundGradient(
          primaryType
        )} hover:scale-105 transition-transform`}
      >
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="text-lg font-bold text-gray-900 capitalize truncate">
              {pokemon.name}
            </div>
            <div className="text-sm font-bold text-red-600">HP {hpStat}</div>
          </div>

          {/* Pokemon Image */}
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 mb-2 border border-yellow-300/50">
            {showSkeleton ? (
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/90 to-white/40 rounded-lg animate-shimmer bg-[length:200%_100%]" />
              </div>
            ) : sprite ? (
              <div className="relative w-full aspect-square">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-white/50 rounded-lg" />
                )}
                <img
                  key={sprite}
                  src={sprite}
                  alt={pokemon.name}
                  className={`w-full h-full object-contain drop-shadow-lg transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            ) : (
              <div className="text-gray-400 text-xs">No image</div>
            )}
          </div>

          {/* Types */}
          <div className="flex gap-1 mb-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase text-white ${getTypeColor(
                  typeInfo.type.name
                )} shadow-sm`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-700 font-mono">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl shadow-2xl overflow-hidden border-8 border-yellow-400 ${getTypeBackgroundGradient(
        primaryType
      )}`}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 capitalize drop-shadow-sm">
              {pokemon.name}
            </h1>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase text-white ${getTypeColor(
                    typeInfo.type.name
                  )} shadow-md`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-600">HP {hpStat}</div>
          </div>
        </div>

        {/* Pokemon Image */}
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 mb-4 border-2 border-yellow-300/50 shadow-inner">
          {showSkeleton ? (
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/90 to-white/40 rounded-lg animate-shimmer bg-[length:200%_100%]" />
            </div>
          ) : sprite ? (
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/50 rounded-lg" />
              )}
              <img
                key={sprite}
                src={sprite}
                alt={pokemon.name}
                className={`w-full h-full object-contain drop-shadow-2xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
        </div>

        {/* Abilities */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4 border border-yellow-300/30">
          <div className="text-xs font-bold text-gray-700 mb-2 uppercase">
            Abilities
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((abilityInfo) => (
              <span
                key={abilityInfo.ability.name}
                className="text-sm text-gray-800 font-medium"
              >
                {capitalize(abilityInfo.ability.name.replace("-", " "))}
                {abilityInfo.is_hidden && (
                  <span className="text-xs text-gray-600 ml-1">(Hidden)</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-yellow-300/30">
          <div className="text-xs font-bold text-gray-700 mb-3 uppercase">
            Stats
          </div>
          <div className="space-y-2">
            {pokemon.stats
              .filter((s) => s.stat.name !== "hp")
              .map((statInfo) => {
                const statName = formatStatName(statInfo.stat.name);
                const maxStat = 255;
                const percentage = (statInfo.base_stat / maxStat) * 100;

                return (
                  <div key={statInfo.stat.name} className="flex items-center gap-3">
                    <div className="text-xs font-semibold text-gray-700 w-16 shrink-0">
                      {statName}
                    </div>
                    <div className="flex-1 bg-gray-200/50 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getTypeColor(
                          primaryType
                        )} transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold text-gray-800 w-8 text-right">
                      {statInfo.base_stat}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Physical Info */}
        <div className="mt-4 flex justify-around text-center bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-yellow-300/30">
          <div>
            <div className="text-xs text-gray-700 font-semibold">Height</div>
            <div className="text-sm font-bold text-gray-900">
              {(pokemon.height / 10).toFixed(1)}m
            </div>
          </div>
          <div className="border-l border-yellow-300/50"></div>
          <div>
            <div className="text-xs text-gray-700 font-semibold">Weight</div>
            <div className="text-sm font-bold text-gray-900">
              {(pokemon.weight / 10).toFixed(1)}kg
            </div>
          </div>
          <div className="border-l border-yellow-300/50"></div>
          <div>
            <div className="text-xs text-gray-700 font-semibold">No.</div>
            <div className="text-sm font-bold text-gray-900">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 p-2 text-center">
        <div className="text-xs font-bold text-yellow-900">
          ★ {capitalize(pokemon.name)} ★
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

