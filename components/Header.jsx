import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <header className="h-16 bg-slate-50 drop-shadow-lg mb-5 flex place-content-between items-center px-8">
      <Link href="/">
        <b className="font-extrabold	">mi</b>Kitchen
      </Link>
      <div className="flex gap-3 items-center">
        <Link href="/categories">
          <p>Categorías</p>
        </Link>
        <Link href="/recipes">
          <p>Recetas</p>
        </Link>
        <Search />
      </div>
    </header>
  );
}
