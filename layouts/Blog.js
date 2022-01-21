import Container from '../components/Container';

export default function BlogLayout({ children, post }) {
  return (
    <Container
      title={`${post.title} - Arik Chakma`}
      description={post.summary}
      image={`https://arikko.dev${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article>
        <h1>{post.title}</h1>
        <div className="prose md:prose-lg lg:prose-xl">{children}</div>
      </article>
    </Container>
  );
}
