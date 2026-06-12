import { site } from './constant'
import AstroPWA from '@vite-pwa/astro'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import { remarkAlert } from 'remark-github-blockquote-alert'
import sectionize from 'remark-sectionize'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site,
  prefetch: { prefetchAll: true },
  markdown: {
    remarkRehype: { footnoteLabel: ' ' },
    shikiConfig: {
      theme: 'one-dark-pro',
      transformers: [
        transformerMetaHighlight(),
        transformerNotationHighlight(),
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
      ],
    },
    remarkPlugins: [sectionize, remarkAlert],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'after' }],
      [
        rehypeToc,
        {
          nav: false,
          customizeTOC: (toc) => {
            if (toc.children.length > 0) {
              return {
                type: 'element',
                tagName: 'details',
                children: [{ type: 'element', tagName: 'summary', children: [{ type: 'text', value: '目录' }] }, toc],
              }
            }
            return false
          },
        },
      ],
      [rehypeExternalLinks, { rel: 'nofollow', target: '_blank' }],
    ],
  },
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => page == `${site}/` || page.includes('/posts') }),
    AstroPWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
      workbox: {
        navigateFallback: '/404',
        // 仅预缓存静态资源，HTML 页面走 NetworkFirst 以每次优先获取最新内容
        globPatterns: ['**/*.{js,css,woff,woff2,png,svg,ico,webp,gif,jpg,jpeg,json,wasm}'],
        globIgnores: ['**/*.html'],
        navigateFallbackDenylist: [/.*\.xml$/, /search/],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
      experimental: { directoryAndTrailingSlashHandler: true },

      includeAssets: ['**/*'],
      manifest: {
        name: 'astro - blog',
        short_name: 'astro blog',
        description: 'a blog theme powered by astro',
        theme_color: '#ffffff',
        background_color: '#1f1f1f',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-48.png', sizes: '48x48', type: 'image/png' },
          { src: 'pwa-64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-72.png', sizes: '72x72', type: 'image/png' },
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
