import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { Pokemon } from "~/data/pokemon";
import { stubPokemonData } from "~/data/pokemon";

const ITEMS_PER_PAGE = 10;

export function PokemonTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stubPokemonData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = stubPokemonData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="w-[100px]">Sprite</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Types</TableHead>
              <TableHead className="text-right">Height</TableHead>
              <TableHead className="text-right">Weight</TableHead>
              <TableHead>Abilities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((pokemon: Pokemon) => (
              <TableRow key={pokemon.id}>
                <TableCell className="font-medium">#{pokemon.id}</TableCell>
                <TableCell>
                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-12 h-12"
                  />
                </TableCell>
                <TableCell className="font-semibold">{pokemon.name}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">{pokemon.height}dm</TableCell>
                <TableCell className="text-right">{pokemon.weight}hg</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {pokemon.abilities.map((ability) => (
                      <span key={ability} className="text-sm text-gray-600 dark:text-gray-400">
                        {ability}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => goToPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages} ({stubPokemonData.length} total Pokémon)
      </div>
    </div>
  );
}
