import ListIsland from "../islands/List.tsx";
import Header from "../src/Header.tsx";

export default function List() {
  return (
    <div class="mx-auto max-w-screen-xl p-5">
      <Header />
      <ListIsland />
    </div>
  );
}
