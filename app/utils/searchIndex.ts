import Fuse, { type IFuseOptions } from "fuse.js";
import type { BlogSearchDocument } from "@/app/types/mdx";

export type { BlogSearchDocument };

const FUSE_OPTIONS: IFuseOptions<BlogSearchDocument> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.2 },
    { name: "categories", weight: 0.15 },
    { name: "tags", weight: 0.15 },
    { name: "plainText", weight: 0.25 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function createSearchIndex(documents: BlogSearchDocument[]) {
  return new Fuse(documents, FUSE_OPTIONS);
}

export function searchDocuments(
  index: Fuse<BlogSearchDocument>,
  query: string
): BlogSearchDocument[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return index.getIndex().docs as BlogSearchDocument[];
  }
  return index.search(trimmed).map((result) => result.item);
}

export function getUniqueCategories(documents: BlogSearchDocument[]): string[] {
  const categories = new Set<string>();
  for (const doc of documents) {
    for (const category of doc.categories) {
      categories.add(category);
    }
  }
  return Array.from(categories).sort();
}
