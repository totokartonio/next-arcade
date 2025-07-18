import { useState, useEffect, useCallback, use } from "react";

import { shuffleDeck, arrayToDeck } from "../utils";
import type { MemoryCard } from "../types";

function useDeck(values: any[]) {
  const [deck, setDeck] = useState<MemoryCard[]>(() => arrayToDeck(values));

  useEffect(() => {
    setDeck((prev) => shuffleDeck(prev));
  }, []);

  const resetDeck = useCallback(() => {
    setDeck(shuffleDeck(deck));
  }, [deck]);

  return { deck, resetDeck };
}

export default useDeck;
