import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().optional(),
    isExcerpt: z.boolean().optional(),
    language: z.enum(['zh', 'en']).optional(),
    title: z.string(),
    date: z.date(),
    abbrlink: z.string().optional(),
    updated: z.date(),
    tags: z.array(z.string()).or(z.string()).or(z.null()).optional(),
    categories: z.string().or(z.null()).optional(),
    descriptions: z.string().optional(),
  }),
})

export const collections = { posts }
