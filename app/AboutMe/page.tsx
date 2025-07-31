import { Stack, Box, Heading, Text, Separator, Flex } from "@chakra-ui/react";

import Tecnologias from "@/app/ui/Tecnologias";
import { getFileBySlug, plugins } from "@/app/utils/mdxFiles";
import { type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import MDXRender from "../ui/MDXRender";

const options: MDXRemoteOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    ...plugins,
  },
};

export default async function AboutMe() {
  // const images = getFiles();

  const file = await getFileBySlug({ slug: "experiencia" });
  return (
    <>
      <Stack
        display="flex"
        direction="row"
        paddingX={{
          base: "1rem",
          sm: "1rem",
          md: "1rem",
          lg: "2rem",
          xl: "2rem",
        }}
        width={{ base: "full", sm: "full", md: "full", lg: "90%", xl: "85%" }}
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
            <MDXRender file={file} opts={options}></MDXRender>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
