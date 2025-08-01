import React from "react";
import type { Metadata } from "next";
import styles from "./page.module.css";
import LinkToHub from "@/components/LinkToHub";
import { getTitleFromSlug } from "@/utils";
import type { GameSlug } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { game: GameSlug };
}): Promise<Metadata> {
  const { game } = await params;
  return { title: `${getTitleFromSlug(game)} – Next Arcade` };
}

async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { game: GameSlug };
}) {
  const { game } = await params;
  const title = getTitleFromSlug(game);

  return (
    <>
      <div>
        <LinkToHub />
        <h2 className={styles.title}>{`${title} Game`}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}

export default GameLayout;
