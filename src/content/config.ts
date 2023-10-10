import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().optional(),
    language: z.enum(['zh', 'en']).optional(),
    title: z.string(),
    date: z.date(),
    abbrlink: z.string().optional(),
    updated: z.date(),
    tags: z.array(z.string()).or(z.string()).or(z.null()).optional(),
    descriptions: z.string().optional(),
  }),
})

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().optional(),
    language: z.enum(['zh', 'en']).optional(),
    title: z.string(),
    date: z.date(),
    abbrlink: z.string().optional(),
    updated: z.date(),
    tags: z.array(z.string()).or(z.string()).or(z.null()).optional(),
    descriptions: z.string().optional(),
  }),
})

export const collections = { posts, notes }
