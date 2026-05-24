import {
  getMdxSlugs,
  getMdxPost,
  plugins,
} from "@/app/utils/mdxFiles";
import { type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import {
  Box,
  Stack,
  Heading,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";
import TableOfContent from "@/app/ui/Toc";
import "@/app/styles/code.css";
import "@/app/styles/global.css";
import "@/app/styles/mdx-prose.css";
import MDXRender from "@/app/ui/MDXRender";
import { FadeIn } from "@/app/ui/motion";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return date.split(" ")[0].replaceAll("-", "/");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const file = await getMdxPost(slug);

  return {
    title: file.matter.title,
    description: file.matter.description,
    openGraph: {
      title: file.matter.title,
      description: file.matter.description,
      type: "article",
      publishedTime: file.matter.date,
      authors: [file.matter.author],
      images: [file.matter.image.path],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const file = await getMdxPost(slug);

  const options: MDXRemoteOptions = {
    parseFrontmatter: true,
    mdxOptions: {
      ...plugins,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: file.matter.title,
    description: file.matter.description,
    author: { "@type": "Person", name: file.matter.author },
    datePublished: file.matter.date,
    image: file.matter.image.path,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        paddingX={{ base: 4, sm: 5, lg: 8 }}
        paddingBottom={{ base: 8, md: 12 }}
        gap={{ base: 4, lg: 6 }}
        width="100%"
        maxWidth="7xl"
        marginX="auto"
      >
        <Box
          as="article"
          order={{ base: 2, lg: 1 }}
          paddingY={2}
          flex={1}
          minWidth={0}
          width={{ base: "100%", lg: "70%" }}
        >
          <Stack direction="column" gap={4} maxWidth="3xl" marginX="auto">
            <FadeIn>
              <Box as="header">
                <Heading as="h1" size={{ base: "2xl", md: "4xl" }} colorPalette="cyan">
                  {file.matter.title}
                </Heading>
                <HStack gap={2} flexWrap="wrap" marginTop={3}>
                  <Badge colorPalette="cyan" variant="subtle">
                    Publicado el {formatDate(file.matter.date)}
                  </Badge>
                  {file.matter.categories.map((cat) => (
                    <Badge key={cat} variant="outline">
                      {cat}
                    </Badge>
                  ))}
                </HStack>
                {file.matter.tags?.length > 0 && (
                  <HStack gap={2} flexWrap="wrap" marginTop={2}>
                    {file.matter.tags.map((tag) => (
                      <Badge key={tag} variant="subtle" colorPalette="teal" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                )}
              </Box>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border.emphasized"
                boxShadow="0 8px 32px rgba(34, 211, 238, 0.1)"
              >
                <Image
                  objectFit="cover"
                  width="full"
                  maxHeight="24rem"
                  src={file.matter.image.path}
                  alt={file.matter.title}
                />
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="to-t"
                  gradientFrom="rgba(0,0,0,0.5)"
                  gradientTo="transparent"
                  pointerEvents="none"
                />
              </Box>
            </FadeIn>
            <FadeIn delay={0.15}>
              <HStack flexWrap="wrap" gap={2} justifyContent="space-between">
                <Badge variant="outline">Autor: {file.matter.author}</Badge>
                <Badge variant="outline">
                  Tiempo de lectura: {Math.round(file.readingTime.minutes)} min
                </Badge>
              </HStack>
            </FadeIn>
          </Stack>
          <Box maxWidth="3xl" marginX="auto" marginTop={6}>
            <MDXRender file={file} opts={options} />
          </Box>
        </Box>
        <Box
          order={{ base: 1, lg: 2 }}
          width={{ base: "100%", lg: "30%" }}
          flexShrink={0}
          minWidth={0}
          alignSelf={{ lg: "stretch" }}
        >
          <TableOfContent content={file.toc} slug={slug} />
        </Box>
      </Stack>
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getMdxSlugs();
  return slugs
    .filter((slug) => slug !== "experiencia")
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;
