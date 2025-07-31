import { DIFFICULTIES, GAMES_CATALOGUE } from "./constants";

type GameStatus = "idle" | "running" | "won" | "lost";

type Difficulty = (typeof DIFFICULTIES)[number];

type GameEntry = (typeof GAMES_CATALOGUE)[keyof typeof GAMES_CATALOGUE];
type GameSlug = GameEntry["slug"];

export type { GameStatus, Difficulty, GameSlug };
