import HeaderCounter from "../islands/HeaderCounter.tsx";

export default function Header() {
  return (
    <div class="p-5 bg-blue-500 text-white mb-5 flex">
      <a class="flex-grow font-bold" href="/">
        <h1 class="text-4xl">Pokemon</h1>
      </a>
      <a href="/list">
        <HeaderCounter />
      </a>
    </div>
  );
}
