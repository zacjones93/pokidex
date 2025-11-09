// IndexedDB service for Pokemon notes
const DB_NAME = "pokidex-notes";
const DB_VERSION = 1;
const STORE_NAME = "notes";

// Simulate network delay for learning purposes
const SIMULATED_DELAY_MS = 800;

export interface PokemonNote {
  id: string;
  pokemonId: number;
  content: string;
  timestamp: number;
  createdAt: string;
}

let dbInstance: IDBDatabase | null = null;

/**
 * Simulate network delay for educational purposes
 */
function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
}

/**
 * Initialize IndexedDB database
 */
export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open IndexedDB"));
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create notes object store
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });

        // Create index on pokemonId for efficient queries
        objectStore.createIndex("pokemonId", "pokemonId", { unique: false });
      }
    };
  });
}

/**
 * Get all notes for a specific Pokemon
 */
export async function getNotesByPokemonId(
  pokemonId: number
): Promise<PokemonNote[]> {
  // Simulate async network request
  await simulateDelay();

  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const index = objectStore.index("pokemonId");
      const request = index.getAll(pokemonId);

      request.onsuccess = () => {
        const notes = request.result as PokemonNote[];
        // Sort by timestamp descending (newest first)
        notes.sort((a, b) => b.timestamp - a.timestamp);
        resolve(notes);
      };

      request.onerror = () => {
        reject(new Error("Failed to fetch notes"));
      };
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

/**
 * Add a new note for a Pokemon
 */
export async function addNote(
  pokemonId: number,
  content: string
): Promise<PokemonNote> {
  // Simulate async network request
  await simulateDelay();

  try {
    const db = await initDB();

    const note: PokemonNote = {
      id: crypto.randomUUID(),
      pokemonId,
      content,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.add(note);

      request.onsuccess = () => {
        resolve(note);
      };

      request.onerror = () => {
        reject(new Error("Failed to add note"));
      };
    });
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
}

/**
 * Delete a note by ID
 */
export async function deleteNote(id: string): Promise<void> {
  // Simulate async network request
  await simulateDelay();

  try {
    const db = await initDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to delete note"));
      };
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}
