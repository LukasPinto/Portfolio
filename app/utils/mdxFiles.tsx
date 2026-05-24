import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import { nodeTypes } from "@mdx-js/mdx";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { compile } from "@mdx-js/mdx";
import withSlugs from "remark-slug";
import withToc, { type Toc, type TocEntry } from "@stefanprobst/remark-extract-toc";
import type { Pluggable, PluggableList } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeSlug from "rehype-slug";
import rehypePreLanguage from "rehype-pre-language";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import rehypeCodeMeta from "rehype-code-meta";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkReadingTime from "remark-reading-time";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { toString } from "mdast-util-to-string";
import type {
  Matter,
  Node,
  Post,
  PostSummary,
  ReadingTime,
  BlogSearchDocument,
} from "@/app/types/mdx";

const DATA_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "data");
const BLOG_EXCLUDED_SLUGS = new Set(["experiencia"]);

const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkEmoji,
  remarkCodeTitles,
  withSlugs as Pluggable,
  withToc,
  remarkFrontmatter,
  remarkReadingTime,
];

const rehypePlugins: PluggableList = [
  rehypeCodeMeta,
  [rehypeRaw, { passThrough: nodeTypes }],
  rehypeHighlight,
  [rehypeHighlightLines, { showLineNumbers: true }],
  rehypeSlug,
  rehypePreLanguage,
];

const renderRemarkPlugins: PluggableList = [
  remarkGfm,
  remarkEmoji,
  remarkCodeTitles,
  withSlugs as Pluggable,
];

export const plugins = {
  remarkPlugins: renderRemarkPlugins,
  rehypePlugins,
};

export async function getFiles(pathDir: string[]) {
  const directoryPath = path.join(/* turbopackIgnore: true */ process.cwd(), ...pathDir);
  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    return items.filter((item) => item.isFile()).map((item) => item.name);
  } catch {
    return [];
  }
}

function convertNode(originalNode: TocEntry): Node {
  const newNode: Node = {
    id: originalNode.id as string,
    name: originalNode.value,
  };

  if (originalNode.children && originalNode.children.length > 0) {
    newNode.children = originalNode.children.map(convertNode);
  }

  return newNode;
}

function convertToNodes(originalNodes: TocEntry[]): Node[] {
  return originalNodes.map(convertNode);
}

async function readMdxSource(slug: string) {
  return fs.readFile(path.join(DATA_DIR, `${slug}.mdx`), { encoding: "utf8" });
}

export const getMdxSlugs = cache(async (): Promise<string[]> => {
  const files = await getFiles(["data"]);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
});

export const getMdxFrontmatter = cache(async (slug: string): Promise<PostSummary> => {
  const mdxSource = await readMdxSource(slug);
  const { frontmatter } = getFrontmatter(mdxSource);

  return {
    slug,
    matter: frontmatter as Matter,
  };
});

export const getAllMdxSummaries = cache(async (): Promise<PostSummary[]> => {
  const slugs = await getMdxSlugs();
  const summaries = await Promise.all(
    slugs
      .filter((slug) => !BLOG_EXCLUDED_SLUGS.has(slug))
      .map((slug) => getMdxFrontmatter(slug))
  );

  return summaries.sort(
    (a, b) => new Date(b.matter.date).getTime() - new Date(a.matter.date).getTime()
  );
});

async function extractPlainTextFromMdx(source: string): Promise<string> {
  const tree = remark().use(remarkMdx).parse(source);
  return toString(tree);
}

export const getBlogSearchDocuments = cache(async (): Promise<BlogSearchDocument[]> => {
  const slugs = await getMdxSlugs();
  const blogSlugs = slugs.filter((slug) => !BLOG_EXCLUDED_SLUGS.has(slug));

  const documents = await Promise.all(
    blogSlugs.map(async (slug) => {
      const mdxSource = await readMdxSource(slug);
      const { frontmatter, strippedSource } = getFrontmatter(mdxSource);
      const matter = frontmatter as Matter;
      const plainText = await extractPlainTextFromMdx(strippedSource);

      return {
        slug,
        title: matter.title,
        description: matter.description,
        categories: matter.categories ?? [],
        tags: matter.tags ?? [],
        date: matter.date,
        plainText,
      };
    })
  );

  return documents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const getMdxPost = cache(async (slug: string): Promise<Post> => {
  const mdxSource = await readMdxSource(slug);
  const { frontmatter } = getFrontmatter(mdxSource);

  const compiled = await compile(mdxSource, {
    remarkPlugins,
    rehypePlugins,
  });

  const toc = convertToNodes((compiled.data.toc as Toc) ?? []);

  return {
    source: mdxSource,
    slug,
    matter: frontmatter as Matter,
    toc,
    readingTime: compiled.data.readingTime as ReadingTime,
  };
});

/** @deprecated Use getMdxPost instead */
export async function getFileBySlug({ slug }: { slug: string }) {
  return getMdxPost(slug);
}

/** @deprecated Use getAllMdxSummaries instead */
export async function getAllMdxFiles() {
  const slugs = await getMdxSlugs();
  return Promise.all(slugs.map((slug) => getMdxPost(slug)));
}

export type { Matter, Node, Post, PostSummary, ReadingTime, BlogSearchDocument };
