import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SITE_ORIGIN } from "@/lib/seo/site";

import "./globals.css";

const mcCapitals = localFont({
  src: "../../public/fonts/MCapitals.ttf",
  variable: "--font-mcapitals",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Ateliê Terreiro",
    template: "%s | Ateliê Terreiro",
  },
  description:
    "Plataforma de arte coletiva contemporânea — criação, pesquisa, formação, memória e ancestralidade.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${mcCapitals.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
