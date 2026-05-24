"use client";

import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import CardAboutMe from "./CardAboutMe";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box position="relative" width="100%">
      <Box
        aria-hidden
        position="fixed"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        css={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(20, 184, 166, 0.08), transparent)
          `,
        }}
      />
      <Box
        aria-hidden
        position="fixed"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        opacity={0.4}
        css={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        width="100%"
        minHeight="100dvh"
      >
        <Box
          as="aside"
          aria-label="Perfil"
          flexShrink={0}
          width={{ base: "100%", lg: "min(300px, 24vw)" }}
          maxWidth={{ lg: "320px" }}
          position={{ lg: "sticky" }}
          top={{ lg: 0 }}
          alignSelf={{ lg: "flex-start" }}
          borderBottomWidth={{ base: "1px", lg: 0 }}
          borderRightWidth={{ lg: "1px" }}
          borderColor="border"
          bg={{ base: "bg.subtle", lg: "transparent" }}
        >
          <CardAboutMe />
        </Box>

        <Flex direction="column" flex={1} minWidth={0} width="100%">
          <NavBar />
          <Box
            as="main"
            id="main-content"
            flex={1}
            width="100%"
            paddingBottom={{ base: 6, md: 8 }}
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
