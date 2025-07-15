import React from "react";

import type { GameStatus } from "@/types";
import type { Vector, DirectionName } from "../types";

import { tileEquals, rollFood } from "../utils";
import useDirection from "./useDirection";

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
];
const FOOD_INITIAL_POSITION: Vector = { x: 195, y: 45 };

function useSnake(
  boardWidth: number,
  boardHeight: number,
  tile: number,
  speed: number
) {
  const DIRECTIONS_MAP: Record<DirectionName, Vector> = {
    UP: { x: 0, y: -tile },
    DOWN: { x: 0, y: tile },
    LEFT: { x: -tile, y: 0 },
    RIGHT: { x: tile, y: 0 },
  };

  const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
  const [snakePosition, setSnakePosition] = React.useState<Vector[]>(
    SNAKE_INITIAL_POSITION
  );
  const [foodPosition, setFoodPosition] = React.useState<Vector>(
    FOOD_INITIAL_POSITION
  );
  const [direction, setDirection] = React.useState<Vector>(
    DIRECTIONS_MAP.RIGHT
  );

  const queuedDirection = useDirection(direction, gameStatus, DIRECTIONS_MAP);

  React.useEffect(() => {
    if (gameStatus !== "running") return;

    const interval = setInterval(() => {
      const newDirection = queuedDirection.current;
      if (newDirection) setDirection(newDirection);
      queuedDirection.current = null;

      setSnakePosition((prev) => {
        const head = prev[0];
        const newHead = {
          x: (head.x + direction.x + boardWidth) % boardWidth,
          y: (head.y + direction.y + boardHeight) % boardHeight,
        };

        const ate = tileEquals(newHead, foodPosition);

        const nextSnake = ate
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)];

        if (ate)
          setFoodPosition(rollFood(nextSnake, boardWidth, boardHeight, tile));

        if (
          nextSnake.slice(1).some((snakePart) => tileEquals(snakePart, newHead))
        ) {
          setGameStatus("lost");
          return prev;
        }

        return nextSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, foodPosition, gameStatus]);

  function restart() {
    setSnakePosition(SNAKE_INITIAL_POSITION);
    setFoodPosition(FOOD_INITIAL_POSITION);
    setDirection(DIRECTIONS_MAP.RIGHT);

    setGameStatus("running");
  }

  return {
    snakePosition,
    foodPosition,
    isRunning: gameStatus === "running",
    restart,
  };
}

export default useSnake;
