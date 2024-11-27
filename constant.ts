import avatarImg from './src/assets/avatar.jpg'
import type { PostModel } from './src/interfaces/post-model'

// index

export const site = 'https://astro-blog-ecru-phi.vercel.app'

export const title = 'didmax'

export const description = '这是一个托管在 Cloudflare 上的个人博客，用于记录生活和技术笔记。'

export const avatar = avatarImg

export const quote =
  '我个人的一个秘密是在需要极大快乐和悲伤的公众场合却达不到这种快乐和悲伤应有的水平，因而内心惊恐万状，汗如雨下'

export const links = [
  { url: '/', title: '🌐首页' },
  { url: '/tags', title: '🔖标签' },
  { url: '/archive', title: '🗂️归档' },
  { url: '/search', title: '🔍搜索' },
]

export const linkAttr = 'abbrlink'

export const getPostLink = (post: PostModel) => `/posts/${post.data[linkAttr]}`

export const globalVars = {
  'post-font': "'Fira Mono', 'Noto Sans SC', sans-serif", // 文章字体
  'code-font': "'Fira Mono', 'Noto Sans SC', monospace", // 代码字体

  'a-link': '#56b6c2', // 链接悬浮色

  'h1-size': '1.45rem',

  'h2-size': '1.35rem',

  'h3-size': '1.25rem',
  'h3-color': '#6cb8e6',

  'h4-size': '1.2rem',
  'h4-color': '#e5b567',

  'h5-size': '1.15rem',
  'h5-color': '#ffc107',

  'h6-size': '1.1rem',
  'h6-color': '#795548',
}
