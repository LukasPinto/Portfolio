import { promises as fs } from 'node:fs';
import path from 'path';
import matter from "gray-matter";
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import { useMDXComponents } from "@/mdx-components";
import { Heading } from '@chakra-ui/react';

import { compileMDX } from 'next-mdx-remote/rsc';
import { unified } from 'unified'
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
  const mdxSource = await fs.readFile(`${rootPath.toString()}/data/${slug}.mdx`, { encoding: 'utf8' })

  //const { data } = await matter(mdxSource)

  const { frontmatter, content } = await compileMDX(
    {
      source: mdxSource,
      options: {
        parseFrontmatter: true
      },
      components: useMDXComponents({})
    }
  )
  // const source = await unified()
  //   .use(remarkParse) // Convert into markdown AST
  //   .use(remarkRehype) // Transform to HTML AST
  //   .use(rehypeStringify) // Convert AST into serialized HTML
  //   .process(content)

  return {
    source: content,
    frontmatter: {
      slug: slug
    },
    matter: frontmatter
  }
}

export async function getAllMdxFiles() {
  const files = (await getFiles(['data'])).map((file)=>file.replace('.mdx',''))

  let metadata = files.map(async (file) => {
    const mdxSource = await getFileBySlug({ slug: file });
    const data = mdxSource.matter;

    return { slug: file.replace(".mdx", ""), matter: { ...data } }
  })
  let aux = []
  aux = Promise.all(metadata).then((values) => {
    return values
  })


  return aux
}

