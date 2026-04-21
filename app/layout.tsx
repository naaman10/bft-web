import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LayoutRootFix } from "@/components/LayoutRootFix";
import { TermlyCMP } from "@/components/TermlyCMP";
import { organizationJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { LOCAL_AREA_META } from "@/lib/site-location";

/** Termly dashboard website UUID — override with `NEXT_PUBLIC_TERMLY_WEBSITE_UUID`. */
const TERMLY_WEBSITE_UUID =
  process.env.NEXT_PUBLIC_TERMLY_WEBSITE_UUID ??
  "0a6a6e27-c09c-41a7-82db-79117b51814c";

const TERMLY_RESOURCE_BLOCKER_SRC = `https://app.termly.io/resource-blocker/${TERMLY_WEBSITE_UUID}?autoBlock=on`;

/** Google Analytics (gtag.js) measurement ID */
const GA_MEASUREMENT_ID = "G-E2HM8PF27M";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Brighter Futures Tutoring | Greater Manchester",
  description:
    `Personalised Maths, Reading and SPaG tutoring for children aged 5–14. One-to-one, group and home-ed sessions. ${LOCAL_AREA_META}`,
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicons/favicon.ico", sizes: "48x48" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=National+Park:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="m-0 min-h-screen p-0 font-sans antialiased"
        suppressHydrationWarning
      >
        {/* Single load, as early as Next allows — avoids duplicate client injection + Termly errors */}
        <Script
          id="termly-resource-blocker"
          strategy="beforeInteractive"
          src={TERMLY_RESOURCE_BLOCKER_SRC}
        />
        <JsonLd data={organizationJsonLd(siteUrl)} />
        <div
          id="site-shell"
          className="relative flex min-h-dvh flex-col overflow-x-clip"
        >
          <Header />
          <div className="min-h-0 flex-1">{children}</div>
        </div>
        <Suspense fallback={null}>
          <TermlyCMP />
        </Suspense>
        <LayoutRootFix />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
