"use client"
import { VStack, Box, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
export default function NavBar() {
  const pathname: string = usePathname()

  const [value, setValue] = useState<string | null>('')
  useEffect(() => {
    setValue(pathname.split('/')[1]);

  }, [pathname])
  // console.log(pathname.split('/')[1])
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
            <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
              <Tabs.List>

                <Link href="/AboutMe">
                  <Box
                    transition="all 0.2s ease-in-out" // Aplica la transición a todas las propiedades que cambien
                    _hover={{
                      bg: "gray.900", // Cambia el color de fondo
                      transform: "scale(1.02)", // Escala el componente
                      boxShadow: "lg", // Agrega una sombra
                    }}
                    borderTopRadius='md'
                  >
                    <Tabs.Trigger value="AboutMe">Sobre Mí</Tabs.Trigger>
                  </Box>

                </Link>
                <Link href="/Blog">
                  <Box
                    transition="all 0.2s ease-in-out" // Aplica la transición a todas las propiedades que cambien
                    _hover={{
                      bg: "gray.900", // Cambia el color de fondo
                      transform: "scale(1.02)", // Escala el componente
                      boxShadow: "lg", // Agrega una sombra
                    }}
                    borderTopRadius='md'>
                    <Tabs.Trigger value="Blog">Blog</Tabs.Trigger>
                  </Box>
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
