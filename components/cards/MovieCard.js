import Image from 'next/image';
import NextLink from 'next/link';

export default function MovieCard({ url, image, alt }) {
  return (
    <NextLink href={url} target="_blank" rel="noopener noreferrer">
      <a className="rounded-md transition-all hover:scale-105">
        <Image
          src={`/static/images/movies/${image}.jpg`}
          alt={alt}
          width={150}
          height={200}
          layout="responsive"
          className="rounded"
        />
      </a>
    </NextLink>
  );
}
