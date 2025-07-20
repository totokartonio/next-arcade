import React from "react";
import type { Metadata } from "next";
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
      <header>
        <LinkToHub />
        <h1>{`${gameName} Game`}</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

export default GameLayout;
