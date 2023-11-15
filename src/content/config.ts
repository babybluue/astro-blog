import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean().optional(),
    language: z.enum(['zh', 'en']).optional(),
    title: z.string(),
    date: z.date(),
    abbrlink: z.string(),
    tags: z.array(z.string()),
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
    abbrlink: z.string(),
    tags: z.array(z.string()),
    descriptions: z.string().optional(),
  }),
})

export const collections = { posts, notes }
