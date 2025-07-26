import { promises as fs } from 'node:fs';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { read } from 'to-vfile'
import { matter } from 'vfile-matter'

const rootPath = process.cwd()
export async function getFiles(pathDir) {
  const directoryPath = path.join(rootPath, ...pathDir);
  let files = []
  let errroReading = null;

  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    files = items
      .filter(item => item.isFile())
      .map(item => item.name)
  } catch {
    return files
  }
  return files
}


export async function getFileBySlug({ slug }) {
  // const mdxFile = await fs.readFile(path.join(rootPath, 'data', `${slug}.mdx`),
  //   'utf8'
  // )
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(function () {
      return function (tree) {
        // console.dir(tree)
      }
    })
    .process(await read(`${rootPath.toString()}/data/${slug}`))

  matter(file)
  // console.log(file.data.matter)
  return file
}

export async function getAllMdxFiles() {
  const files = await getFiles(['data'])

  let metadata = files.map(async (file) => {
    const mdxSource = await getFileBySlug({ slug: file });
    const data = await mdxSource.data.matter;

    return { slug: file.replace(".mdx", ""), matter: { ...data } }
  })
  let aux = []
  aux = Promise.all(metadata).then((values) => {
    return values
  })


  return aux
}

