import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrimWovenWear",
  description: "Gothic-academic streetwear, woven for the modern grimoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}