import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 bg-slate-50 drop-shadow-lg mb-5 flex place-content-between items-center px-8">
      <Link href="/">
        <b className="font-extrabold	">mi</b>Kitchen
      </Link>
    </header>
  );
}
