"use client";

import { Box, Card, HStack, Stack, Text } from "@chakra-ui/react";
import { experienceEntries } from "@/app/data/experience";
import SectionHeading from "@/app/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/app/ui/motion";

export default function ExperienceTimeline() {
  return (
    <Box as="section" id="experience" aria-labelledby="heading-experience">
      <SectionHeading id="heading-experience" size="3xl">
        Experiencia y proyectos
      </SectionHeading>
      <StaggerContainer>
        <Stack gap={0} position="relative" paddingLeft={{ base: 6, md: 8 }}>
          <Box
            position="absolute"
            left={{ base: "11px", md: "15px" }}
            top={2}
            bottom={2}
            width="2px"
            bgGradient="to-b"
            gradientFrom="cyan.400"
            gradientTo="teal.600"
            borderRadius="full"
            aria-hidden
          />
          {experienceEntries.map((entry) => (
            <StaggerItem key={entry.id}>
              <Box position="relative" paddingBottom={8}>
                <Box
                  position="absolute"
                  left={{ base: "-17px", md: "-21px" }}
                  top={4}
                  width={{ base: "12px", md: "14px" }}
                  height={{ base: "12px", md: "14px" }}
                  borderRadius="full"
                  bg="cyan.400"
                  borderWidth="2px"
                  borderColor="bg"
                  boxShadow="0 0 8px rgba(34, 211, 238, 0.5)"
                  aria-hidden
                />
                <Card.Root
                  bg="bg.subtle"
                  borderColor="border"
                  marginLeft={{ base: 2, md: 4 }}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "cyan.500",
                    boxShadow: "0 0 16px rgba(34, 211, 238, 0.15)",
                  }}
                >
                  <Card.Body>
                    <Stack gap={3}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        justifyContent="space-between"
                        align={{ sm: "center" }}
                        gap={2}
                      >
                        <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }}>
                          {entry.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          fontWeight="medium"
                          paddingX={2}
                          paddingY={0.5}
                          borderRadius="md"
                          bg="accent.muted"
                          color="accent"
                          alignSelf={{ base: "flex-start", sm: "center" }}
                          whiteSpace="nowrap"
                        >
                          {entry.period}
                        </Text>
                      </Stack>
                      {entry.organization && (
                        <Text fontSize="sm" color="cyan.400">
                          {entry.organization}
                        </Text>
                      )}
                      <Text color="fg.muted" fontSize="sm">
                        {entry.description}
                      </Text>
                      {entry.tags && entry.tags.length > 0 && (
                        <HStack gap={2} flexWrap="wrap">
                          {entry.tags.map((tag) => (
                            <Text
                              key={tag}
                              fontSize="xs"
                              paddingX={2}
                              paddingY={0.5}
                              borderRadius="full"
                              borderWidth="1px"
                              borderColor="border"
                              color="fg.muted"
                            >
                              {tag}
                            </Text>
                          ))}
                        </HStack>
                      )}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              </Box>
            </StaggerItem>
          ))}
        </Stack>
      </StaggerContainer>
    </Box>
  );
}
