import { useEffect, useRef } from "react";
import type { Vector, DirectionName } from "../types";
import type { GameStatus } from "@/types";

function useDirection(
  direction: Vector,
  gameStatus: GameStatus,
  directionsMap: Record<DirectionName, Vector>
) {
  const queuedDirection = useRef<Vector | null>(null);

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

    function handleKeyDown(event: KeyboardEvent) {
      if (gameStatus !== "running") return;
      const wanted = chooseDirection(event.key);
      if (!wanted) return;

      queuedDirection.current = directionsMap[wanted];
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStatus]);

  return queuedDirection;
}

export default useDirection;
