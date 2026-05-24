import type { MDXComponents } from "mdx/types";
import { Children, Fragment, isValidElement, type ReactNode } from "react";
import {
  Heading,
  Box,
  Table,
  List,
  Link,
  Code,
  Text,
} from "@chakra-ui/react";
import MdxFigure, { isMdxBlockElement } from "@/app/ui/mdx/MdxFigure";
import MdxPre from "@/app/ui/mdx/MdxPre";
import MdxCallout from "@/app/ui/mdx/MdxCallout";

function slugify(text: string) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function isExternalHref(href?: string) {
  return href?.startsWith("http") ?? false;
}

function isBlankText(child: ReactNode) {
  return typeof child === "string" && child.trim() === "";
}

function paragraphContainsBlockChild(children: ReactNode) {
  return Children.toArray(children).some(isMdxBlockElement);
}

function paragraphIsOnlyBlockChildren(children: ReactNode) {
  return Children.toArray(children)
    .filter((child) => !isBlankText(child))
    .every(isMdxBlockElement);
}

const paragraphStyles = {
  className: "spacing",
  color: "fg.muted",
  lineHeight: "tall",
} as const;

function MdxParagraph({ children }: { children: ReactNode }) {
  if (paragraphContainsBlockChild(children)) {
    if (paragraphIsOnlyBlockChildren(children)) {
      return <Fragment>{children}</Fragment>;
    }

    return <Box as="div" {...paragraphStyles}>{children}</Box>;
  }

  return (
    <Text as="p" {...paragraphStyles}>
      {children}
    </Text>
  );
}

function HeadingWithAnchor({
  as,
  size,
  colorPalette,
  children,
}: {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  size: "4xl" | "3xl" | "2xl" | "xl" | "lg";
  colorPalette?: string;
  children: ReactNode;
}) {
  const id = slugify(String(children));
  return (
    <Box
      position="relative"
      className="mdx-heading spacing toc"
      scrollMarginTop="5rem"
      _hover={{ "& .mdx-anchor": { opacity: 0.7 } }}
    >
      <a
        href={`#${id}`}
        className="mdx-anchor"
        aria-hidden
        style={{
          position: "absolute",
          left: "-1.25rem",
          opacity: 0,
          color: "var(--chakra-colors-cyan-400)",
          fontWeight: 400,
          textDecoration: "none",
        }}
      >
        #
      </a>
      <Heading as={as} id={id} size={size} colorPalette={colorPalette}>
        {children}
      </Heading>
    </Box>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <div className="mdx-prose">{children}</div>
    ),
    h1: ({ children }) => (
      <HeadingWithAnchor as="h1" size="4xl" colorPalette="cyan">
        {children}
      </HeadingWithAnchor>
    ),
    h2: ({ children }) => (
      <HeadingWithAnchor as="h2" size="3xl" colorPalette="cyan">
        {children}
      </HeadingWithAnchor>
    ),
    h3: ({ children }) => (
      <HeadingWithAnchor as="h3" size="2xl">
        {children}
      </HeadingWithAnchor>
    ),
    h4: ({ children }) => (
      <HeadingWithAnchor as="h4" size="xl">
        {children}
      </HeadingWithAnchor>
    ),
    h5: ({ children }) => (
      <HeadingWithAnchor as="h5" size="lg">
        {children}
      </HeadingWithAnchor>
    ),
    blockquote: ({ children }) => <MdxCallout>{children}</MdxCallout>,
    table: (props) => (
      <Box className="mdx-table-wrap">
        <Table.Root size="md" variant="outline" {...props}>
          {props.children}
        </Table.Root>
      </Box>
    ),
    thead: ({ children }) => <Table.Header>{children}</Table.Header>,
    tr: ({ children }) => <Table.Row>{children}</Table.Row>,
    th: (props) => (
      <Table.ColumnHeader {...props}>{props.children}</Table.ColumnHeader>
    ),
    tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
    td: (props) => <Table.Cell {...props}>{props.children}</Table.Cell>,
    hr: () => <Box as="hr" className="mdx-hr" />,
    ul: (props) => (
      <List.Root as="ul" ps={4} marginY={2}>
        {props.children}
      </List.Root>
    ),
    ol: (props) => (
      <List.Root as="ol" ps={4} marginY={2}>
        {props.children}
      </List.Root>
    ),
    li: (props) => <List.Item {...props}>{props.children}</List.Item>,
    a: ({ href, children, ...props }) => (
      <Link
        href={href}
        colorPalette="cyan"
        target={isExternalHref(href) ? "_blank" : undefined}
        rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    ),
    code: (props) =>
      props?.className === undefined ? (
        <Code
          className="inline-code"
          fontFamily="mono"
          fontSize="sm"
          bg="accent.muted"
          borderWidth="1px"
          borderColor="border"
          paddingX={1.5}
          paddingY={0.5}
          borderRadius="sm"
        >
          {props.children}
        </Code>
      ) : (
        <code {...props}>{props.children}</code>
      ),
    pre: (props) => {
      const child = props.children as ReactNode & {
        props?: { className?: string };
      };
      const className = child?.props?.className ?? "";
      const languageMatch = /language-(\w+)/.exec(className);
      const language = languageMatch?.[1];

      return (
        <MdxPre data-language={language} {...props}>
          {props.children}
        </MdxPre>
      );
    },
    img: MdxFigure,
    p: (props) => <MdxParagraph>{props.children}</MdxParagraph>,
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    ...components,
  };
}
