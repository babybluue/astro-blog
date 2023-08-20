import { defineConfig } from 'astro/config'

import type { RemarkPlugin } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

import { str } from './scripts/crc32.mjs'

const generateAbbrlink: RemarkPlugin = () => {
  return function (_tree, file: any) {
    const frontmatter = file.data.astro.frontmatter
    if (!frontmatter.abbrlink) {
      const date = frontmatter.date
      const title = frontmatter.title
      const crc32Str = str(title + date) >>> 0
      const abbrlink = crc32Str.toString(16)
      frontmatter.abbrlink = abbrlink
    }
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://babybluue.github.io',
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  compressHTML: true,
  markdown: {
    remarkPlugins: [generateAbbrlink],
  },
})
