import type { MDXComponents } from "mdx/types";
import { chakra } from "@chakra-ui/react";
import { Heading, Text, Blockquote } from "@chakra-ui/react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <Heading size="4xl">{children}</Heading>,
    h2: ({ children }) => <Heading size="3xl">{children}</Heading>,
    h3: ({ children }) => <Heading size="2xl">{children}</Heading>,
    h4: ({ children }) => <Heading size="xl">{children}</Heading>,
    h5: ({ children }) => <Heading size="lg">{children}</Heading>,
    p: ({ children }) => <Text>{children}</Text>,
    blockquote: ({ children }) => (
      <Blockquote.Root>
        <Blockquote.Content />
        <Blockquote.Caption>
          <cite>{children}</cite>
        </Blockquote.Caption>
      </Blockquote.Root>
    ),
    wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
    ...components,
  };
}
