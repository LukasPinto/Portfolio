"use client";

import {
  Badge,
  Box,
  Button,
  Collapsible,
  Flex,
  Text,
} from "@chakra-ui/react";
import { LuListTree } from "react-icons/lu";
import { HiChevronDown } from "react-icons/hi";
import { useState, type ReactNode } from "react";

type TocPanelProps = {
  children: ReactNode;
  sectionCount: number;
  progress: number;
  collapsible?: boolean;
  defaultOpen?: boolean;
};

function TocHeader({
  sectionCount,
  progress,
  showChevron,
  isOpen,
}: {
  sectionCount: number;
  progress: number;
  showChevron?: boolean;
  isOpen?: boolean;
}) {
  return (
  <>
    <Flex
      align="center"
      gap={2.5}
      paddingX={4}
      paddingY={3.5}
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Box
        aria-hidden
        color="cyan.400"
        padding={1.5}
        borderRadius="md"
        bg="accent.muted"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <LuListTree size={16} />
      </Box>
      <Box flex={1} minWidth={0}>
        <Text fontSize="sm" fontWeight="semibold" color="fg">
          En esta página
        </Text>
        <Text fontSize="xs" color="fg.subtle" marginTop={0.5}>
          {sectionCount} {sectionCount === 1 ? "sección" : "secciones"}
        </Text>
      </Box>
      <Badge colorPalette="cyan" variant="subtle" size="sm">
        {Math.round(progress)}%
      </Badge>
      {showChevron && (
        <Box
          as="span"
          aria-hidden
          color="fg.muted"
          display="flex"
          transition="transform 0.2s ease"
          transform={isOpen ? "rotate(180deg)" : undefined}
        >
          <HiChevronDown size={18} />
        </Box>
      )}
    </Flex>
    <Box height="2px" bg="bg.muted" role="presentation">
      <Box
        height="full"
        width={`${progress}%`}
        bgGradient="to-r"
        gradientFrom="cyan.400"
        gradientTo="teal.500"
        transition="width 0.35s ease"
        boxShadow="0 0 12px rgba(34, 211, 238, 0.45)"
      />
    </Box>
  </>
  );
}

function TocShell({ children }: { children: ReactNode }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.emphasized"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.subtle"
      boxShadow="0 4px 24px rgba(34, 211, 238, 0.08)"
      transition="box-shadow 0.3s ease"
      _hover={{
        boxShadow: "0 8px 32px rgba(34, 211, 238, 0.12)",
      }}
    >
      {children}
    </Box>
  );
}

export default function TocPanel({
  children,
  sectionCount,
  progress,
  collapsible = false,
  defaultOpen = false,
}: TocPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (collapsible) {
    return (
      <Collapsible.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
        <TocShell>
          <Collapsible.Trigger asChild>
            <Button
              variant="ghost"
              width="full"
              height="auto"
              justifyContent="stretch"
              padding={0}
              borderRadius={0}
              _hover={{ bg: "bg.muted" }}
            >
              <TocHeader
                sectionCount={sectionCount}
                progress={progress}
                showChevron
                isOpen={open}
              />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box paddingY={2} paddingBottom={3}>
              {children}
            </Box>
          </Collapsible.Content>
        </TocShell>
      </Collapsible.Root>
    );
  }

  return (
    <TocShell>
      <TocHeader sectionCount={sectionCount} progress={progress} />
      <Box paddingY={2} paddingBottom={3}>
        {children}
      </Box>
    </TocShell>
  );
}
