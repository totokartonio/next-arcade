import { lazy } from "react";

const DIFFICULTIES = ["easy", "medium", "hard"] as const;

const GAMES_CATALOGUE = {
  hangman: {
    title: "Hangman",
    slug: "hangman",
    component: lazy(() => import("@/features/hangman/HangmanGame")),
  },
  snake: {
    title: "Snake",
    slug: "snake",
    component: lazy(() => import("@/features/snake/SnakeGame")),
  },
  matchingPairs: {
    title: "Matching Pairs",
    slug: "matching-pairs",
    component: lazy(() => import("@/features/matchingPairs/MatchingPairsGame")),
  },
} as const;

export { DIFFICULTIES, GAMES_CATALOGUE };
