import { Suspense, useRef } from "react";
import { Await, Form, useNavigation } from "react-router";
import { defer, redirect } from "react-router";
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

/**
 * Loader: Returns deferred promise for notes data
 * This allows the page to render immediately while notes load in background
 */
export async function loader({ params }: Route.LoaderArgs) {
  const pokemonId = parseInt(params.id!, 10);

  // Defer returns immediately, notes promise resolves later
  return defer({
    notes: getNotesByPokemonId(pokemonId), // Returns promise
    pokemonId,
  });
}

/**
 * Action: Handles form submissions for add/delete operations
 * Form component automatically calls this when submitted
 */
export async function action({ request, params }: Route.ActionArgs) {
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
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  // Check if form is being submitted
  const isAdding =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "add";

  const isDeleting =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "delete";

  return (
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

      {/* Notes List with Suspense */}
      <Suspense fallback={<NotesLoadingSkeleton />}>
        <Await resolve={notes}>
          {(resolvedNotes: PokemonNote[]) => (
            <NotesList
              notes={resolvedNotes}
              isDeleting={isDeleting}
              deletingNoteId={navigation.formData?.get("noteId") as string}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

/**
 * Loading skeleton shown while notes are loading
 */
function NotesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
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
