import { format, parseISO } from 'date-fns';

import Container from '@/components/Container';
import Divider from '@/components/Divider';
import Newsletter from '@/components/Newsletter';

export default function BlogLayout({ children, post }) {
  return (
    <Container
      title={`${post.title} - Arik Chakma`}
      description={post.summary}
      image={`https://arikko.dev${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="mt-28">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {format(parseISO(post.publishedAt), 'dd MMMM, yyyy')}
          </p>
          <p className="text-sm text-gray-400">{post.readingTime.text}</p>
        </div>
        <div className="prose mt-8 dark:prose-dark">{children}</div>
      </article>
      <Newsletter blog={true} />
      <Divider />
    </Container>
  );
}
