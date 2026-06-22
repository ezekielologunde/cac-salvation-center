import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SITE, SITE_URL, churchJsonLd } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTags } from "@/components/analytics/GoogleTags";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CAC Salvation Center — Church in Randallstown, MD",
  description: SITE.description,
  keywords: [
    "CAC Salvation Center", "Christ Apostolic Church", "church in Randallstown MD",
    "Baltimore church", "Sunday service", "online church", "Yoruba church Maryland",
    "prayer line", "Pastor H.O. Ilufoye",
  ],
  applicationName: SITE.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "CAC Salvation Center — Welcome Home",
    description: SITE.description,
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: "/images/congregation.jpg", width: 1200, height: 630, alt: "CAC Salvation Center congregation in worship" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAC Salvation Center — Welcome Home",
    description: SITE.description,
    images: ["/images/congregation.jpg"],
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to emit the Search
    // Console <meta> tag; omitted automatically when unset.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#D62828",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, app-controlled data only. `<` is escaped so no value can
          // ever break out of the <script> element (JSON-LD hardening).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd()).replace(/</g, "\\u003c") }}
        />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
        <GoogleTags />
      </body>
    </html>
  );
}
