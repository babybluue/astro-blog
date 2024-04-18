import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      isDraft: z.boolean().optional(),
      language: z.enum(['zh', 'en']).optional(),
      title: z.string(),
      date: z.date(),
      abbrlink: z.string(),
      tags: z.array(z.string()),
      description: z.string().optional(),
      cover: image().optional(),
    }),
})

const notes = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      isDraft: z.boolean().optional(),
      language: z.enum(['zh', 'en']).optional(),
      title: z.string(),
      date: z.date(),
      abbrlink: z.string(),
      tags: z.array(z.string()),
      description: z.string().optional(),
      cover: image().optional(),
    }),
})

export const collections = { posts, notes }
