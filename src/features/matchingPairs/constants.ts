import type { Difficulty } from "@/types";

const CARD_POOL = [
  "worm",
  "ant",
  "bee",
  "black_beetle",
  "brown_beetle",
  "butterfly",
  "cockroach",
  "dove",
  "dragonfly",
  "fish",
  "fly",
  "frog",
  "jellyfish",
  "leaf",
  "mantis",
  "mushroom",
  "rat",
  "snail",
  "spider",
  "turtle",
] as const;

const MP_DIFFICULTY = {
  easy: { pairs: 6, totalTime: 45 },
  medium: { pairs: 10, totalTime: 60 },
  hard: { pairs: 15, totalTime: 75 },
} as const satisfies Record<Difficulty, { pairs: number; totalTime: number }>;

export { CARD_POOL, MP_DIFFICULTY };
