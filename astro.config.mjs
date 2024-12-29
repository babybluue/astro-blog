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
import { remarkAlert } from 'remark-github-blockquote-alert'
import remarkRehype from 'remark-rehype'
import sectionize from 'remark-sectionize'
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

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
    remarkRehype: { footnoteLabelTagName: 'h3', footnoteLabel: ' ' },
    shikiConfig: {
      theme: 'one-dark-pro',
      transformers: [transformerNotationHighlight(), transformerNotationDiff()],
    },
    remarkPlugins: [sectionize, remarkAlert, remarkRehype],
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
            src: 'pwa-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'pwa-64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
