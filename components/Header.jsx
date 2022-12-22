import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 bg-slate-50 drop-shadow-lg mb-5 flex place-content-between items-center px-8">
      <Link href="/">
        <b className="font-extrabold	">mi</b>Kitchen
      </Link>
      <div className='flex gap-3'>
        <Link href="/categories">
          <p>Categorías</p>
        </Link>
        <Link href="/recipes">
          <p>Recetas</p>
        </Link>
      </div>
    </header>
  );
}
