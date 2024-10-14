import AstroPWA from '@vite-pwa/astro'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import i18n, { filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import { defineConfig } from 'astro/config'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import remarkRehype from 'remark-rehype'

const defaultLocale = 'zh'
const locales = {
  zh: '中文',
  en: 'English',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-blog-ecru-phi.vercel.app',
  prefetch: {
    prefetchAll: true,
  },
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkRehype],
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
                children: [
                  {
                    type: 'element',
                    tagName: 'summary',
                    children: [
                      {
                        type: 'text',
                        value: 'Table of Contents',
                      },
                    ],
                  },
                  toc,
                ],
              }
            }
            return false
          },
        },
      ],
      [rehypePrism, { showLineNumbers: true }],
      [rehypeExternalLinks, { rel: 'nofollow', target: '_blank' }],
    ],
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    mdx(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    tailwind({ applyBaseStyles: false }),
    AstroPWA({
      registerType: 'prompt',
      devOptions: { enabled: false },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*'],
        navigateFallbackDenylist: [/.*\.xml$/, /search/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      includeAssets: ['**/*'],
      manifest: {
        name: 'didmax - blog',
        short_name: 'didmax',
        description: 'didmax, my blog website',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
