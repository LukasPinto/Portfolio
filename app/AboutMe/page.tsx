import {
  Card,
  Stack,
  Box,
  Heading,
  Text,
  Separator,
  Flex,
  Center,
  Image,
} from "@chakra-ui/react";
// import { getFiles } from '../mdxFiles.js'
// import { promises as fs } from 'node:fs'
import path from "node:path";
import { use } from "react";
import Tecnologias from "./Tecnologias";

// async function getFiles(pathDir: any) {
//   const directoryPath = path.join(process.cwd(), pathDir);
//   let files: string[] = []
//   let errroReading = null;
//
//   try {
//     const items = await fs.readdir(directoryPath, { withFileTypes: true });
//     files = items
//       .filter(item => item.isFile())
//       .map(item => item.name)
//   } catch {
//     console.log('error al leer el directorio')
//   }
//   return files
// }

export default function AboutMe() {
  // const images = getFiles();
  return (
    <>
      <Center maxH="full" width="full">
        <Stack paddingTop={4} paddingBottom={4} maxH="auto">
          <Stack
            direction={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
            marginLeft={2}
            marginRight={2}
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
            <Text>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Box>
        </Stack>
      </Center>
    </>
  );
}

// AboutMe.getInitalProps = async () => {
//   const images = await getFiles('/public/teclogias')
//   console.log(images)
//   return {
//     props: { images }
//   }
// }
