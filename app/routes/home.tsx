import type { Route } from "./+types/home";
import { PokemonTable } from "~/components/pokemon-table";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokidex" },
    { name: "description", content: "Welcome to Pokidex!" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse and explore Pokémon data
          </p>
        </div>
        <PokemonTable />
      </div>
    </div>
  );
}
