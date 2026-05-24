"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, type BoxProps } from "@chakra-ui/react";
import { useMounted } from "@/app/hooks/useMounted";

type FadeInProps = Omit<BoxProps, "transition"> & {
  delay?: number;
};

export function FadeIn({ children, delay = 0, ...props }: FadeInProps) {
  const mounted = useMounted();

  return (
    <Box {...props}>
      {mounted ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      ) : (
        <div>{children}</div>
      )}
    </Box>
  );
}

export function StaggerContainer({ children }: { children: ReactNode }) {
  const mounted = useMounted();

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  const mounted = useMounted();

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  ...props
}: Omit<BoxProps, "transition">) {
  const mounted = useMounted();

  return (
    <Box {...props}>
      {mounted ? (
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.div>
      ) : (
        <div>{children}</div>
      )}
    </Box>
  );
}
