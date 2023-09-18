const { readdir, readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')
const { stringify } = require('yaml')
const matter = require('gray-matter')

const notePath = resolve(__dirname, './src/content/notes')
const postPath = resolve(__dirname, './src/content/posts')

const updateMatter = async () => {
  const notes = (await readdir(notePath)).filter((f) => f.endsWith('.md'))

  const posts = (await readdir(postPath)).filter((f) => f.endsWith('.md'))

  await Promise.all(
    notes.map(async (file) => {
      const filePath = resolve(__dirname, `${notePath}/${file}`)
      const { data, content } = matter(await readFile(filePath))
      delete data['category']
      const newContent = `---\n${stringify(data)}---\n${content}`
      await writeFile(filePath, newContent)
    }),

    posts.map(async (file) => {
      const filePath = resolve(__dirname, `${postPath}/${file}`)
      const { data, content } = matter(await readFile(filePath))
      delete data['category']
      const newContent = `---\n${stringify(data)}---\n${content}`
      await writeFile(filePath, newContent)
    }),
  )
}

updateMatter()
