export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  sprite: string;
}

export const stubPokemonData: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["Grass", "Poison"],
    height: 7,
    weight: 69,
    abilities: ["Overgrow", "Chlorophyll"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  {
    id: 2,
    name: "Ivysaur",
    types: ["Grass", "Poison"],
    height: 10,
    weight: 130,
    abilities: ["Overgrow", "Chlorophyll"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
  },
  {
    id: 3,
    name: "Venusaur",
    types: ["Grass", "Poison"],
    height: 20,
    weight: 1000,
    abilities: ["Overgrow", "Chlorophyll"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  {
    id: 4,
    name: "Charmander",
    types: ["Fire"],
    height: 6,
    weight: 85,
    abilities: ["Blaze", "Solar Power"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    id: 5,
    name: "Charmeleon",
    types: ["Fire"],
    height: 11,
    weight: 190,
    abilities: ["Blaze", "Solar Power"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
  },
  {
    id: 6,
    name: "Charizard",
    types: ["Fire", "Flying"],
    height: 17,
    weight: 905,
    abilities: ["Blaze", "Solar Power"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
  {
    id: 7,
    name: "Squirtle",
    types: ["Water"],
    height: 5,
    weight: 90,
    abilities: ["Torrent", "Rain Dish"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
    id: 8,
    name: "Wartortle",
    types: ["Water"],
    height: 10,
    weight: 225,
    abilities: ["Torrent", "Rain Dish"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
  },
  {
    id: 9,
    name: "Blastoise",
    types: ["Water"],
    height: 16,
    weight: 855,
    abilities: ["Torrent", "Rain Dish"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
  },
  {
    id: 10,
    name: "Caterpie",
    types: ["Bug"],
    height: 3,
    weight: 29,
    abilities: ["Shield Dust", "Run Away"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
  },
  {
    id: 11,
    name: "Metapod",
    types: ["Bug"],
    height: 7,
    weight: 99,
    abilities: ["Shed Skin"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"
  },
  {
    id: 12,
    name: "Butterfree",
    types: ["Bug", "Flying"],
    height: 11,
    weight: 320,
    abilities: ["Compound Eyes", "Tinted Lens"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"
  },
  {
    id: 13,
    name: "Weedle",
    types: ["Bug", "Poison"],
    height: 3,
    weight: 32,
    abilities: ["Shield Dust", "Run Away"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png"
  },
  {
    id: 14,
    name: "Kakuna",
    types: ["Bug", "Poison"],
    height: 6,
    weight: 100,
    abilities: ["Shed Skin"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png"
  },
  {
    id: 15,
    name: "Beedrill",
    types: ["Bug", "Poison"],
    height: 10,
    weight: 295,
    abilities: ["Swarm", "Sniper"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
  },
  {
    id: 16,
    name: "Pidgey",
    types: ["Normal", "Flying"],
    height: 3,
    weight: 18,
    abilities: ["Keen Eye", "Tangled Feet"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png"
  },
  {
    id: 17,
    name: "Pidgeotto",
    types: ["Normal", "Flying"],
    height: 11,
    weight: 300,
    abilities: ["Keen Eye", "Tangled Feet"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png"
  },
  {
    id: 18,
    name: "Pidgeot",
    types: ["Normal", "Flying"],
    height: 15,
    weight: 395,
    abilities: ["Keen Eye", "Tangled Feet"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png"
  },
  {
    id: 19,
    name: "Rattata",
    types: ["Normal"],
    height: 3,
    weight: 35,
    abilities: ["Run Away", "Guts"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png"
  },
  {
    id: 20,
    name: "Raticate",
    types: ["Normal"],
    height: 7,
    weight: 185,
    abilities: ["Run Away", "Guts"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png"
  },
  {
    id: 21,
    name: "Spearow",
    types: ["Normal", "Flying"],
    height: 3,
    weight: 20,
    abilities: ["Keen Eye", "Sniper"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png"
  },
  {
    id: 22,
    name: "Fearow",
    types: ["Normal", "Flying"],
    height: 12,
    weight: 380,
    abilities: ["Keen Eye", "Sniper"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png"
  },
  {
    id: 23,
    name: "Ekans",
    types: ["Poison"],
    height: 20,
    weight: 69,
    abilities: ["Intimidate", "Shed Skin"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png"
  },
  {
    id: 24,
    name: "Arbok",
    types: ["Poison"],
    height: 35,
    weight: 650,
    abilities: ["Intimidate", "Shed Skin"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png"
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["Electric"],
    height: 4,
    weight: 60,
    abilities: ["Static", "Lightning Rod"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
];
