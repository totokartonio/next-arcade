import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/reset.css";

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
      <body>
        <h1>Next Arcade</h1>
        {children}
      </body>
    </html>
  );
}
