import { notFound } from "next/navigation";
import { GAMES_CATALOGUE } from "@/constants";
import { Suspense } from "react";
import styles from "./page.module.css";
import Spinner from "@/components/Spinner";

async function GamePage({ params }: { params: { game: string } }) {
  const { game } = await params;
  const entry = Object.values(GAMES_CATALOGUE).find((e) => e.slug === game);
  if (!entry) notFound();

  return (
    <Suspense fallback={<Spinner />}>
      <entry.component />
    </Suspense>
  );
}

export default GamePage;
