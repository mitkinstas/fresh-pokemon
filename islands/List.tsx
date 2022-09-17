import useList from "../utils/list.ts";
import PokemonCard from "../src/PokemonCard.tsx";

export default function ListIsland() {
  const [list] = useList();

  return (
    <div class="grid sm: grid-cols-2 md:grid-cols-3 mt-5 gap-2">
      {list.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}
