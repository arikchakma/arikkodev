import { z, defineCollection } from 'astro:content';

const writingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string().optional(),
        alt: z.string().optional(),
        size: z
          .object({
            width: z.number().optional(),
            height: z.number().optional(),
          })
          .optional(),
      })
      .optional(),
    ogImage: z
      .object({
        src: z.string().optional(),
        alt: z.string().optional(),
      })
      .optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    tags: z.array(z.string()).optional(),
    author: z.object({
      name: z.string(),
      twitter: z.string().optional(),
    }),
    publishedAt: z.date().optional(),
    showTableOfContents: z.boolean().optional().default(false),
  }),
});

export const collections = {
  writings: writingCollection,
  notes: writingCollection,
};
