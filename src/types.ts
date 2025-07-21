import { DIFFICULTIES } from "./constants";

type GameStatus = "idle" | "running" | "won" | "lost";

type Difficulty = (typeof DIFFICULTIES)[number];

export type { GameStatus, Difficulty };
