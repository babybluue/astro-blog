import type { PostModel } from '@interfaces/post-model'

export const postLink = (post: PostModel) => `/post/${post.data.title}`
