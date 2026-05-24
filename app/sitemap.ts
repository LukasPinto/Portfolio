import type { MetadataRoute } from "next";
import { getMdxSlugs } from "@/app/utils/mdxFiles";

export const dynamic = "force-static";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lukaspinto.github.io/Portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getMdxSlugs();
  const blogEntries = slugs
    .filter((slug) => slug !== "experiencia")
    .map((slug) => ({
      url: `${BASE_URL}/Blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: `${BASE_URL}/AboutMe`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/Blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
