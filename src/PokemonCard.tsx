import type { Pokemon } from "../utils/pokemon.ts";

import { DB, TOKEN } from "../utils/env.ts";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div class="rounded-xl border-1 p-5">
      <div class="text-2xl font-bold mb-2">{pokemon.name}</div>
      <img
        src={`https://${DB}.directus.app/assets/${pokemon.image}?access_token=${TOKEN}`}
      />
      <div class="mt-5 flex">
        <a class="underline flex-grow" href={`/pokemon/${pokemon.id}`}>
          View Details...
        </a>
      </div>
    </div>
  );
}
