import type { Route } from "./+types/home-outlet";
import { Link, useNavigation, Outlet, useViewTransitionState } from "react-router";
import { useState } from "react";
import { getPokemonList } from "~/services/pokemon.service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

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

export default function HomeOutlet({ loaderData }: Route.ComponentProps) {
  const { pokemon, page, totalPages, totalCount } = loaderData;
  const navigation = useNavigation();
  const [clickedPage, setClickedPage] = useState<number | null>(null);

  const isNavigating = navigation.state === "loading";

  return (
    <div className="container mx-auto py-10 px-4">
      {/* 3-column grid: List (300px) | Detail (1fr) | Notes (1fr) */}
      <div className="grid lg:grid-cols-[300px_1fr_1fr] gap-6">
        {/* Left: Pokemon List */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Browse and explore Pokémon data
            </p>
          </div>

          {/* Pokemon Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pokemon.map((p) => {
              return (
                <PokemonGridItem key={p.id} pokemon={p} />
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? `/home-outlet?page=${page - 1}` : undefined}
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
                      href={`/home-outlet?page=${pageNum}`}
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
                  href={page < totalPages ? `/home-outlet?page=${page + 1}` : undefined}
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

        {/* Middle & Right: Outlet spans 2 columns (Detail + Notes) */}
        <Outlet />
      </div>
    </div>
  );
}

function PokemonGridItem({ pokemon }: { pokemon: { id: number; name: string } }) {
  const pokemonUrl = `/home-outlet/${pokemon.id}`;
  const isTransitioning = useViewTransitionState(pokemonUrl);

  return (
    <Link
      to={pokemonUrl}
      className="group"
      viewTransition
    >
      <div className={`border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all relative ${
        isTransitioning
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
          : ''
      }`}>
        {isTransitioning && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg animate-pulse" />
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono relative z-10">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>
        <p className="font-semibold capitalize mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 relative z-10">
          {pokemon.name}
        </p>
      </div>
    </Link>
  );
}
