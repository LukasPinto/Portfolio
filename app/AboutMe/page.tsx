import {
  Card,
  Stack,
  Box,
  Heading,
  Text,
  Separator,
  Flex,
  Center,
} from "@chakra-ui/react";

import Tecnologias from "./Tecnologias";
import { getFileBySlug } from "../utils/mdxFiles";

export default async function AboutMe() {
  // const images = getFiles();
  const { source } = await getFileBySlug({ slug: "experiencia" });
  return (
    <>
      <Center
        maxHeight="lvh"
        overflow="auto"
        paddingX={{ base: "1rem", sm: "1rem", md: "1rem", lg: "2rem" }}
      >
        <Stack paddingTop={4} paddingBottom={4} marginY={4}>
          <Stack
            direction={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
          >
            <Box>
              <Heading size="4xl">Sobre mí</Heading>
              <Separator />

              <Text>
                Soy Ingeniero Civil Informático egresado, con enfoque en el
                desarrollo web y un profundo interés en el área de
                ciberseguridad. A lo largo de mi formación académica y
                experiencias prácticas, he cultivado habilidades sólidas en el
                diseño y construcción de aplicaciones web, junto con el estudio
                de forma autodidacta de ciberseguridad.
              </Text>
            </Box>
            <Box>
              <Heading size="4xl">Aspiraciones</Heading>

              <Separator />
              <Text>
                Estoy en constante búsqueda de nuevos aprendizajes y
                oportunidades que me permitan crecer profesionalmente, colaborar
                en proyectos innovadores y aportar con soluciones eficientes,
                seguras y sostenibles en el ámbito tecnológico.
              </Text>
            </Box>
          </Stack>

          <Heading size="4xl">Tecnologías</Heading>
          <Separator />
          <Flex
            wrap="wrap"
            maxH="100%"
            gap={2}
            justifyContent="center"
            width="100%"
          >
            <Tecnologias></Tecnologias>
          </Flex>
          <Heading size="4xl">Experiencia y proyectos</Heading>
          <Separator />
          <Box>
            {/* {source} */}
            {/* <Text> */}
            {/*   is simply dummy text of the printing and typesetting industry. */}
            {/*   Lorem Ipsum has been the industry's standard dummy text ever since */}
            {/*   the 1500s, when an unknown printer took a galley of type and */}
            {/*   scrambled it to make a type specimen book. It has survived not */}
            {/*   only five centuries, but also the leap into electronic */}
            {/*   typesetting, remaining essentially unchanged. It was popularised */}
            {/*   in the 1960s with the release of Letraset sheets containing Lorem */}
            {/*   Ipsum passages, and more recently with desktop publishing software */}
            {/*   like Aldus PageMaker including versions of Lorem Ipsum. */}
            {/* </Text> */}
          </Box>
        </Stack>
        <Box
          minWidth={{
            base: "0",
            sm: "0",
            md: "0",
            lg: "15rem",
            xl: "15rem",
          }}
        ></Box>
      </Center>
    </>
  );
}
