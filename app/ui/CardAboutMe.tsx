"use client";

import {
  Card,
  Center,
  Image,
  Box,
  Text,
  Stack,
  Link,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import { motion } from "framer-motion";
import { FadeIn } from "./motion";
import { useMounted } from "@/app/hooks/useMounted";

const socialLinks = [
  {
    href: "https://github.com/LukasPinto",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://app.hackthebox.com/profile/824616",
    icon: SiHackthebox,
    label: "HackTheBox",
  },
  {
    href: "mailto:lukaspintogonzalez@gmail.com",
    icon: IoMdMail,
    label: "Email",
  },
];

function AvatarRing() {
  const mounted = useMounted();

  return (
    <Box
      position="relative"
      flexShrink={0}
      boxSize={{ base: "64px", lg: "130px" }}
    >
      {mounted ? (
        <motion.div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "9999px",
            background:
              "linear-gradient(to right, var(--chakra-colors-cyan-400), var(--chakra-colors-teal-500))",
            opacity: 0.7,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : (
        <Box
          position="absolute"
          inset="-3px"
          borderRadius="full"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="teal.500"
          opacity={0.7}
        />
      )}
      <Image
        alt="Lukas Pinto"
        src="/portada.png"
        boxSize="full"
        borderRadius="full"
        border="3px solid"
        borderColor="bg.subtle"
        position="relative"
        zIndex={1}
      />
    </Box>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  const mounted = useMounted();

  return (
    <HStack gap={compact ? 2 : 3} justify="center">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          borderRadius="full"
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          aria-label={label}
        >
          {mounted ? (
            <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
              <Box
                bg="bg.muted"
                padding={compact ? 2 : 3}
                borderRadius="full"
                color="fg.muted"
                borderWidth="1px"
                borderColor="border"
                _hover={{
                  color: "cyan.400",
                  borderColor: "cyan.400",
                }}
              >
                <Icon size={compact ? 16 : 20} />
              </Box>
            </motion.div>
          ) : (
            <Box
              bg="bg.muted"
              padding={compact ? 2 : 3}
              borderRadius="full"
              color="fg.muted"
              borderWidth="1px"
              borderColor="border"
            >
              <Icon size={compact ? 16 : 20} />
            </Box>
          )}
        </Link>
      ))}
    </HStack>
  );
}

export default function CardAboutMe() {
  return (
    <Box padding={{ base: 3, lg: 4 }}>
      <FadeIn>
        <Card.Root
          width="100%"
          bg="bg.subtle"
          borderColor="border"
          css={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <Card.Body padding={{ base: 3, lg: 6 }}>
            <Flex
              direction={{ base: "row", lg: "column" }}
              align={{ base: "center", lg: "center" }}
              gap={{ base: 3, lg: 6 }}
            >
              <AvatarRing />

              <Stack
                gap={{ base: 1, lg: 4 }}
                flex={1}
                minWidth={0}
                align={{ base: "flex-start", lg: "center" }}
                textAlign={{ base: "left", lg: "center" }}
              >
                <Text fontSize={{ base: "lg", lg: "2xl" }} fontWeight="bold" color="cyan.400">
                  Lukas Pinto
                </Text>
                <Text
                  fontSize={{ base: "xs", lg: "md" }}
                  color="fg.muted"
                  fontStyle={{ base: "normal", lg: "italic" }}
                  lineHeight="short"
                >
                  Ingeniero Civil Informático · Desarrollo web y ciberseguridad
                </Text>
                <Box display={{ base: "none", lg: "block" }} width="full">
                  <Center>
                    <SocialLinks />
                  </Center>
                </Box>
              </Stack>

              <Box display={{ base: "block", lg: "none" }} flexShrink={0}>
                <SocialLinks compact />
              </Box>
            </Flex>
          </Card.Body>
        </Card.Root>
      </FadeIn>
    </Box>
  );
}
