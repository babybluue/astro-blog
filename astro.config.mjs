import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import rehypePrism from 'rehype-prism-plus/all'
import remarkRehype from 'remark-rehype'

// https://astro.build/config
export default defineConfig({
  site: 'https://babybluue.github.io',
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkRehype],
    rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
  },
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
})
