export default function HomeOutletIndex() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 flex items-center justify-center h-full">
      <div className="text-center space-y-3">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          No Pokémon Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select a Pokémon from the list to view details
        </p>
      </div>
    </div>
  );
}
