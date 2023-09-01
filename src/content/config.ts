import { z, defineCollection } from 'astro:content';

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    status: z.enum(['draft', 'published']),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    authorContact: z.string().email().optional(),
    publishedAt: z.date().optional(),
  }),
});
export const collections = {
  writing: writingCollection,
};
