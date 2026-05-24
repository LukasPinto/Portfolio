import { Box } from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";

export default function MdxCallout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="blockquote"
      className="mdx-callout spacing"
      display="flex"
      gap={3}
      padding={4}
      borderLeftWidth="4px"
      borderLeftColor="cyan.500"
      bg="bg.muted"
      borderRadius="md"
      color="fg.muted"
      marginY={4}
    >
      <Box as="span" aria-hidden color="cyan.400" flexShrink={0} marginTop={1}>
        <LuInfo size={18} />
      </Box>
      <Box flex={1}>{children}</Box>
    </Box>
  );
}
