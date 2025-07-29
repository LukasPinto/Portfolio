"use server";
import "./globals.css";
import { Roboto } from "next/font/google";

import { Provider } from "../components/ui/provider";
import NavBar from "./ui/NavBar";
import {
  Grid,
  GridItem,
  Box,
  Center,
  Image,
  Card,
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
          <Box height="lvh" width="lvw">
            <Grid
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(5, 1fr)"
              width="full"
              maxHeight="lvh"
            >
              <GridItem
                rowSpan={{ base: 1, sm: 1, md: 1, lg: 5, xl: 5 }}
                colSpan={{ base: 5, sm: 5, md: 5, lg: 1, xl: 1 }}
                position={{
                  base: "static",
                  sm: "static",
                  md: "static",
                  lg: "sticky",
                  xl: "sticky",
                }}
                top={{ base: 0, sm: 0, md: 0, lg: 1, xl: 1 }}
                alignSelf="start" // <--- Importante para que el item no se estire y permita el sticky
              >
                <Box paddingTop={4} paddingX={4}>
                  <Center>
                    <Card.Root width="100%">
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
                colSpan={{ base: 5, sm: 5, md: 5, lg: 4 }}
              >
                <Box display="block" width="full" maxHeight="100%">
                  <Box
                    position={{
                      base: "sticky",
                      sm: "sticky",
                      md: "sticky",
                      lg: "sticky",
                      xl: "sticky",
                    }}
                    top={{ base: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
                  >
                    <NavBar></NavBar>
                  </Box>
                  {children}
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
