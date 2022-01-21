import React from 'react';
import { allBlogs } from '.contentlayer/data';
import { pick } from 'contentlayer/client';

export default function index({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <>
          <h1 key={post.title}>{post.title}</h1>
          <a href={`blog/${post.slug}`}>Link</a>
        </>
      ))}
    </div>
  );
}

export function getStaticProps() {
  const posts = allBlogs.map(post =>
    pick(post, ['slug', 'title', 'summary', 'publishedAt'])
  );

  return { props: { posts } };
}
