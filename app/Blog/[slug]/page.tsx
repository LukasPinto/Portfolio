import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getFileBySlug, getFiles } from "../../utils/mdxFiles";
import { Heading } from "@chakra-ui/react";

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;
  const { source } = await getFileBySlug({ slug });
  // const source = "Some **bold text** in MDX, with a component ";

  console.log(source);
  return (
    <>
      {source}
      {/* < MDXRemote */}
      {/*   source={source} */}
      {/*   components={useMDXComponents(mdxComponents)} */}
      {/* /> */}
    </>
  );
}

export function generateStaticParams() {
  return [{ slug: "hola" }, { slug: "test" }];
}

export const dynamicParams = false;
