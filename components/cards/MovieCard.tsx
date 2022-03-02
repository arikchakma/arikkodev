import Image from 'next/image';

export default function MovieCard({ url, image, alt }) {
  return (
    <a
      className="rounded-md transition-all hover:scale-105"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={`/static/images/movies/${image}.jpg`}
        alt={alt}
        width={150}
        height={200}
        layout="responsive"
        className="rounded"
      />
    </a>
  );
}
