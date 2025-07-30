import {
  Card,
  Center,
  Image,
  Box,
  Heading,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";
import { IoMdMail } from "react-icons/io";

export default function CardAboutMe() {
  return (
    <Box
      paddingX={4}
      minHeight={{ base: "100%", sm: "100%", md: "100%", lg: "lvh", xl: "lvh" }}
    >
      <Center paddingY={4} height={{ base: "full", lg: "lvh", xl: "lvh" }}>
        <Card.Root width="100%" height="full">
          <Card.Header>
            <Center>
              <Image
                alt="Kanekik"
                src="/portada.png"
                boxSize="130px"
                borderRadius="full"
                border="md"
                borderColor="white"
              />
            </Center>
            <Center>
              <Heading size="2xl">Kanekik</Heading>
            </Center>
          </Card.Header>
          <Card.Body>
            <Stack
              display="flex"
              direction="column"
              justifyContent="space-between"
              height="full"
            >
              <Text textAlign="center">
                Estudiante de Ingenieria Civil informatica y entusiasta de la
                ciberseguridad y los CTF's
              </Text>

              <Center gap={5}>
                <Link
                  href="https://github.com/LukasPinto"
                  borderRadius="full"
                  target="_blank"
                >
                  <Box
                    background="#18181b"
                    padding={2}
                    borderRadius="full"
                    color="#a1a1aa"
                    _hover={{
                      color: "#e4e4e7",
                      background: "#27272a",
                    }}
                  >
                    <FaGithub />
                  </Box>
                </Link>
                <Link
                  href="https://app.hackthebox.com/profile/824616"
                  borderRadius="full"
                  target="_blank"
                >
                  <Box
                    background="#18181b"
                    padding={2}
                    borderRadius="full"
                    color="#a1a1aa"
                    _hover={{
                      color: "#e4e4e7",
                      background: "#27272a",
                    }}
                  >
                    <SiHackthebox />
                  </Box>
                </Link>
                <Link
                  href="mailto:lukaspintogonzalez@gmail.com"
                  borderRadius="full"
                >
                  <Box
                    background="#18181b"
                    padding={2}
                    borderRadius="full"
                    color="#a1a1aa"
                    _hover={{
                      color: "#e4e4e7",
                      background: "#27272a",
                    }}
                  >
                    <IoMdMail />
                  </Box>
                </Link>
              </Center>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Center>
    </Box>
  );
}
