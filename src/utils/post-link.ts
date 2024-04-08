import type { PostModel } from '@interfaces/post-model'

export const getPostLink = (post: PostModel) => `/posts/${post.data.abbrlink}`
