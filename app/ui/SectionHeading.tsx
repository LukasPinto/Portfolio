import { Box, Heading, type HeadingProps } from "@chakra-ui/react";

export default function SectionHeading({
  children,
  id,
  ...props
}: HeadingProps & { id?: string }) {
  return (
    <Box position="relative" paddingBottom={2} marginBottom={4}>
      <Heading id={id} size="4xl" colorPalette="cyan" {...props}>
        {children}
      </Heading>
      <Box
        height="3px"
        width="4rem"
        marginTop={2}
        borderRadius="full"
        bgGradient="to-r"
        gradientFrom="cyan.400"
        gradientTo="teal.500"
      />
    </Box>
  );
}
