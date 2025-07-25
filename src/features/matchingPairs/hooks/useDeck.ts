import { useState, useCallback, use } from "react";

import { buildDeck } from "../utils";
import type { MemoryCard } from "../types";

function useDeck(pairCount: number, pool: readonly string[]) {
  const [deck, setDeck] = useState<MemoryCard[]>(() =>
    buildDeck(pairCount, pool)
  );

  const resetDeck = useCallback(() => {
    setDeck(buildDeck(pairCount, pool));
  }, [deck]);

  return { deck, resetDeck };
}

export default useDeck;
