"use client";
import { useRouter } from "next/navigation";
import { VStack, Box, Tabs } from "@chakra-ui/react";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <Box
        position={{
          base: "sticky",
          sm: "sticky",
          md: "sticky",
          lg: "sticky",
          xl: "sticky",
        }}
        top={{ base: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
        zIndex={100}
        alignSelf="start"
      >
        <VStack paddingTop={4} width="100%" background="#09090b">
          <Box width="full">
            <Tabs.Root>
              <Tabs.List>
                <Link href="/AboutMe">
                  <Tabs.Trigger value="AboutMe">Sobre Mí</Tabs.Trigger>
                </Link>
                <Link href="/Blog">
                  <Tabs.Trigger value="Blog">Blog</Tabs.Trigger>
                </Link>
              </Tabs.List>
              {/* ... */}
            </Tabs.Root>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
