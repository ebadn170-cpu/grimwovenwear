import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Self-hosted via next/font — no external request, no render-blocking
 * <link> tags, no layout shift. Each font exposes a CSS variable that
 * globals.css wires into the --font-display / --font-body / --font-mono
 * design tokens.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrimWovenWear",
  description: "Dark couture, woven for the modern house.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} bg-black`}
      style={{ backgroundColor: '#000000' }}
    >
      <body className="bg-black antialiased" style={{ backgroundColor: '#000000' }}>{children}</body>
    </html>
  );
}