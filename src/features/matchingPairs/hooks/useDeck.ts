import { useState, useMemo } from "react";

import { buildDeck } from "../utils";
import type { MemoryCard } from "../types";

function useDeck(pairCount: number, pool: readonly string[]) {
  const initialDeck = useMemo(
    () => buildDeck(pairCount, pool),
    [pairCount, pool]
  );
  const [deck, setDeck] = useState<MemoryCard[]>(initialDeck);

  function resetDeck() {
    setDeck(buildDeck(pairCount, pool));
  }

  return { deck, resetDeck };
}

export default useDeck;
