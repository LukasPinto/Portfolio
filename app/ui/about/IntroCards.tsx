"use client";

import { Box, Card, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { LuUser, LuTarget } from "react-icons/lu";
import SectionHeading from "@/app/ui/SectionHeading";
import { HoverLift } from "@/app/ui/motion";

const cards = [
  {
    id: "heading-intro",
    title: "Quién soy",
    icon: LuUser,
    body:
      "Soy Ingeniero Civil Informático egresado, con enfoque en el desarrollo web y un profundo interés en el área de ciberseguridad. A lo largo de mi formación académica y experiencias prácticas, he cultivado habilidades sólidas en el diseño y construcción de aplicaciones web, junto con el estudio de forma autodidacta de ciberseguridad.",
  },
  {
    id: "heading-aspirations",
    title: "Hacia dónde voy",
    icon: LuTarget,
    body:
      "Estoy en constante búsqueda de nuevos aprendizajes y oportunidades que me permitan crecer profesionalmente, colaborar en proyectos innovadores y aportar con soluciones eficientes, seguras y sostenibles en el ámbito tecnológico.",
  },
] as const;

export default function IntroCards() {
  return (
    <Box as="section" id="intro" aria-labelledby="heading-intro">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {cards.map(({ id, title, icon: Icon, body }) => (
          <HoverLift key={id}>
            <Card.Root
              height="full"
              bg="bg.subtle"
              borderColor="border"
              transition="all 0.2s"
              _hover={{
                borderColor: "cyan.500",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
              }}
            >
              <Card.Body>
                <Stack gap={4}>
                  <Box
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    width="2.5rem"
                    height="2.5rem"
                    borderRadius="lg"
                    bg="accent.muted"
                    color="accent"
                    aria-hidden
                  >
                    <Icon size={20} />
                  </Box>
                  <SectionHeading id={id} size="2xl">
                    {title}
                  </SectionHeading>
                  <Text color="fg.muted">{body}</Text>
                </Stack>
              </Card.Body>
            </Card.Root>
          </HoverLift>
        ))}
      </SimpleGrid>
    </Box>
  );
}
