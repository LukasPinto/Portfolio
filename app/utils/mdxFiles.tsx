import { promises as fs } from "node:fs";
import path from "path";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { compile } from "@mdx-js/mdx";
import withSlugs from "remark-slug";
import withToc, { Toc, TocEntry } from "@stefanprobst/remark-extract-toc";
import { Pluggable, type PluggableList } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeSlug from "rehype-slug";
import rehypePreLanguage from "rehype-pre-language";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import rehypeCodeMeta from "rehype-code-meta";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkReadingTime from "remark-reading-time";

const rootPath = process.cwd();

const remarkPlugins: PluggableList = [
  remarkGfm,
  //remarkCodeTitles,
  remarkEmoji,
  //remarkFlexibleParagraphs,
  remarkCodeTitles,
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
export async function getFiles(pathDir: string[]) {
  const directoryPath = path.join(rootPath, ...pathDir);
  let files: string[] = [];

  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    files = items.filter((item) => item.isFile()).map((item) => item.name);
  } catch {
    return files;
  }
  return files;
}

export async function getAllMdxFiles() {
  const files = (await getFiles(["data"] as string[])).map((file: string) =>
    file.replace(".mdx", "")
  );

  const metadata = files.map(async (file: string) => {
    const mdxSource = await getFileBySlug({ slug: file });
    const data = {
      matter: mdxSource.matter,
      toc: mdxSource.toc,
      slug: mdxSource.slug,
    };

    return data;
  });

  return Promise.all(metadata).then((values) => {
    return values;
  });
}

export async function getFileBySlug({ slug }: { slug: string }) {
  const mdxSource = await fs.readFile(
    `${rootPath.toString()}/data/${slug}.mdx`,
    { encoding: "utf8" }
  );
  const { frontmatter } = getFrontmatter(mdxSource);

  // compilo para extraer la table of content Y utilizar plugins que extraen información
  const data = compile(mdxSource, {
    remarkPlugins: [
      withSlugs as Pluggable,
      withToc,
      remarkRehype,
      remarkFrontmatter,
      remarkReadingTime,
    ],
  });
  const toc = convertToNodes((await data).data.toc as Toc);

  return {
    // source: source.content,
    source: mdxSource,
    slug: slug,
    matter: frontmatter as matter,
    toc: toc,
    readingTime: (await data).data.readingTime as readingTime,
  };
}

export type Node = {
  id: string;
  name: string;
  children?: Node[];
};

export type readingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export type post = {
  source: string;
  slug: string;
  matter: matter;
  toc: object;
  readingTime: readingTime;
};

export type matter = {
  title: string;
  author: string;
  date: string;
  description: string;
  image: {
    path: string;
  };
  pin: boolean;

  categories: string[];
  tags: string[];
};

function convertNode(originalNode: TocEntry): Node {
  const newNode: Node = {
    id: originalNode.id as string,
    name: originalNode.value, // 'value' en el original se convierte en 'name'
  };

  // Si el nodo original tiene hijos, los mapeamos recursivamente
  if (originalNode.children && originalNode.children.length > 0) {
    newNode.children = originalNode.children.map(convertNode);
  }

  return newNode;
}

function convertToNodes(originalNodes: TocEntry[]): Node[] {
  return originalNodes.map(convertNode);
}

export const plugins = {
  remarkPlugins,
  rehypePlugins,
};
