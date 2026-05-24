import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        cyber: {
          50: { value: "#ecfeff" },
          100: { value: "#cffafe" },
          200: { value: "#a5f3fc" },
          300: { value: "#67e8f9" },
          400: { value: "#22d3ee" },
          500: { value: "#06b6d4" },
          600: { value: "#0891b2" },
          700: { value: "#0e7490" },
          800: { value: "#155e75" },
          900: { value: "#164e63" },
          950: { value: "#083344" },
        },
      },
      fonts: {
        heading: { value: "var(--font-roboto), system-ui, sans-serif" },
        body: { value: "var(--font-roboto), system-ui, sans-serif" },
        mono: { value: "var(--font-jetbrains), ui-monospace, monospace" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.950}" },
          },
          subtle: {
            value: { _light: "{colors.gray.50}", _dark: "{colors.gray.900}" },
          },
          muted: {
            value: { _light: "{colors.gray.100}", _dark: "{colors.gray.800}" },
          },
          emphasized: {
            value: { _light: "{colors.gray.200}", _dark: "{colors.gray.700}" },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.gray.900}", _dark: "{colors.gray.50}" },
          },
          muted: {
            value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
          },
          subtle: {
            value: { _light: "{colors.gray.500}", _dark: "{colors.gray.500}" },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: "{colors.gray.200}", _dark: "{colors.gray.800}" },
          },
          emphasized: {
            value: { _light: "{colors.gray.300}", _dark: "{colors.gray.700}" },
          },
        },
        accent: {
          DEFAULT: {
            value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.400}" },
          },
          muted: {
            value: { _light: "{colors.cyan.100}", _dark: "{colors.cyan.950}" },
          },
        },
        prose: {
          link: {
            value: { _light: "{colors.cyan.600}", _dark: "{colors.cyan.400}" },
          },
          code: {
            value: { _light: "{colors.gray.800}", _dark: "{colors.cyan.100}" },
          },
        },
      },
    },
  },
  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      bg: "bg",
      color: "fg",
    },
    "::selection": {
      bg: "cyan.500/35",
    },
  },
});

export const system = createSystem(defaultConfig, config);
