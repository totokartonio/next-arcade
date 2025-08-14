// src/features/matchingPairs/hooks/useDeck.ts
import { useMemo, useState } from "react";
import type { MemoryCard } from "../types";
import { buildDeck } from "../utils";

function makeFixedDeck(
  pairCount: number,
  pool: readonly string[],
  base: string[]
): MemoryCard[] {
  const allowed = new Set(pool);
  const clipped = base.filter((v) => allowed.has(v)).slice(0, pairCount);

  return clipped.flatMap((value, idx) => [
    { id: `${value}-${idx * 2}`, value },
    { id: `${value}-${idx * 2 + 1}`, value },
  ]);
}

function useDeck(
  pairCount: number,
  pool: readonly string[],
  defaultDeck?: string[] | null
) {
  const initialDeck = useMemo<MemoryCard[]>(() => {
    if (defaultDeck && defaultDeck.length) {
      return makeFixedDeck(pairCount, pool, defaultDeck);
    }

    return buildDeck(pairCount, pool);
  }, [pairCount, pool, defaultDeck]);

  const [deck, setDeck] = useState<MemoryCard[]>(initialDeck);

  function resetDeck() {
    if (defaultDeck && defaultDeck.length) {
      setDeck(makeFixedDeck(pairCount, pool, defaultDeck));
    } else {
      setDeck(buildDeck(pairCount, pool));
    }
  }

  return { deck, resetDeck };
}

export default useDeck;
