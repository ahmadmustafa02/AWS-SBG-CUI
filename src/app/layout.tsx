import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Silkscreen, Unbounded } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { featuredEvent } from "@/content/events";
import { SITE } from "@/content/site";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], weight: ["700"], variable: "--ff-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const pixel = Silkscreen({ subsets: ["latin"], weight: ["400"], variable: "--ff-pixel", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: SITE.name, template: `%s · ${SITE.shortName}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: "#330066",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const featured = featuredEvent();
  const eventHref = featured ? `/events/${featured.slug}` : "/events";

  return (
    // suppressHydrationWarning: the splash's pre-paint script may add data-splash to <html>.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${pixel.variable} ${mono.variable}`}>
      <head>
        {/* Before first paint: people who prefer reduced motion skip the splash screen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.splash="skip"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav eventHref={eventHref} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
