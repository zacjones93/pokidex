/**
 * Generate UUID for note IDs
 */
export function generateNoteId(): string {
  return crypto.randomUUID();
}

/**
 * Format timestamp for display
 */
export function formatNoteDate(timestamp: number): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}
