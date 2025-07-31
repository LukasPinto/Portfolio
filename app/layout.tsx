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
import CardAboutMe from "./ui/CardAboutMe";

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
    <html lang="en" className={roboto.variable} suppressHydrationWarning >
      <body >
        <Provider>
          <Grid
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(5, 1fr)"
            width="lvw"
            maxHeight={{
              base: "lvh",
              sm: "lvh",
              md: "lvh",
              lg: "lvh",
              xl: "lvh",
            }}
            minHeight="lvh"
            overflow="auto"
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
              top={{ base: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
              alignSelf="start" // <--- Importante para que el item no se estire y permita el sticky
            >
              <CardAboutMe></CardAboutMe>
            </GridItem>
            <GridItem
              rowSpan={{ base: 4, sm: 4, md: 5, lg: 5 }}
              colSpan={{ base: 5, sm: 5, md: 5, lg: 4 }}
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
              <Box width="full" maxHeight="full">
                <NavBar></NavBar>

                {children}
              </Box>
            </GridItem>
          </Grid>
        </Provider>
      </body>
    </html>
  );
}
