import React from "react";
import type { Metadata } from "next";
import styles from "./page.module.css";
import LinkToHub from "@/components/LinkToHub";
import { transformLabel } from "@/utils";

export async function generateMetadata({
  params,
}: {
  params: { game: string };
}): Promise<Metadata> {
  const pageParams = await params;
  const gameName = transformLabel(pageParams.game);
  return {
    title: `${gameName} – Next Arcade`,
  };
}

async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { game: string };
}) {
  const pageParams = await params;
  const gameName = transformLabel(pageParams.game);

  return (
    <>
      <div>
        <LinkToHub />
        <h2 className={styles.title}>{`${gameName} Game`}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}

export default GameLayout;
