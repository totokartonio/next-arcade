import type { GameStatus, Difficulty } from "./types";
import { DIFFICULTIES, GAMES_CATALOGUE } from "./constants";

function startIfIdle(
  gameStatus: GameStatus,
  setGameStatus: (newGameStatus: GameStatus) => void
) {
  if (gameStatus === "idle") setGameStatus("running");
}

function transformLabel(label: string): string {
  return label.split("-").map(upperCaseFirstLetter).join(" ");
}

function upperCaseFirstLetter(string: string) {
  string = string[0].toUpperCase() + string.slice(1);
  return string;
}

function isDifficulty(value: unknown): value is Difficulty {
  return (
    typeof value === "string" && DIFFICULTIES.includes(value as Difficulty)
  );
}

function getTitleFromSlug(slug: string): string {
  const entry = Object.values(GAMES_CATALOGUE).find((e) => e.slug === slug);
  return entry?.title ?? slug;
}

export {
  startIfIdle,
  transformLabel,
  upperCaseFirstLetter,
  isDifficulty,
  getTitleFromSlug,
};
