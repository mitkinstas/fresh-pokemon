import { Handlers, PageProps } from "$fresh/server.ts";

import type { Pokemon } from "../../utils/pokemon.ts";
import { DB, TOKEN } from "../../utils/env.ts";

export const handler: Handlers<{ pokemon: Pokemon }> = {
  async GET(req, ctx) {
    const pokemon = await fetch(
      `https://${DB}.directus.app/items/pokemon/${ctx.params.id}?access_token=${TOKEN}`
    ).then((res) => res.json());

    if (!pokemon) {
      return new Response("Pokemon search failed", { status: 404 });
    }

    return ctx.render({ pokemon: pokemon.data });
  },
};

export default function Details(props: PageProps<{ pokemon: Pokemon }>) {
  const { pokemon } = props.data;
  return (
    <div class="mx-auto max-w-screen-xl p-5">
      <div class="grid xs:grid:cols-1 md:grid-cols-2 gap-5">
        <img
          class="w-full"
          src={`https://${DB}.directus.app/assets/${pokemon.image}?access_token=${TOKEN}`}
        />
        <div>
          <div class="text-5xl font-bold">{pokemon.name}</div>
          <div class="text-3xl font-italic">
            {pokemon.type ?? [].join(", ")}
          </div>
          <div class="grid grid-cols-2 mt-5 text-3xl">
            {["hp", "speed", "attack", "defense", "special_attack"].map(
              (stat) => (
                <>
                  <div class="font-bold">{stat}</div>
                  <div>{pokemon[stat as keyof Pokemon]}</div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
