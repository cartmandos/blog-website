import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Anonymous'),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  })
});

export const collections = {
  blog,
};