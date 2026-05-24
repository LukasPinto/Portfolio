"use client";

import { Box, Link, Text } from "@chakra-ui/react";
import type { Node } from "@/app/types/mdx";
import { sectionHref } from "./utils";

type TocNavProps = {
  nodes: Node[];
  slug: string;
  activeSectionId: string | null;
  depth?: number;
};

type TocLinkProps = {
  node: Node;
  slug: string;
  isActive: boolean;
  depth: number;
};

const depthStyles = [
  { fontSize: "sm", fontWeight: "semibold", paddingY: 2 },
  { fontSize: "sm", fontWeight: "medium", paddingY: 1.5 },
  { fontSize: "xs", fontWeight: "normal", paddingY: 1.5 },
] as const;

function TocLink({ node, slug, isActive, depth }: TocLinkProps) {
  const style = depthStyles[Math.min(depth, depthStyles.length - 1)];

  return (
    <Link
      href={sectionHref(slug, node.id)}
      aria-current={isActive ? "location" : undefined}
      display="flex"
      alignItems="flex-start"
      gap={2.5}
      paddingX={3}
      paddingY={style.paddingY}
      borderRadius="md"
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
      color={isActive ? "cyan.400" : "fg.muted"}
      bg={isActive ? "accent.muted" : "transparent"}
      textDecoration="none"
      transition="color 0.2s ease, background-color 0.2s ease, transform 0.2s ease"
      position="relative"
      _hover={{
        color: isActive ? "cyan.300" : "fg",
        bg: "accent.muted",
        transform: "translateX(2px)",
        textDecoration: "none",
      }}
      _before={
        isActive
          ? {
              content: '""',
              position: "absolute",
              left: 0,
              top: "20%",
              bottom: "20%",
              width: "3px",
              borderRadius: "full",
              bgGradient: "to-b",
              gradientFrom: "cyan.400",
              gradientTo: "teal.500",
            }
          : undefined
      }
    >
      <Box
        as="span"
        aria-hidden
        flexShrink={0}
        marginTop="0.45em"
        boxSize={isActive ? 2 : 1.5}
        borderRadius="full"
        bg={isActive ? "cyan.400" : "border.emphasized"}
        boxShadow={isActive ? "0 0 8px rgba(34, 211, 238, 0.6)" : undefined}
        transition="all 0.2s ease"
      />
      <Text as="span" lineHeight="tall">
        {node.name}
      </Text>
    </Link>
  );
}

export default function TocNav({
  nodes,
  slug,
  activeSectionId,
  depth = 0,
}: TocNavProps) {
  if (nodes.length === 0) return null;

  return (
    <Box as="ul" listStyleType="none" margin={0} padding={0}>
      {nodes.map((node) => (
        <Box as="li" key={node.id}>
          <TocLink
            node={node}
            slug={slug}
            isActive={node.id === activeSectionId}
            depth={depth}
          />
          {node.children && node.children.length > 0 && (
            <Box
              as="ul"
              listStyleType="none"
              margin={0}
              marginLeft={4}
              paddingLeft={3}
              borderLeftWidth="1px"
              borderLeftColor="border"
              listStylePosition="inside"
            >
              <TocNav
                nodes={node.children}
                slug={slug}
                activeSectionId={activeSectionId}
                depth={depth + 1}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
