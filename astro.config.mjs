import { globalVars, site } from './constant'
import AstroPWA from '@vite-pwa/astro'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import remarkRehype from 'remark-rehype'

const globalVarsString = Object.entries(globalVars)
  .map(([key, value]) => `@${key}: ${value};`)
  .join('\n')

// https://astro.build/config
export default defineConfig({
  site,
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
    },
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
      [rehypeExternalLinks, { rel: 'nofollow', target: '_blank' }],
    ],
  },
  build: {
    format: 'file',
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          globalVars,
          additionalData: globalVarsString,
        },
      },
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page == `${site}/` || page.includes('/posts'),
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
        name: 'astro - blog',
        short_name: 'astro blog',
        description: 'a blog theme powered by astro',
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
