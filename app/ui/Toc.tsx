"use client";

import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import useActiveSection from "@/app/hooks/useActiveSection";
import type { Node } from "@/app/types/mdx";
import TocNav from "@/app/ui/toc/TocNav";
import TocPanel from "@/app/ui/toc/TocPanel";
import { collectSectionIds, readingProgress } from "@/app/ui/toc/utils";

export type TableOfContentProps = {
  content: Node[];
  slug: string;
};

export default function TableOfContent({ content, slug }: TableOfContentProps) {
  const sectionIds = useMemo(() => collectSectionIds(content), [content]);
  const activeSectionId = useActiveSection(sectionIds);
  const progress = readingProgress(sectionIds, activeSectionId);

  if (content.length === 0) {
    return null;
  }

  const nav = (
    <TocNav
      nodes={content}
      slug={slug}
      activeSectionId={activeSectionId}
    />
  );

  return (
    <>
      <Box display={{ base: "block", lg: "none" }} width="100%">
        <TocPanel
          sectionCount={sectionIds.length}
          progress={progress}
          collapsible
        >
          {nav}
        </TocPanel>
      </Box>

      <Box
        as="aside"
        aria-label="Tabla de contenidos"
        display={{ base: "none", lg: "block" }}
        position="sticky"
        top="var(--app-nav-height, 3.5rem)"
        zIndex={10}
        width="100%"
        maxHeight="calc(100dvh - var(--app-nav-height, 3.5rem) - 1rem)"
        overflowY="auto"
        paddingY={2}
      >
        <TocPanel sectionCount={sectionIds.length} progress={progress}>
          {nav}
        </TocPanel>
      </Box>
    </>
  );
}
