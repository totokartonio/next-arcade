import type { GameStatus } from "./types";

function startIfIdle(
  gameStatus: GameStatus,
  setGameStatus: (newGameStatus: GameStatus) => void
) {
  if (gameStatus === "idle") setGameStatus("running");
}

export { startIfIdle };
