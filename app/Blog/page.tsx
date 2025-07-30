import { HStack, Box } from "@chakra-ui/react";
import { getAllMdxFiles } from "@/app//utils/mdxFiles";
import PaginationUI from "@/app/ui/Pagination";
export default async function Blog() {
  let posts = await getAllMdxFiles();
  posts = posts.filter((file: any) => file.slug != "experiencia");

  return (
    <>
      <HStack justifyContent="center">
        <PaginationUI posts={posts}></PaginationUI>
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
      </HStack >
    </>

  );
}
