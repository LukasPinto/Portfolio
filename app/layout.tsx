"use server";
import { Geist } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import { Provider } from "../components/ui/provider";
import NavBar from "./ui/NavBar";
import {
  Grid,
  GridItem,
  Box,
  Center,
  VStack,
  Image,
  Card,
  Tabs,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// const darkTheme = responsiveFontSizes(theme)
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <Provider>
          <Box height="100vh">
            <Flex
              justifyContent="center"
              bg="bg.subtle"
              height="full"
              overflow="scroll"
            >
              <Grid
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={2}
                width="90%"
                height="full"
              >
                <GridItem
                  rowSpan={{ base: 1, sm: 1, lg: 5, xl: 5 }}
                  colSpan={{ base: 5, md: 5, lg: 1, sm: 5 }}
                >
                  <Box paddingTop={4}>
                    <Center>
                      <Card.Root width="80%">
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
                          <Box>
                            <Text>
                              Estudiante de Ingenieria Civil informatica y
                              entusiasta de la ciberseguridad y los CTF's
                            </Text>
                          </Box>
                        </Card.Body>
                      </Card.Root>
                    </Center>
                  </Box>
                </GridItem>
                <GridItem
                  rowSpan={{ base: 4, sm: 4, md: 5, lg: 5 }}
                  colSpan={{ base: 5, sm: 5, md: 5, lg: 3 }}
                >
                  <Box display="block" width="full">
                    <NavBar></NavBar>
                    {children}
                  </Box>
                </GridItem>
                <GridItem
                  display={{
                    base: "none",
                    sm: "none",
                    md: "none",
                    lg: "block",
                  }}
                  rowSpan={{ base: 0, sm: 0, md: 5, lg: 5, xl: 1 }}
                  colSpan={{ base: 0, sm: 0, md: 1, lg: 1, xl: 1 }}
                >
                  Tabla de contenido
                </GridItem>
              </Grid>
            </Flex>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
