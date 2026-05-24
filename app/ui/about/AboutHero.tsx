"use client";

import { Box, Card, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { FaGraduationCap, FaCode, FaShieldAlt } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";
import { FadeIn } from "@/app/ui/motion";

const chips = [
  { icon: FaGraduationCap, label: "Ingeniero Civil Informático" },
  { icon: FaCode, label: "Desarrollo Web" },
  { icon: FaShieldAlt, label: "Ciberseguridad" },
  { icon: SiHackthebox, label: "CTF / HackTheBox" },
] as const;

export default function AboutHero() {
  return (
    <FadeIn>
      <Box as="header" position="relative">
        <Box
          position="absolute"
          inset="-1px"
          borderRadius="xl"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="teal.500"
          opacity={0.6}
          aria-hidden
        />
        <Card.Root
          position="relative"
          bg="bg.subtle"
          borderColor="transparent"
          borderRadius="xl"
          padding={{ base: 4, md: 6, lg: 8 }}
          css={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.12)",
          }}
        >
          <Stack gap={4}>
            <Heading
              as="h1"
              fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              bgGradient="to-r"
              gradientFrom="cyan.300"
              gradientTo="teal.400"
              bgClip="text"
            >
              Construyo software seguro y resolutivo
            </Heading>
            <Text color="fg.muted" fontSize={{ base: "md", md: "lg" }}>
              Desarrollo Web · Ciberseguridad · CTF
            </Text>
            <HStack gap={2} flexWrap="wrap">
              {chips.map(({ icon: Icon, label }) => (
                <HStack
                  key={label}
                  gap={2}
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.muted"
                  fontSize="sm"
                  color="fg.muted"
                >
                  <Box as="span" color="cyan.400" aria-hidden>
                    <Icon size={14} />
                  </Box>
                  <Text as="span">{label}</Text>
                </HStack>
              ))}
            </HStack>
          </Stack>
        </Card.Root>
      </Box>
    </FadeIn>
  );
}
