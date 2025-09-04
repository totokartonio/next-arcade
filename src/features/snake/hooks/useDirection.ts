import { useEffect, useRef } from "react";
import type { Vector, DirectionName } from "../types";
import type { GameStatus } from "@/types";
import { startIfIdle } from "@/utils";
import useGameSounds from "@/hooks/useGameSounds";

function useDirection(
  direction: Vector,
  gameStatus: GameStatus,
  setGameStatus: (newGameStatus: GameStatus) => void,
  directionsMap: Record<DirectionName, Vector>
) {
  const queuedDirection = useRef<Vector | null>(null);

  const { playOnTurn } = useGameSounds();

  useEffect(() => {
    function chooseDirection(key: string) {
      switch (key) {
        case "w":
        case "ArrowUp":
          if (direction.y !== 0) break;
          return "UP";

        case "s":
        case "ArrowDown":
          if (direction.y !== 0) break;
          return "DOWN";

        case "a":
        case "ArrowLeft":
          if (direction.x !== 0) break;
          return "LEFT";

        case "d":
        case "ArrowRight":
          if (direction.x !== 0) break;
          return "RIGHT";
      }
    }

    const KEYS = [
      "a",
      "s",
      "d",
      "w",
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "ArrowUp",
    ];

    function handleKeyDown(event: KeyboardEvent) {
      if (KEYS.includes(event.key)) {
        event.preventDefault();
      }
      if (gameStatus === "idle") {
        startIfIdle(gameStatus, setGameStatus);
      }
      if (gameStatus !== "running") return;
      const wanted = chooseDirection(event.key);
      if (!wanted) return;

      playOnTurn();

      queuedDirection.current = directionsMap[wanted];
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStatus, directionsMap, playOnTurn, setGameStatus]);

  return queuedDirection;
}

export default useDirection;
