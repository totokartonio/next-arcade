import type { GameStatus } from "./types";

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

export { startIfIdle, transformLabel, upperCaseFirstLetter };
