"use client";
import { useRouter } from "next/navigation";
import { VStack, Box, Tabs } from "@chakra-ui/react";
import AboutMe from "../AboutMe/page";
import Blog from "../Blog/page";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <VStack paddingTop={4}>
        <Box width="full">
          <Tabs.Root>
            <Tabs.List>
              <Link href="/AboutMe">
                <Tabs.Trigger value="AboutMe">Sobre Mí</Tabs.Trigger>
              </Link>
              <Link href="/Blog">
                <Tabs.Trigger value="Blog">Blog</Tabs.Trigger>
              </Link>
              {/* <Tabs.Trigger value="">Archivo</Tabs.Trigger> */}
            </Tabs.List>
            {/* ... */}
          </Tabs.Root>
          {/* <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
            <Tabs.List>
              <Tabs.Trigger value="tab-1">Sobre Mí</Tabs.Trigger>
              <Tabs.Trigger value="tab-2">Blog</Tabs.Trigger>
              <Tabs.Trigger value="tab-3">Archvo</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab-1">
              {" "}
              <AboutMe></AboutMe>
            </Tabs.Content>
            <Tabs.Content value="tab-2">
              {" "}
              <Blog></Blog>
            </Tabs.Content>
            <Tabs.Content value="tab-3"> HOLAAA</Tabs.Content>
          </Tabs.Root> */}
        </Box>
      </VStack>
    </>
  );
}
