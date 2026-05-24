"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { EmotionRegistry } from "./emotion-registry";
import { system } from "@/theme/system";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        <ColorModeProvider>{children}</ColorModeProvider>
      </ChakraProvider>
    </EmotionRegistry>
  );
}
