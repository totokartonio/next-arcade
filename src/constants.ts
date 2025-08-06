import { lazy } from "react";

import hangmanCover from "@/assets/covers/hangman-cover.png";
import snakeCover from "@/assets/covers/snake-cover.png";
import matchingPpairsCover from "@/assets/covers/matching-pairs-cover.png";

const DIFFICULTIES = ["easy", "medium", "hard"] as const;

const GAMES_CATALOGUE = {
  hangman: {
    title: "Hangman",
    slug: "hangman",
    img: hangmanCover,
    component: lazy(() => import("@/features/hangman/HangmanGame")),
  },
  snake: {
    title: "Snake",
    slug: "snake",
    img: snakeCover,
    component: lazy(() => import("@/features/snake/SnakeGame")),
  },
  matchingPairs: {
    title: "Matching Pairs",
    slug: "matching-pairs",
    img: matchingPpairsCover,
    component: lazy(() => import("@/features/matchingPairs/MatchingPairsGame")),
  },
} as const;

export { DIFFICULTIES, GAMES_CATALOGUE };
