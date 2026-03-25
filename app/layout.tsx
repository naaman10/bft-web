import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "Brighter Futures Tutoring | Greater Manchester",
  description:
    `Personalised Maths, Reading and SPaG tutoring for children aged 5–14. One-to-one, group and home-ed sessions. ${LOCAL_AREA_META}`,
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
        <Header />
        {children}
      </body>
    </html>
  );
}
