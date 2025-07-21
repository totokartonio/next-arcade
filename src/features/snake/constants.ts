import { Difficulty } from "@/types";

import type { Vector } from "./types";

const CANVAS_DIMENSIONS = {
  tile: 15,
  boardW: 300,
  boardH: 300,
} as const;

const SNAKE_INITIAL_POSITION: Vector[] = [
  {
    x: 45,
    y: 45,
  },
  {
    x: 30,
    y: 45,
  },
  {
    x: 15,
    y: 45,
  },
] as const;
const FOOD_INITIAL_POSITION: Vector = { x: 195, y: 45 } as const;

const SNAKE_DIFFICULTY = {
  easy: { speed: 120, strictBorder: false },
  medium: { speed: 120, strictBorder: true },
  hard: { speed: 80, strictBorder: true },
} as const satisfies Record<
  Difficulty,
  { speed: number; strictBorder: boolean }
>;

export {
  SNAKE_INITIAL_POSITION,
  FOOD_INITIAL_POSITION,
  CANVAS_DIMENSIONS,
  SNAKE_DIFFICULTY,
};
