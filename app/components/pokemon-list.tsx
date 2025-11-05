import { Link } from "react-router";
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

  return (
    <div className="w-full space-y-6">
      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemon.map((p) => (
          <Link
            key={p.id}
            to={`/pokemon/${p.id}`}
            className="group"
          >
            <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                #{p.id.toString().padStart(3, "0")}
              </div>
              <p className="font-semibold capitalize mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {p.name}
              </p>
            </div>
          </Link>
        ))}
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
            />
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
                >
                  {pageNum}
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
            />
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
