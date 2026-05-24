"use client";

import { useState } from "react";
import { Box, IconButton, Text, HStack } from "@chakra-ui/react";
import { LuCopy, LuCheck } from "react-icons/lu";

type MdxPreProps = React.ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
  "data-filename"?: string;
};

export default function MdxPre({
  children,
  "data-language": language,
  "data-filename": filename,
  ...props
}: MdxPreProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const pre = document.activeElement?.closest(".mdx-code-block");
    const code = pre?.querySelector("code");
    if (!code) return;
    await navigator.clipboard.writeText(code.textContent ?? "");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const displayLanguage = language ?? filename ?? "código";

  return (
    <Box
      className="mdx-code-block parent-container-of-pre"
      marginY={4}
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="md"
      overflow="hidden"
    >
      <HStack
        justify="space-between"
        paddingX={3}
        paddingY={2}
        bg="bg.muted"
        borderBottomWidth="1px"
        borderColor="border"
      >
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          {displayLanguage}
        </Text>
        <IconButton
          aria-label={copied ? "Copiado" : "Copiar código"}
          size="xs"
          variant="ghost"
          onClick={handleCopy}
        >
          {copied ? <LuCheck /> : <LuCopy />}
        </IconButton>
      </HStack>
      <pre {...props} className="parent-container-of-pre" style={{ margin: 0 }}>
        {children}
      </pre>
    </Box>
  );
}
