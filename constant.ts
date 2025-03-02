import avatarImg from './src/assets/avatar.jpg'
import type { PostModel } from './src/interfaces/post-model'

// index

export const site = 'https://astro-blog-ecru-phi.vercel.app'

export const title = 'didmax'

export const description = '这是一个托管在 Cloudflare 上的个人博客，用于记录生活和技术笔记。'

export const avatar = avatarImg

export const quote =
  '我个人的一个秘密是在需要极大快乐和悲伤的公众场合却达不到这种快乐和悲伤应有的水平，因而内心惊恐万状，汗如雨下'

export const tooltip = {
  content: '检测到页面内容有更新更新，是否刷新页面',
  confirm: '是',
  cancel: '否',
}

export const links = [
  { url: '/', title: '🌐首页' },
  { url: '/tags', title: '🔖标签' },
  { url: '/archive', title: '🗂️归档' },
  { url: '/search', title: '🔍搜索' },
]

export const linkAttr = 'abbrlink'

export const getPostLink = (post: PostModel) => `/posts/${post.data[linkAttr]}`
