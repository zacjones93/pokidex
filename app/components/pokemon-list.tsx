import { Link, useNavigation } from "react-router";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { PokemonIndexData } from "~/types/pokemon.types";

interface PokemonListProps {
  loaderData: PokemonIndexData;
}

export function PokemonList({ loaderData }: PokemonListProps) {
  const { pokemon, page, totalPages, totalCount } = loaderData;
  const navigation = useNavigation();
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [clickedPage, setClickedPage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const isNavigating = navigation.state === "loading";

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className="w-full space-y-6">
      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemon.map((p) => {
          const isLoading = isNavigating && clickedId === p.id;
          const imageLoaded = loadedImages.has(p.id);
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;

          return (
            <Link
              key={p.id}
              to={`/pokemon/${p.id}`}
              className="group"
              onClick={() => setClickedId(p.id)}
            >
              <div className="rounded-xl shadow-md hover:shadow-xl overflow-hidden border-4 border-gray-200 hover:border-yellow-400 bg-gradient-to-br from-gray-100 via-white to-gray-50 transition-all hover:scale-105">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-xl flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-mono text-gray-500">
                      #{p.id.toString().padStart(3, "0")}
                    </div>
                  </div>

                  {/* Pokemon Image */}
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 mb-2 border border-gray-200">
                    <div className="relative w-full aspect-square">
                      {!imageLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg" />
                      )}
                      <img
                        src={spriteUrl}
                        alt={p.name}
                        className={`w-full h-full object-contain drop-shadow-lg transition-opacity duration-300 ${
                          imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(p.id)}
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p className="font-bold capitalize text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {p.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page > 1 ? `/?page=${page - 1}` : undefined}
              className={
                page === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => setClickedPage(page - 1)}
            />
            {isNavigating && clickedPage === page - 1 && (
              <div className="ml-2 w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            )}
          </PaginationItem>

          {/* Show first page, pages around current, and last page */}
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 7) {
              pageNum = i + 1;
            } else if (page <= 4) {
              pageNum = i + 1;
            } else if (page >= totalPages - 3) {
              pageNum = totalPages - 6 + i;
            } else {
              pageNum = page - 3 + i;
            }

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/?page=${pageNum}`}
                  isActive={page === pageNum}
                  className="cursor-pointer"
                  onClick={() => setClickedPage(pageNum)}
                >
                  {pageNum}
                  {isNavigating && clickedPage === pageNum && (
                    <span className="ml-2 inline-block w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                  )}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={page < totalPages ? `/?page=${page + 1}` : undefined}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => setClickedPage(page + 1)}
            />
            {isNavigating && clickedPage === page + 1 && (
              <div className="ml-2 w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Page {page} of {totalPages} ({totalCount.toLocaleString()} total Pokémon)
      </div>
    </div>
  );
}
