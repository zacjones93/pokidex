import type { Route } from "./+types/home-outlet";
import {
	Link,
	useNavigation,
	useNavigate,
	useLocation,
	useMatches,
	useSearchParams,
	Outlet,
	useViewTransitionState,
} from "react-router";
import { useState } from "react";
import { getPokemonList } from "~/services/pokemon.service";
import { Button } from "~/components/ui/button";
import { getTypeColor, getTypeBackgroundGradient } from "~/lib/type-colors";
import type { Pokemon } from "~/types/pokemon.types";
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
	const limit = 12;
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
	const navigate = useNavigate();
	const location = useLocation();
	const matches = useMatches();
	const [clickedPage, setClickedPage] = useState<number | null>(null);

	const isNavigating = navigation.state === "loading";
	const isPokemonActive = location.pathname !== "/" && location.pathname !== "/";

	// Get current Pokemon data from child route
	const pokemonDetailMatch = matches.find(m => m.id === "routes/home-outlet.$id");
	const currentPokemon = pokemonDetailMatch?.data as Pokemon | undefined;
	const primaryType = currentPokemon?.types[0].type.name;

	const handleRandomPokemon = () => {
		// Use max ID of 1010 (Gen 9) to avoid gaps in Pokemon IDs
		const MAX_POKEMON_ID = 1010;
		const limit = 12; // Must match loader limit
		const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
		const targetPage = Math.ceil(randomId / limit);
		navigate(`/${randomId}?page=${targetPage}`);
	};

	return (
		<div className="container mx-auto py-12 px-6 max-w-7xl">
			<div className="space-y-12">
				{/* Header Section */}
				<div className="space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
						<div className="space-y-2">
							<h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
								Pokédex
							</h1>
							<p className="text-base text-gray-600 dark:text-gray-400 font-medium">
								Explore {totalCount.toLocaleString()} Pokémon
							</p>
						</div>
						<Button
							onClick={handleRandomPokemon}
							variant="default"
							size="lg"
							className="gap-2 font-semibold"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Random Pokémon
						</Button>
					</div>
				</div>

				{/* Pokemon Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
					{pokemon.map((p) => {
						return (
							<PokemonGridItem
								key={p.id}
								pokemon={p}
								isActive={currentPokemon?.id === p.id}
								activeTypeColor={primaryType ? getTypeBackgroundGradient(primaryType) : undefined}
								currentPage={page}
							/>
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
								href={
									page < totalPages
										? `/?page=${page + 1}`
										: undefined
								}
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
				<div className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
					Page {page} of {totalPages} · {totalCount.toLocaleString()} total Pokémon
				</div>

				{/* Bottom: Detail + Notes side by side */}
				<Outlet />
			</div>
		</div>
	);
}

function PokemonGridItem({
	pokemon,
	isActive,
	activeTypeColor,
	currentPage,
}: {
	pokemon: { id: number; name: string };
	isActive?: boolean;
	activeTypeColor?: string;
	currentPage?: number;
}) {
	const pokemonUrl = `/${pokemon.id}${currentPage ? `?page=${currentPage}` : ""}`;
	const isTransitioning = useViewTransitionState(pokemonUrl);

	return (
		<Link to={pokemonUrl} className="group block" viewTransition>
			<div
				className={`
					border rounded-xl p-5 transition-all duration-200 relative
					${isActive && activeTypeColor
						? `${activeTypeColor} shadow-lg ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-white/50 scale-105`
						: isTransitioning
						? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md scale-[1.02]"
						: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:scale-[1.02]"
					}
				`}
			>
				{isTransitioning && !isActive && (
					<div className="absolute inset-0 bg-blue-500/10 rounded-xl animate-pulse" />
				)}
				<div
					className={`
						text-xs font-mono font-semibold relative z-10 mb-3
						${isActive ? "text-white/90" : "text-gray-500 dark:text-gray-400"}
					`}
				>
					#{pokemon.id.toString().padStart(3, "0")}
				</div>
				<p
					className={`
						text-base font-semibold capitalize relative z-10 leading-tight
						${isActive
							? "text-white"
							: "text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
						}
					`}
				>
					{pokemon.name}
				</p>
			</div>
		</Link>
	);
}
