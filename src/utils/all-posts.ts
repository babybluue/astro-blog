import { getCollection } from 'astro:content'

import type { PostModel } from '@interfaces/post-model'

export const getAllPosts = async (): Promise<PostModel[]> => {
  const posts = await getCollection('posts', ({ data }) => (import.meta.env.PROD ? !data.isDraft : true))

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}
