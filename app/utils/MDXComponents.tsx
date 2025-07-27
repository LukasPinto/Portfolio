import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "@chakra-ui/react";

const components = {
  h1: (props: React.ComponentPropsWithoutRef<"h2">) => {
    <Heading size='5xl'{...props}>
      {props.children}
    </Heading>
  }
}
export function useMDXComponents(props: any) {

  return (<MDXRemote {...props} components={{ ...components }} />)
}
