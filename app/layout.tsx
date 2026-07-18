import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

// NVIDIA-EMEA is proprietary and unavailable here. Space Grotesk (display) +
// IBM Plex Sans (body) substitute: tight geometric weight contrast for
// headlines, a technical/engineering-documentation body face — deliberately
// not Inter, to avoid the generic AI-landing-page look.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://staging-marketing-site.wolven.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Synthetic staging copy — placeholder company, not a real product.
  title: {
    default: "Wolven Forge | Placeholder Marketing Site",
    template: "%s | Wolven Forge",
  },
  description:
    "Wolven Forge is a synthetic placeholder company used to stage this marketing site build. No real product claims.",
  openGraph: {
    title: "Wolven Forge | Placeholder Marketing Site",
    description: "Staging placeholder for the Wolven Forge marketing site.",
    url: siteUrl,
    siteName: "Wolven Forge (staging)",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolven Forge | Placeholder Marketing Site",
    description: "Staging placeholder for the Wolven Forge marketing site.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
