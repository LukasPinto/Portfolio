import { promises as fs } from "node:fs";
import path from "path";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { compile, run } from "@mdx-js/mdx";
import withSlugs from "remark-slug";
import withToc from "@stefanprobst/remark-extract-toc";
import remarkFlexibleParagraphs from "remark-flexible-paragraphs";
import { type PluggableList } from "unified";

import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeSlug from "rehype-slug";
import rehypePreLanguage from "rehype-pre-language";
import { getFrontmatter } from "next-mdx-remote-client/utils";

import remarkCodeTitles from "remark-code-titles";
import rehypeCodeMeta from "rehype-code-meta";

import remarkReadingTime from "remark-reading-time";
const rootPath = process.cwd();

const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkCodeTitles,
  remarkEmoji,
  remarkFlexibleParagraphs,
  //remarkFlexibleCodeTitles,
  //remarkCodeTitles,
];

const rehypePlugins: PluggableList = [
  rehypeCodeMeta,

  [rehypeRaw, { passThrough: nodeTypes }],
  //rehypePrism,
  //rehypeStarryNight,

  rehypeHighlight,
  [rehypeHighlightLines, { showLineNumbers: true }],
  rehypeSlug,
  rehypePreLanguage,
];
export async function getFiles(pathDir: any) {
  const directoryPath = path.join(rootPath, ...pathDir);
  let files: any = [];
  let errroReading = null;

  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    files = items.filter((item) => item.isFile()).map((item) => item.name);
  } catch {
    return files;
  }
  return files;
}

export async function getFileBySlug({ slug }: any) {
  const mdxSource = await fs.readFile(
    `${rootPath.toString()}/data/${slug}.mdx`,
    { encoding: "utf8" }
  );
  const { frontmatter } = getFrontmatter(mdxSource);

  // compilo para extraer la table of content Y utilizar plugins que extraen información
  const toc = compile(mdxSource, {
    remarkPlugins: [
      withSlugs as any,
      withToc,
      remarkRehype,
      remarkFrontmatter,
      remarkReadingTime,
    ],
  });
  /** se puede con unified pero hay que usar una función llamada DangerousHTML, prefiero el mdxremote
   * que tiene plugins para poder gestionar una inyección de HTML
   */
  /*PRUEBA CON UNIFIED*/
  // const processedContent = await unified()
  //   .use(remarkParse)
  //   .use(remarkRehype, { allowDangerousHtml: true })
  //   .use(rehypeRaw)

  //   // @ts-ignore
  //   .use(rehypePrism)
  //   .use(rehypeStringify)
  //   .process(mdxSource);
  /*PRUEBA CON UNIFIED */

  // console.log((await toc).data.toc)
  // console.log(toc);
  return {
    // source: source.content,
    source: mdxSource,
    slug: slug,
    matter: frontmatter,
    toc: (await toc).data.toc,
    readingTime: (await toc).data.readingTime,
  };
}

export async function getAllMdxFiles() {
  const files = (await getFiles(["data"])).map((file: any) =>
    file.replace(".mdx", "")
  );

  let metadata = files.map(async (file: any) => {
    const mdxSource = await getFileBySlug({ slug: file });
    const data = {
      matter: mdxSource.matter,
      toc: mdxSource.toc,
      slug: mdxSource.slug,
    };

    return data;
  });
  let aux: any = [];
  aux = Promise.all(metadata).then((values) => {
    return values;
  });

  return aux;
}

export const plugins = {
  remarkPlugins,
  rehypePlugins,
};
