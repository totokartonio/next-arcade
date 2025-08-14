import { Difficulty } from "@/types";

import type { Vector } from "./types";

const GRID_CELLS = 20 as const;

const DEFAULT_TILE = 24;

const CANVAS_DIMENSIONS = {
  tile: DEFAULT_TILE,
  boardW: DEFAULT_TILE * GRID_CELLS,
  boardH: DEFAULT_TILE * GRID_CELLS,
} as const;

const SNAKE_INITIAL_POSITION: Vector[] = [
  {
    x: CANVAS_DIMENSIONS.tile * 3,
    y: CANVAS_DIMENSIONS.tile * 3,
  },
  {
    x: CANVAS_DIMENSIONS.tile * 2,
    y: CANVAS_DIMENSIONS.tile * 3,
  },
  {
    x: CANVAS_DIMENSIONS.tile,
    y: CANVAS_DIMENSIONS.tile * 3,
  },
] as const;
const FOOD_INITIAL_POSITION: Vector = {
  x: CANVAS_DIMENSIONS.tile * 13,
  y: CANVAS_DIMENSIONS.tile * 3,
} as const;

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
