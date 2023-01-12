import { Mr_Dafoe } from "@next/font/google";
import { Avatar } from "./Avatar";

const mrDafoe = Mr_Dafoe({ weight: "400", subsets: ["latin"] });

export default function Author({ avatar, name, bio }) {
  return (
    <>
      <p className={`about text-zinc-800`}>Sobre mi</p>
      <Avatar url={avatar} />
      <div className='p-4'>
        <p>{bio}</p>
        <br/>
        <p className={`${mrDafoe.className} text-center`}> {name}</p>
        {/* Redes sociales en iconos redondos ? */}
      </div>
    </>
  );
}
