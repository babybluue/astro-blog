import avatarImg from './src/assets/avatar.jpg'
import type { PostModel } from './src/interfaces/post-model'

// index

export const site = 'https://astro-blog-ecru-phi.vercel.app'

export const title = 'didmax'

export const description =
  '本博客是一个基于 Astro 构建的高效静态网站，专注于内容创作与分享，支持深色模式、PWA（渐进式 Web 应用），并具备强大的标签管理与全文搜索功能'

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

// 配置常量
export const config = {
  postsPerPage: 12,
  latestPostsCount: 8,
  siteName: 'didmax',
  author: 'didmax',
  language: 'zh-CN',
}

export const getPostLink = (post: PostModel) => `/posts/${post.data[linkAttr]}`
