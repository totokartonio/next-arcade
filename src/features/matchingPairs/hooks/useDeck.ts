import { useState } from "react";

import { buildDeck } from "../utils";
import type { MemoryCard } from "../types";

function useDeck(pairCount: number, pool: readonly string[]) {
  const [deck, setDeck] = useState<MemoryCard[]>(() =>
    buildDeck(pairCount, pool)
  );

  function resetDeck () {
    setDeck(buildDeck(pairCount, pool));
  };

  return { deck, resetDeck };
}

export default useDeck;
