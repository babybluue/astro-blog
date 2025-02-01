import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data' }),
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

export const collections = { posts }
