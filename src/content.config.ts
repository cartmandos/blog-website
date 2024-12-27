import { defineCollection, z } from "astro:content"
import { glob } from 'astro/loaders';
import { DEFAULT_BLOG_AUTHOR } from "@/constants"

const blog = defineCollection({
  // type: "content", // For content layer you no longer define a `type` (v5 migration)
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default(DEFAULT_BLOG_AUTHOR),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  }),
})


export const collections = {
  blog,
}
