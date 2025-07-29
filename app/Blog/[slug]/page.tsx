import { getAllMdxFiles, getFileBySlug, plugins } from "../../utils/mdxFiles";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { useMDXComponents } from "@/mdx-components";
import { Box, Stack, Heading, Image, Badge, Center } from "@chakra-ui/react";
import TableOfContent from "../../ui/Toc";
import "../../styles/code.css";
import "../../styles/global.css";
export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  const file = await getFileBySlug({ slug });

  const options: MDXRemoteOptions = {
    parseFrontmatter: true,
    mdxOptions: {
      ...plugins,
    },
  };
  return (
    <>
      {console.log(file.matter)}
      <Stack direction="row" paddingBottom="5rem" maxHeight="lvh">
        <Box overflowY="scroll" maxHeight="lvh" paddingX={20} paddingY={2}>
          <Stack direction="column">
            <Center>
              <Box w="50rem">
                <Heading size="4xl">{file.matter.title as string}</Heading>
              </Box>
            </Center>
            <Center>
              <Box w="50rem">
                <Badge>
                  Publicado el{" "}
                  {(file.matter.date as string)
                    .split(" ")[0]
                    .replaceAll("-", "/")}
                </Badge>
              </Box>
            </Center>
            <Center>
              <Image
                objectFit="cover"
                w="50rem"
                src={`${
                  (file.matter.image as { path: string }).path as string
                }`}
                rounded="md"
                marginTop={3}
              />
            </Center>
            <Center>
              <Box display="flex" justifyContent="space-between" w="50rem">
                <Badge>Autor: {file.matter.author as string}</Badge>
                <Badge>
                  Tiempo de lectura:{" "}
                  {Math.round((file.readingTime as any).minutes as number) +
                    " "}
                  minutos
                </Badge>
              </Box>
            </Center>
          </Stack>
          <MDXRemote
            source={file.source}
            components={useMDXComponents({})}
            options={options}
          />

          {/*
            // esto solo siver para trabajar con unified
          <div
            dangerouslySetInnerHTML={{ __html: file.result.value.toString() }}
          ></div> */}
        </Box>
        <Box
          width="40%"
          alignSelf="start"
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
          }}
          position="sticky"
          top="4rem"
          height="fit-content"
          paddingRight={4}
        >
          <TableOfContent
            content={file.toc}
            slug={slug}
            matter={file.matter}
          ></TableOfContent>
        </Box>
      </Stack>
    </>
  );
}

export async function generateStaticParams() {
  const files = await getAllMdxFiles();
  const pages = files.map((item: any) => {
    slug: item.slug;
  });
  console.log("static params", files);
  return [pages];
}

export const dynamicParams = false;
