export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-600",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300",
  };
  return colors[type] || "bg-gray-500";
}

export function getTypeBackgroundGradient(type: string): string {
  const gradients: Record<string, string> = {
    normal: "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50",
    fire: "bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-50",
    water: "bg-gradient-to-br from-blue-200 via-blue-100 to-cyan-50",
    electric: "bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-50",
    grass: "bg-gradient-to-br from-green-200 via-green-100 to-emerald-50",
    ice: "bg-gradient-to-br from-cyan-200 via-cyan-100 to-blue-50",
    fighting: "bg-gradient-to-br from-red-300 via-red-100 to-orange-50",
    poison: "bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-50",
    ground: "bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-50",
    flying: "bg-gradient-to-br from-indigo-200 via-indigo-100 to-sky-50",
    psychic: "bg-gradient-to-br from-pink-200 via-pink-100 to-rose-50",
    bug: "bg-gradient-to-br from-lime-200 via-lime-100 to-green-50",
    rock: "bg-gradient-to-br from-stone-300 via-stone-100 to-amber-50",
    ghost: "bg-gradient-to-br from-purple-300 via-purple-100 to-indigo-50",
    dragon: "bg-gradient-to-br from-indigo-300 via-indigo-100 to-purple-50",
    dark: "bg-gradient-to-br from-gray-400 via-gray-200 to-slate-100",
    steel: "bg-gradient-to-br from-slate-300 via-slate-100 to-gray-50",
    fairy: "bg-gradient-to-br from-pink-200 via-pink-100 to-purple-50",
  };
  return gradients[type] || "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50";
}
