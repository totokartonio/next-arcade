import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";

export const metadata: Metadata = {
  title: "Next Arcade",
  description: "Collection of small arcade games created with Next.js",
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
