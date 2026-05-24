import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import { getAllMdxSummaries, getBlogSearchDocuments } from "@/app/utils/mdxFiles";
import BlogListing from "@/app/ui/BlogListing";
import { FadeIn } from "@/app/ui/motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writeups de CTF, HackTheBox, Hackviser y artículos sobre ciberseguridad.",
};

export default async function Blog() {
  const [posts, searchDocuments] = await Promise.all([
    getAllMdxSummaries(),
    getBlogSearchDocuments(),
  ]);

  return (
    <Box width="100%" maxWidth="6xl" marginX="auto" paddingX={{ base: 4, sm: 5, lg: 8 }}>
      <Stack paddingTop={{ base: 4, md: 6 }} gap={2}>
        <FadeIn>
          <Box as="header">
            <Heading as="h1" size={{ base: "2xl", md: "3xl" }} colorPalette="cyan">
              Blog
            </Heading>
            <Text color="fg.muted" marginTop={2}>
              Writeups de CTF, HackTheBox, Hackviser y artículos sobre
              ciberseguridad.
            </Text>
          </Box>
        </FadeIn>
      </Stack>
      <BlogListing posts={posts} searchDocuments={searchDocuments} />
    </Box>
  );
}
