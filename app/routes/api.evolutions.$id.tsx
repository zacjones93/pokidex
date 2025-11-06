import type { Route } from "./+types/api.evolutions.$id";
import { getEvolutions } from "~/services/pokemon.service";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Pokemon ID is required", { status: 400 });
  }

  try {
    const evolutions = await getEvolutions(id);
    return evolutions;
  } catch (error) {
    console.error(`Error loading evolutions for Pokemon ${id}:`, error);
    // Return empty array instead of throwing to prevent breaking the page
    return [];
  }
}
