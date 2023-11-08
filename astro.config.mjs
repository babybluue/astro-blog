import flattenListItemParagraphs from 'mdast-flatten-listitem-paragraphs'
import rehypePrism from 'rehype-prism-plus/all'
import remarkRehype from 'remark-rehype'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://babybluue.github.io',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [flattenListItemParagraphs, remarkRehype],
    rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
  },
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
})
