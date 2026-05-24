import "./globals.css";
import { Roboto, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

import { Provider } from "../components/ui/provider";
import AppShell from "./ui/AppShell";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://lukaspinto.github.io/Portfolio"
  ),
  title: {
    default: "Lukas Pinto | Portfolio",
    template: "%s | Lukas Pinto",
  },
  description:
    "Portfolio personal de Lukas Pinto — Ingeniero Civil Informático, desarrollo web y ciberseguridad.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Lukas Pinto Portfolio",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`dark ${roboto.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <Provider>
          <AppShell>{children}</AppShell>
        </Provider>
      </body>
    </html>
  );
}
