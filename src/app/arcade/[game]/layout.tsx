import React from "react";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { getTitleFromSlug } from "@/utils";
import type { GameSlug } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: GameSlug }>;
}): Promise<Metadata> {
  const { game } = await params;
  return { title: `${getTitleFromSlug(game)} – Next Arcade` };
}

async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: GameSlug }>;
}) {
  const { game } = await params;
  const title = getTitleFromSlug(game);

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.title}>{`${title} Game`}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default GameLayout;
