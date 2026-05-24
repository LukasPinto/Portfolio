import { Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import AboutHero from "@/app/ui/about/AboutHero";
import IntroCards from "@/app/ui/about/IntroCards";
import SkillGroups from "@/app/ui/about/SkillGroups";
import ExperienceTimeline from "@/app/ui/about/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description:
    "Ingeniero Civil Informático con enfoque en desarrollo web y ciberseguridad.",
};

export default function AboutMe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lukas Pinto",
    jobTitle: "Ingeniero Civil Informático",
    description:
      "Desarrollador web y entusiasta de la ciberseguridad y los CTF.",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://lukaspinto.github.io/Portfolio",
    sameAs: [
      "https://github.com/LukasPinto",
      "https://app.hackthebox.com/profile/824616",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Stack
        paddingX={{ base: 4, sm: 5, lg: 8 }}
        width="100%"
        maxWidth="5xl"
        marginX="auto"
        gap={{ base: 8, md: 10 }}
        paddingTop={{ base: 4, md: 6 }}
        paddingBottom={{ base: 8, md: 10 }}
      >
        <AboutHero />
        <IntroCards />
        <SkillGroups />
        <ExperienceTimeline />
      </Stack>
    </>
  );
}
