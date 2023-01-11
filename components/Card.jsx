import Link from "next/link";
import Image from "next/image";

export function Card({ title, src, slug, dificulty, total_time }) {
  return (
    <Link
      href={slug}
      className="relative cursor-pointer rounded-lg drop-shadow-md"
      style={{ width: "13rem", height: "14.875rem" }}
    >
      <Image
        src={src}
        alt={`Image for ${title}`}
        className="object-center object-cover w-full h-full rounded-lg"
        fill={true}
        priority={true}
      />

      <div className="bg-white p-4 absolute bottom-0 w-full rounded-b-lg">
        <b>{title}</b>
        <br />
        <div className='flex justify-between'>
          <span className={`text-slate-500 capitalize ${dificulty} rounded-lg px-3`}>{dificulty}</span>
          <span className='text-slate-500'>Tiempo: {total_time}&quot;</span>
        </div>
      </div>
    </Link>
  );
}
