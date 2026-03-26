import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { LOCAL_AREA_META } from "@/lib/site-location";

const TERMLY_WEBSITE_UUID = "0a6a6e27-c09c-41a7-82db-79117b51814c";

/** Google Analytics (gtag.js) measurement ID */
const GA_MEASUREMENT_ID = "G-E2HM8PF27M";

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      <body className="min-h-screen font-sans antialiased">
        <Script
          id="termly-resource-blocker"
          strategy="beforeInteractive"
          src={`https://app.termly.io/resource-blocker/${TERMLY_WEBSITE_UUID}?autoBlock=on`}
        />
        <Header />
        {children}
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
