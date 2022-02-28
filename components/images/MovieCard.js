import Image from 'next/image';
import NextLink from 'next/link';

export default function MovieCard({url, image}) {
  return (
    <NextLink href={url} target="_blank" rel="noopener noreferrer">
      <a>
        <Image
          src={`/static/images/movies/${image}.jpg`}
          alt=""
          width={150}
          height={200}
          layout="responsive"
        />
      </a>
    </NextLink>
  );
}
