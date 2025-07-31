import { HStack, Box } from "@chakra-ui/react";
import { getAllMdxFiles } from "@/app//utils/mdxFiles";
import PaginationUI from "@/app/ui/Pagination";
import type { post, matter, Node, readingTime } from "@/app//utils/mdxFiles";
export default async function Blog() {
  const posts = await getAllMdxFiles();
  let converted = posts.map(
    (value: { matter: matter; toc: Node[]; slug: string }) => {
      return {
        source: "",
        slug: value.slug,
        matter: value.matter,
        toc: value.toc,
        readingTime: {
          text: "",
          minutes: 0,
          time: 0,
          words: 0,
        } as readingTime,
      } as post;
    }
  );
  converted = converted.filter((file: post) => file.slug != "experiencia");

  return (
    <>
      <HStack justifyContent="center">
        <PaginationUI posts={converted}></PaginationUI>
        <Box
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
          }}
          width="20%"
        >
          {/* queda pendiente por hacer una posible barra latera de tags o busquedas, además de la paginación. */}
        </Box>
      </HStack>
    </>
  );
}
