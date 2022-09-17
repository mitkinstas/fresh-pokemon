import useList from "../utils/list.ts";

export default function HeaderCounter() {
  const [list] = useList();

  return <div class="font-bold text-3xl">{list.length}</div>;
}
