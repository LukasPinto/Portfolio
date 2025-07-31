"use server";
import { Card, Box, Center, Image } from "@chakra-ui/react";
import { getFiles } from "../utils/mdxFiles";
export default async function Tecnologias() {
  const images = await getFiles(["public", "tecnologias"]);
  return (
    <>
      {images.map((img: string) => (
        <Box key={img}>
          <Center height="10rem" w="10rem">
            <Card.Root
              zIndex={-1000}
              variant="outline"
              padding={2}
              height="full"
              width="full"
            >
              <Center height="full">
                <Image
                  alt={img}
                  fit="contain"
                  height="80%"
                  srcSet={`/tecnologias/${img}`}
                  src={`/tecnologias/${img}`}
                />
              </Center>
            </Card.Root>
          </Center>
        </Box>
      ))}
    </>
  );
}
