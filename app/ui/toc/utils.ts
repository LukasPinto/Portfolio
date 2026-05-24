import type { Node } from "@/app/types/mdx";

export function collectSectionIds(nodes: Node[]): string[] {
  return nodes.flatMap((node) => [
    node.id,
    ...(node.children ? collectSectionIds(node.children) : []),
  ]);
}

export function sectionHref(slug: string, sectionId: string) {
  return `/Blog/${slug}#${sectionId}`;
}

export function readingProgress(
  sectionIds: string[],
  activeSectionId: string | null
): number {
  if (sectionIds.length === 0) return 0;
  if (sectionIds.length === 1) return 100;

  const index = activeSectionId
    ? sectionIds.indexOf(activeSectionId)
    : 0;
  const clampedIndex = index >= 0 ? index : 0;

  return ((clampedIndex + 1) / sectionIds.length) * 100;
}
