import { getCollection } from 'astro:content'

import type { PostModel } from '@interfaces/post-model'

export const getAllPosts = async (): Promise<PostModel[]> => {
  const posts = await getCollection('posts', ({ data }) => !data.isDraft)
  const notes = await getCollection('notes', ({ data }) => !data.isDraft)

  const allPosts = [...posts, ...notes].sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return allPosts
}
