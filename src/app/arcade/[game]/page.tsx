import { notFound } from "next/navigation";
import { GAMES_CATALOGUE } from "@/constants";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

async function GamePage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const entry = Object.values(GAMES_CATALOGUE).find((e) => e.slug === game);
  if (!entry) notFound();

  const GameComponent = entry.component;

  return (
    <Suspense fallback={<Spinner />}>
      <GameComponent />
    </Suspense>
  );
}

export default GamePage;
