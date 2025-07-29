import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', // La ruta de origen que quieres redirigir
        destination: '/AboutMe', // La ruta de destino a la que quieres redirigir
        permanent: true, // true para 308 (permanente), false para 307 (temporal)
      },

    ]
  },
  //pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    //mdxRs: true
  },
  //transpilePackages: ['next-mdx-remote-client'],
};



export default nextConfig

