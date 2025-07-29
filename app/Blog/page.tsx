import { Stack, Card, Image, Badge, HStack, Box, Link } from "@chakra-ui/react";
import { getAllMdxFiles } from "../utils/mdxFiles";
import { FaRegCalendar } from "react-icons/fa";
export default async function Blog() {
  let posts = await getAllMdxFiles();
  posts = posts.filter((file: any) => file.slug != "experiencia");
  return (
    <HStack maxW="lvw" justifyContent="center" maxHeight="80%" overflow="auto">
      <Box width="lvw">
        <Stack
          gap={2}
          justifyContent="center"
          padding={{ base: 2 }}
          paddingX={{ base: 2, xl: "10rem" }}
          maxWidth="full"
          overflowY="scroll"
          maxHeight="lvh"
        >
          {posts.map((item: any, index: number) => (
            <>
              <Link
                key={index}
                variant="plain"
                textDecoration="none"
                href={`/Blog/${item.slug}`}
              >
                <Card.Root
                  zIndex={1} // si es negativo no hace hover
                  key={index}
                  flexDirection="row"
                  transition="all 0.2s ease-in-out" // Aplica la transición a todas las propiedades que cambien
                  _hover={{
                    bg: "gray.900", // Cambia el color de fondo
                    transform: "scale(1.05)", // Escala el componente
                    boxShadow: "lg", // Agrega una sombra
                  }}
                  minWidth="32rem"
                  width="full"
                  maxHeight="11rem"
                >
                  <Image
                    objectFit="cover"
                    w="18rem"
                    src={`${item.matter.image.path}`}
                    alt="Caffe Latte"
                  />
                  <Box width="60%" overflow="hidden">
                    <Card.Body>
                      <Card.Title textWrap="wrap">
                        {item.matter.title}
                      </Card.Title>
                      <Card.Description>
                        {item.matter.description}
                      </Card.Description>
                      <HStack mt="4">
                        <Badge>Hot</Badge>
                        <Badge>Caffeine</Badge>
                      </HStack>
                    </Card.Body>
                    <Card.Footer>
                      <HStack mt="4">
                        <Badge>
                          <FaRegCalendar />
                          {item.matter.date.split(" ")[0].replaceAll("-", "/")}
                        </Badge>

                        {item.matter.categories.map(
                          (category: string, index: number) => (
                            <Badge key={index}>{category}</Badge>
                          )
                        )}
                      </HStack>
                    </Card.Footer>
                  </Box>
                </Card.Root>
              </Link>
            </>
          ))}
        </Stack>
      </Box>
      <Box
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "block",
        }}
      >
        TODO: Barra lateral para el Blog
      </Box>
    </HStack>
  );
}
