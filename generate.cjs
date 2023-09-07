const { readdir, readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')
const { crc32 } = require('crc')
const { stringify } = require('yaml')
const matter = require('gray-matter')

const dir = resolve(__dirname, './src/content/posts')

const localDateTimeString = (date) => new Date(date.getTime() + 288e5).toISOString().slice(0, 19).replace('T', ' ')

const abbrlinkHelper = async (frontMatter) => {
  const { date, title } = frontMatter
  const abbrlinks = []
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'))

  await Promise.all(
    files.map(async (file) => {
      const filePath = resolve(__dirname, `${dir}/${file}`)
      const { data } = matter(await readFile(filePath))
      abbrlinks.push(data.abbrlink)
    }),
  )

  const formatDate = localDateTimeString(date)
  let abbrlink = crc32(formatDate + title).toString(16)

  while (abbrlinks.indexOf(abbrlink) != -1) {
    abbrlink = (crc32(formatDate + title) + Math.floor(Math.random() * 10)).toString(16)
  }

  return abbrlink
}

const getArgv = async () => {
  const argv = process.argv
  const obj = {}
  argv.map((item, index) => {
    if (item.startsWith('--')) {
      obj[item.slice(2, item.length)] = argv[index + 1]
    }
  })

  const frontMatter = {}
  frontMatter.title = obj['title']
  frontMatter.date = new Date()
  frontMatter.category = obj['type']
  frontMatter.abbrlink = await abbrlinkHelper(frontMatter)

  const filename = `${localDateTimeString(new Date()).slice(0, 10)}-${frontMatter.title}`
  const newContent = `---\n${stringify(frontMatter)}---\n`

  await writeFile(`${dir}/${filename}.md`, newContent)
}

getArgv()
