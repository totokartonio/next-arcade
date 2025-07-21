import { useState, useEffect, useCallback, use } from "react";

import { shuffleDeck, buildDeck } from "../utils";
import type { MemoryCard } from "../types";

function useDeck(pairCount: number, pool: readonly string[]) {
  const [deck, setDeck] = useState<MemoryCard[]>(() =>
    buildDeck(pairCount, pool)
  );

  useEffect(() => {
    setDeck((prev) => shuffleDeck(prev));
  }, []);

  const resetDeck = useCallback(() => {
    setDeck(buildDeck(pairCount, pool));
  }, [deck]);

  return { deck, resetDeck };
}

export default useDeck;
