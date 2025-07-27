import type { NextConfig } from "next";
import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx'
const nextConfig: NextConfig = {
  // pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    mdxRs: true
  },
  // transpilePackages: ['next-mdx-remote-client'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,

  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
// export default nextConfig
