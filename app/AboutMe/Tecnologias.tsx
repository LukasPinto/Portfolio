'use server'
import { Card, Box, Center, Image, Flex, AbsoluteCenter } from "@chakra-ui/react"
import { getFiles } from "../utils/mdxFiles.js";
export default async function Tecnologias() {
  const images = await getFiles(['public', 'tecnologias']);
  return (
    <>
      {console.log(images)}
      {
        images.map((img, index) => (
          <Box key={index} lg={{ flexBasis: '20%' }} md={{ flexBasis: '25%' }} sm={{ flexBasis: '50%' }}>
            <Center width='100%' height='full'>
              <Card.Root variant='outline' padding={2} height='full' >
                <Center height='full'>
                  <Image
                    fit='contain'
                    height='80%'
                    maxHeight='300px'
                    srcSet={`/tecnologias/${img}`}
                    src={`/tecnologias/${img}`}
                  />
                </Center>


              </Card.Root >
            </Center>
          </Box>
        ))
      }
    </>
  )

}



