import type { Metadata } from "next";
import { Monoton, Press_Start_2P, VT323 } from "next/font/google";

import styles from "./page.module.css";
import "../styles/globals.css";
import "../styles/reset.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Next Arcade",
  description: "Collection of small arcade games created with Next.js",
  icons: {
    icon: "/favicon.png",
  },
};

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monoton",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${monoton.variable} ${pressStart.variable} ${vt323.variable}`}
    >
      <body>
        <header className={styles.header}>
          <h1 className={styles.title}>Next Arcade</h1>
          <Nav />
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
