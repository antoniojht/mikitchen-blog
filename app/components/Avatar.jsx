import Image from 'next/image';

export function Avatar({url}) {
  return (
    <Image
      src={url}
      width={100}
      height={100}
      style={{ borderRadius: 100 }}
      alt={"Avatar of the author of this post"}
    />
  );
}
