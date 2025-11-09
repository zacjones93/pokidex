import { useRef } from "react";
import { Form, useNavigation, redirect, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/home-outlet.$id.notes";
import {
	getNotesByPokemonId,
	addNote,
	deleteNote,
} from "~/services/notes.service";
import type { PokemonNote } from "~/types/notes.types";
import { formatNoteDate } from "~/lib/notes-utils";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { PokemonEvolutions } from "~/components/pokemon-evolutions";
import type { Pokemon } from "~/types/pokemon.types";

/**
 * Client Loader: Fetch notes data from IndexedDB (browser-only)
 * Async operations demonstrate loader behavior with simulated delays
 */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const pokemonId = parseInt(params.id!, 10);

	// Await notes to demonstrate async behavior with 800ms delay
	const notes = await getNotesByPokemonId(pokemonId);

	return {
		notes,
		pokemonId,
	};
}

/**
 * Client Action: Handles form submissions for add/delete operations
 * Runs in browser only (IndexedDB requires browser environment)
 */
export async function clientAction({
	request,
	params,
}: Route.ClientActionArgs) {
	const pokemonId = parseInt(params.id!, 10);
	const formData = await request.formData();

	const intent = formData.get("intent");

	if (intent === "add") {
		const content = formData.get("content") as string;

		if (!content || content.trim() === "") {
			return { error: "Note content cannot be empty" };
		}

		await addNote(pokemonId, content.trim());
	} else if (intent === "delete") {
		const noteId = formData.get("noteId") as string;
		await deleteNote(noteId);
	}

	// Redirect back to same route to trigger revalidation
	return redirect(`/home-outlet/${pokemonId}`);
}

/**
 * Notes component with deferred loading and Form actions
 */
export default function PokemonNotes({ loaderData }: Route.ComponentProps) {
	const { notes, pokemonId } = loaderData;
	const pokemon = useRouteLoaderData<Pokemon>("routes/home-outlet.$id");
	const navigation = useNavigation();
	const formRef = useRef<HTMLFormElement>(null);

	// Check if form is being submitted
	const isAdding =
		navigation.state === "submitting" &&
		navigation.formData?.get("intent") === "add";

	const isDeleting =
		navigation.state === "submitting" &&
		navigation.formData?.get("intent") === "delete";

	const primaryType = pokemon?.types[0].type.name;

	return (
		<div className="space-y-4">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
				<h2 className="text-2xl font-bold mb-4">Notes</h2>

				{/* Add Note Form */}
				<Form method="post" className="mb-6" ref={formRef}>
					<input type="hidden" name="intent" value="add" />

					<Textarea
						name="content"
						placeholder="Add a note about this Pokémon..."
						className="mb-3"
						rows={4}
						disabled={isAdding}
					/>

					<Button type="submit" disabled={isAdding} className="w-full">
						{isAdding ? "Adding Note..." : "Add Note"}
					</Button>
				</Form>

				{/* Notes List */}
				<NotesList
					notes={notes}
					isDeleting={isDeleting}
					deletingNoteId={navigation.formData?.get("noteId") as string}
				/>
			</div>

			{/* Pokemon Evolutions */}
			{pokemon && (
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
					<PokemonEvolutions
						pokemonId={pokemon.id}
						currentPokemonName={pokemon.name}
						primaryType={primaryType!}
					/>
				</div>
			)}
		</div>
	);
}

/**
 * Notes list component
 */
function NotesList({
	notes,
	isDeleting,
	deletingNoteId,
}: {
	notes: PokemonNote[];
	isDeleting: boolean;
	deletingNoteId: string | null;
}) {
	if (notes.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500 dark:text-gray-400">
				<p>No notes yet. Add your first note above!</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{notes.map((note) => {
				const isDeletingThis = isDeleting && deletingNoteId === note.id;

				return (
					<div
						key={note.id}
						className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 ${
							isDeletingThis ? "opacity-50" : ""
						}`}
					>
						<p className="text-gray-800 dark:text-gray-200 mb-2 whitespace-pre-wrap">
							{note.content}
						</p>

						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{formatNoteDate(note.timestamp)}
							</span>

							<Form method="post">
								<input type="hidden" name="intent" value="delete" />
								<input type="hidden" name="noteId" value={note.id} />

								<Button
									type="submit"
									variant="ghost"
									size="sm"
									disabled={isDeletingThis}
									className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
								>
									{isDeletingThis ? "Deleting..." : "Delete"}
								</Button>
							</Form>
						</div>
					</div>
				);
			})}
		</div>
	);
}
