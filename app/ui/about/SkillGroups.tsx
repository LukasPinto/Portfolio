"use client";

import {
  Box,
  Card,
  Center,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { skillGroups } from "@/app/data/skills";
import SectionHeading from "@/app/ui/SectionHeading";
import { HoverLift } from "@/app/ui/motion";

export default function SkillGroups() {
  return (
    <Box
      as="section"
      id="tech"
      aria-labelledby="heading-tech"
      bg="bg.subtle"
      padding={{ base: 4, md: 6 }}
      borderRadius={{ base: "lg", md: "xl" }}
      width="100%"
    >
      <SectionHeading id="heading-tech" size="3xl">
        Tecnologías
      </SectionHeading>
      <Stack gap={6}>
        {skillGroups.map(({ label, items }) => (
          <Box key={label}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="fg.muted"
              marginBottom={3}
            >
              {label}
            </Text>
            <SimpleGrid
              columns={{ base: 2, sm: 3, md: items.length > 2 ? items.length : 3 }}
              gap={{ base: 2, md: 3 }}
              maxWidth="full"
            >
              {items.map((item) => (
                <HoverLift key={item}>
                  <Center height={{ base: "5rem", md: "6rem" }} width="full">
                    <Card.Root
                      variant="outline"
                      padding={2}
                      height="full"
                      width="full"
                      borderColor="border"
                      bg="bg"
                      transition="all 0.2s"
                      _hover={{
                        borderColor: "cyan.500",
                        boxShadow: "0 0 16px rgba(34, 211, 238, 0.25)",
                      }}
                    >
                      <Center height="full">
                        <Image
                          alt={item}
                          fit="contain"
                          height="70%"
                          src={`/tecnologias/${item}.png`}
                        />
                      </Center>
                    </Card.Root>
                  </Center>
                </HoverLift>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
