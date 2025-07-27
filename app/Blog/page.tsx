import {
  Stack,
  Card,
  Center,
  Image,
  Badge,
  HStack,
  Box,
  Link,
} from "@chakra-ui/react";
import { getAllMdxFiles } from "../utils/mdxFiles";

export default async function Blog() {
  const posts = await getAllMdxFiles();

  return (
    <>
      {console.log(posts)}

      <Center>
        <Stack
          gap={2}
          width="100%"
          justifyContent="center"
          marginTop={4}
          marginBottom={4}
          overflowX="scroll"
          scrollbar="hidden"
          padding={10}
        >
          {posts.map((item, index) => (
            <Link
              key={index}
              variant="plain"
              width="full"
              textDecoration="none"
              href={`/Blog/${item.slug}`}
            >
              <Card.Root
                key={index}
                flexDirection="row"
                transition="all 0.2s ease-in-out" // Aplica la transición a todas las propiedades que cambien
                _hover={{
                  bg: "gray.900", // Cambia el color de fondo
                  transform: "scale(1.05)", // Escala el componente
                  boxShadow: "lg", // Agrega una sombra
                }}
                width="full"
                minW="fit"
                minH="200px"
                maxH="200px"
              >
                <Image
                  objectFit="cover"
                  maxW="200px"
                  src={`posts/${item.slug}/portada.jpeg`}
                  alt="Caffe Latte"
                />
                <Box>
                  <Card.Body>
                    <Card.Title textWrap="wrap">{item.matter.title}</Card.Title>
                    <Card.Description>
                      {item.matter.description}
                    </Card.Description>
                    <HStack mt="4">
                      <Badge>Hot</Badge>
                      <Badge>Caffeine</Badge>
                    </HStack>
                  </Card.Body>
                  <Card.Footer>
                    <Badge>10/10/22</Badge>
                    <Badge>Autor: {item.matter.author}</Badge>
                  </Card.Footer>
                </Box>
              </Card.Root>
            </Link>
          ))}
        </Stack>
      </Center>
    </>
  );
}
