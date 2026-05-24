"use client";

import { HStack, Box } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";

const navItems = [
  { href: "/AboutMe", label: "Sobre Mí", value: "AboutMe" },
  { href: "/Blog", label: "Blog", value: "Blog" },
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const activeValue = pathname.split("/")[1] || "AboutMe";

  return (
    <Box
      as="nav"
      aria-label="Principal"
      position="sticky"
      top={0}
      zIndex={110}
      width="100%"
      bg="bg.subtle"
      borderBottomWidth="1px"
      borderColor="border"
      backdropFilter="blur(12px)"
      css={{
        WebkitBackdropFilter: "blur(12px)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <HStack
        paddingY={{ base: 2, md: 3 }}
        paddingX={{ base: 3, md: 4 }}
        width="100%"
        maxWidth="100vw"
        justify="space-between"
        gap={2}
      >
        <HStack
          as="ul"
          gap={{ base: 1, md: 2 }}
          listStyleType="none"
          margin={0}
          padding={0}
          flex={1}
          minWidth={0}
          overflowX="auto"
          css={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {navItems.map(({ href, label, value }) => {
            const isActive = activeValue === value;
            return (
              <Box as="li" key={value} flexShrink={0}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    display="block"
                    paddingX={{ base: 3, md: 4 }}
                    paddingY={2}
                    borderRadius="md"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight={isActive ? "semibold" : "medium"}
                    color={isActive ? "cyan.400" : "fg.muted"}
                    bg={isActive ? "bg.muted" : "transparent"}
                    borderWidth="1px"
                    borderColor={isActive ? "cyan.700" : "transparent"}
                    boxShadow={
                      isActive ? "0 0 12px rgba(34, 211, 238, 0.15)" : "none"
                    }
                    whiteSpace="nowrap"
                    transition="all 0.2s ease"
                    _hover={{
                      bg: "bg.muted",
                      color: "cyan.400",
                    }}
                  >
                    {label}
                  </Box>
                </Link>
              </Box>
            );
          })}
        </HStack>
        <Box flexShrink={0}>
          <ColorModeButton />
        </Box>
      </HStack>
    </Box>
  );
}
