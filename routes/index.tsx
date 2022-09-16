import { Handlers, PageProps } from "$fresh/server.ts";

import type { Pokemon } from "../utils/pokemon.ts";
import { DB, TOKEN } from "../utils/env.ts";

import PokemonCard from "../src/PokemonCard.tsx";

export const handler: Handlers<{ pokemon: Pokemon; query: string }> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const filter = query.length
      ? `&filter[name][_contains]=${encodeURIComponent(query)}`
      : "";

    const pokemon = await fetch(
      `https://${DB}.directus.app/items/pokemon?access_token=${TOKEN}&limit=9${filter}`
    ).then((res) => res.json());

    if (!pokemon) {
      return new Response("Pokemon search failed", { status: 404 });
    }

    return ctx.render({ pokemon: pokemon.data, query });
  },
};

export default function Home(
  props: PageProps<{ pokemon: Pokemon[]; query: string }>
) {
  const { pokemon, query } = props.data;
  return (
    <div class="mx-auto max-w-screen-xl p-5">
      <form class="flex w-full gap-2 mb-10">
        <input
          type="text"
          name="q"
          value={query}
          class="flex-grow w-full shadow-sm focus:ring-indigo-800 focus:border-indigo-800 block"
        />
        <button
          type="submit"
          class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs bg-indigo-800 text-white rounded-sm"
        >
          Search
        </button>
      </form>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 mt-5 gap-2">
        {pokemon.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
}
