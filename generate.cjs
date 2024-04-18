const { readdir, readFile, writeFile, mkdir, access } = require('fs/promises')
const { resolve } = require('path')
const { crc32 } = require('crc')
const { stringify } = require('yaml')
const matter = require('gray-matter')

let dir = resolve(__dirname, './src/content/drafts')

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
      const content = item.slice(2, item.length).split('=')
      obj[content[0]] = content[1]
    }
  })

  if (obj['dir']) {
    dir = resolve(__dirname, `./src/content/${obj['dir']}`)
  }
  try {
    await access(dir)
  } catch {
    await mkdir(dir)
  }

  const frontMatter = {}
  frontMatter.title = obj['title']
  frontMatter.date = new Date()
  frontMatter.abbrlink = await abbrlinkHelper(frontMatter)
  frontMatter.tags = []
  frontMatter.description = ''

  const filename = `${localDateTimeString(new Date()).slice(0, 10)}-${frontMatter.title}`
  const newContent = `---\n${stringify(frontMatter)}---\n`

  await writeFile(`${dir}/${filename}.md`, newContent)
}

getArgv()
