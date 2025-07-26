import { Grid, GridItem, Box, Center, VStack, Image, Card, Tabs, Heading, Text, Flex } from "@chakra-ui/react";
import AboutMe from "./AboutMe/AboutMe";
import Blog from "./Blog/Blog";
export default function Home() {
  return (
    <>
      <Box height='100vh'  >
        <Flex justifyContent='center' bg="bg.subtle" height='full' overflowY='scroll'>
          <Grid
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
            width='90%'
          >
            <GridItem rowSpan={{ base: 5, sm: 1, lg: 5 }} colSpan={{ base: 1, md: 5, lg: 1, sm: 5 }}>
              <Box paddingTop={4} >
                <Center>
                  <Card.Root width='80%' >
                    <Card.Header>
                      <Center >
                        <Image alt="Kanekik"
                          src="portada.png"
                          boxSize="130px"
                          borderRadius='full'
                          border='md'
                          borderColor='white'
                        />
                      </Center>
                      <Center >
                        <Heading size='2xl'>Kanekik</Heading>
                      </Center>

                    </Card.Header>
                    <Card.Body>
                      <Box  >
                        <Text  >
                          Estudiante de Ingenieria Civil informatica y entusiasta de la ciberseguridad y los CTF's
                        </Text>
                      </Box>
                    </Card.Body>
                  </Card.Root>
                </Center>
              </Box>
            </GridItem>
            <GridItem rowSpan={5} colSpan={{ base: 3, sm: 5, md: 5, lg: 3 }} overflowY='auto' >
              <VStack paddingTop={4}>
                <Box width='full'>
                  <Tabs.Root
                    lazyMount
                    unmountOnExit
                    defaultValue='tab-1'
                  >
                    <Tabs.List>
                      <Tabs.Trigger value='tab-1'>Sobre Mí</Tabs.Trigger>
                      <Tabs.Trigger value='tab-2'>Blog</Tabs.Trigger>
                      <Tabs.Trigger value='tab-3'>Archvo</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value='tab-1' > <AboutMe></AboutMe></Tabs.Content>
                    <Tabs.Content value='tab-2' > <Blog></Blog></Tabs.Content>
                    <Tabs.Content value='tab-3' > HOLAAA</Tabs.Content>
                  </Tabs.Root>
                </Box>
              </VStack>
            </GridItem>
            <GridItem display={{ base: 'block', sm: 'none', md: 'none', lg: 'block' }} rowSpan={{ sm: 0, base: 5 }} colSpan={{ sm: 0, base: 1 }} >

              Tabla de contenido
            </GridItem>
          </Grid>


        </Flex>
      </Box >

    </>
  );
}
