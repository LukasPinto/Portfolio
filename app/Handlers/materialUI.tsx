"use client";

import { ComponentProps } from "react";
import TypographyComponent from "@mui/material/Typography";

export function MuiContext({
  children,
}: ComponentProps<typeof TypographyComponent>) {
  return <> {children}</>;
}

