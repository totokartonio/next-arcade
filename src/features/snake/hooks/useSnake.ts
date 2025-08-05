import React from "react";

import type { GameStatus } from "@/types";
import type { Vector, DirectionName } from "../types";
import { SNAKE_INITIAL_POSITION, FOOD_INITIAL_POSITION } from "../constants";
import useGameSounds from "@/hooks/useGameSounds";

import { tileEquals, rollFood } from "../utils";
import useDirection from "./useDirection";

function useSnake(
  boardWidth: number,
  boardHeight: number,
  tile: number,
  speed: number,
  strictBorder: boolean
) {
  const DIRECTIONS_MAP: Record<DirectionName, Vector> = {
    UP: { x: 0, y: -tile },
    DOWN: { x: 0, y: tile },
    LEFT: { x: -tile, y: 0 },
    RIGHT: { x: tile, y: 0 },
  };

  const [gameStatus, setGameStatus] = React.useState<GameStatus>("idle");
  const [snakePosition, setSnakePosition] = React.useState<Vector[]>(
    SNAKE_INITIAL_POSITION
  );
  const [foodPosition, setFoodPosition] = React.useState<Vector>(
    FOOD_INITIAL_POSITION
  );
  const [direction, setDirection] = React.useState<Vector>(
    DIRECTIONS_MAP.RIGHT
  );

  const { playOnBite, playOnLose } = useGameSounds();

  const queuedDirection = useDirection(
    direction,
    gameStatus,
    setGameStatus,
    DIRECTIONS_MAP
  );

  React.useEffect(() => {
    if (gameStatus !== "running") return;

    const interval = setInterval(() => {
      const newDirection = queuedDirection.current;
      if (newDirection) setDirection(newDirection);
      queuedDirection.current = null;

      setSnakePosition((prev) => {
        const head = prev[0];
        let newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        if (
          strictBorder &&
          (newHead.x < 0 ||
            newHead.x >= boardWidth ||
            newHead.y < 0 ||
            newHead.y >= boardHeight)
        ) {
          playOnLose();
          setGameStatus("lost");
          return prev;
        }

        if (!strictBorder) {
          newHead = {
            x: (newHead.x + boardWidth) % boardWidth,
            y: (newHead.y + boardHeight) % boardHeight,
          };
        }

        const ate = tileEquals(newHead, foodPosition);

        const nextSnake = ate
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)];

        if (ate) {
          playOnBite();
          setFoodPosition(rollFood(nextSnake, boardWidth, boardHeight, tile));
        }

        if (
          nextSnake.slice(1).some((snakePart) => tileEquals(snakePart, newHead))
        ) {
          playOnLose();
          setGameStatus("lost");
          return prev;
        }

        return nextSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, foodPosition, gameStatus, strictBorder]);

  function restart() {
    setSnakePosition(SNAKE_INITIAL_POSITION);
    setFoodPosition(FOOD_INITIAL_POSITION);
    setDirection(DIRECTIONS_MAP.RIGHT);

    setGameStatus("idle");
  }

  return {
    snakePosition,
    foodPosition,
    isIdle: gameStatus === "idle",
    isLost: gameStatus === "lost",
    isRunning: gameStatus === "running" || gameStatus === "idle",
    restart,
  };
}

export default useSnake;
