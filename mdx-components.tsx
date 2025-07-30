import type { MDXComponents } from "mdx/types";
import { Center, chakra, Code } from "@chakra-ui/react";
import {
  Heading,
  Text,
  Blockquote,
  Table,
  Separator,
  List,
  Link,
} from "@chakra-ui/react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <div className="mdx-wrapper">{children}</div>,
    h1: ({ children }) => (
      <>
        <Heading
          id={`${String(children).toLocaleLowerCase().replace(/\s/g, "-")}`}
          className="toc spacing"
          size="4xl"
        >
          {children}
        </Heading>
      </>
    ),
    h2: ({ children }) => (
      <Heading
        id={`${String(children).toLocaleLowerCase().replace(/\s/g, "-")}`}
        className="toc spacing"
        size="3xl"
      >
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading
        id={`${String(children).toLocaleLowerCase().replace(/\s/g, "-")}`}
        className="toc spacing"
        size="2xl"
      >
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading
        id={`${String(children).toLocaleLowerCase().replace(/\s/g, "-")}`}
        className="toc spacing"
        size="xl"
      >
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading
        id={`${String(children).toLocaleLowerCase().replace(/\s/g, "-")}`}
        className="toc spacing"
        size="lg"
      >
        {children}
      </Heading>
    ),
    // p: (props) => <Text {...props}>{props.children}</Text>,
    blockquote: ({ children }) => (
      <Blockquote.Root>
        <Blockquote.Content />
        <Blockquote.Caption>
          <cite>{children}</cite>
        </Blockquote.Caption>
      </Blockquote.Root>
    ),

    table: (props) => (
      <Table.Root size="md" {...props}>
        {props.children}
      </Table.Root>
    ),
    thead: ({ children }) => <Table.Header>{children}</Table.Header>,
    tr: ({ children }) => <Table.Row>{children}</Table.Row>,
    th: (props) => (
      <Table.ColumnHeader {...props}>{props.children}</Table.ColumnHeader>
    ),
    tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
    td: (props) => <Table.Cell {...props}>{props.children}</Table.Cell>,
    hr: (props) => <Separator marginY={2} {...props}></Separator>,
    ul: (props) => (
      <List.Root as="ul" ps={2}>
        {props.children}
      </List.Root>
    ),
    ol: (props) => (
      <List.Root as="ol" ps={2}>
        {props.children}
      </List.Root>
    ),
    li: (props) => <List.Item {...props}>{props.children}</List.Item>,
    a: (props) => (
      <Link colorPalette="teal" {...props}>
        {props.children}
      </Link>
    ),

    code: (props) => (
      <>
        {props?.className === undefined ? (
          <code className="inline-code" {...props}>
            {" "}
            {props.children}
          </code>
        ) : (
          <code {...props}> {props.children}</code>
        )}
      </>
    ),
    img: (props) => (
      <Center width="100%">
        <img {...props}>{props.children}</img>
      </Center>
    ),
    p: (props) => (
      <>
        <p className="spacing">{props.children} </p>
      </>
    ),

    ...components,
  };
}
