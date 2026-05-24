"use client";

import { Card, Center, Image } from "@chakra-ui/react";
import { HoverLift } from "./motion";

export default function TecnologiasGrid({ images }: { images: string[] }) {
  return (
    <>
      {images.map((img) => (
        <HoverLift key={img}>
          <Center height={{ base: "5rem", md: "7rem" }} width="full">
            <Card.Root
              variant="outline"
              padding={2}
              height="full"
              width="full"
              borderColor="border"
              bg="bg.subtle"
              transition="all 0.2s"
              _hover={{
                borderColor: "cyan.500",
                boxShadow: "0 0 16px rgba(34, 211, 238, 0.25)",
              }}
            >
              <Center height="full">
                <Image
                  alt={img.replace(/\.[^.]+$/, "")}
                  fit="contain"
                  height="70%"
                  src={`/tecnologias/${img}`}
                />
              </Center>
            </Card.Root>
          </Center>
        </HoverLift>
      ))}
    </>
  );
}
