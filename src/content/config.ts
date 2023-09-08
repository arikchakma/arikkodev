import { z, defineCollection } from 'astro:content';

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      size: z.object({
        width: z.number(),
        height: z.number(),
      }),
    }),
    ogImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    status: z.enum(['draft', 'published']),
    tags: z.array(z.string()).optional(),
    author: z.object({
      name: z.string(),
      twitter: z.string().optional(),
    }),
    publishedAt: z.date().optional(),
  }),
});
export const collections = {
  writing: writingCollection,
};
