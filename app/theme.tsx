import { createTheme } from "@mui/material/styles";

import { defineAnimationStyles } from "@chakra-ui/react";

// const animationStyles = defineAnimationStyles({
//   bounceFadeIn: {
//     value: {
//       animationName: "ho",
//       animationDuration: "1s",
//       animationTimingFunction: "ease-in-out",
//       animationIterationCount: "infinite",
//     },
//   },
// });
const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    mode: "dark",
  },
});

export default theme;
