import { isValidElement, type ReactElement, type ReactNode } from "react";
import { Box, Image } from "@chakra-ui/react";

export const MDX_BLOCK_TAG = "mdx-block";

type MdxFigureProps = React.ComponentPropsWithoutRef<"img">;

export function isMdxBlockElement(
  child: ReactNode
): child is ReactElement {
  return (
    isValidElement(child) &&
    (child.type as { mdxBlockTag?: string }).mdxBlockTag === MDX_BLOCK_TAG
  );
}

function MdxFigure({ src, alt, title, ...props }: MdxFigureProps) {
  return (
    <Box
      as="figure"
      className="mdx-figure spacing"
      marginY={6}
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 4px 24px rgba(34, 211, 238, 0.08)"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "scale(1.01)",
        boxShadow: "0 8px 32px rgba(34, 211, 238, 0.15)",
      }}
    >
      <Image
        src={src as string}
        alt={alt ?? ""}
        width="full"
        loading="lazy"
        {...props}
      />
      {(alt || title) && (
        <Box
          as="figcaption"
          padding={3}
          fontSize="sm"
          color="fg.muted"
          textAlign="center"
          bg="bg.subtle"
          borderTopWidth="1px"
          borderColor="border"
        >
          {title ?? alt}
        </Box>
      )}
    </Box>
  );
}

MdxFigure.mdxBlockTag = MDX_BLOCK_TAG;

export default MdxFigure;
