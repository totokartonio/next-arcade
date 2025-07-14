"use client";

import React from "react";
import styles from "./page.module.css";
import type { GameStatus } from "@/features/hangman/types";

type Vector = { x: number; y: number };
type DirectionName = "UP" | "DOWN" | "LEFT" | "RIGHT";

const TILE = 15;
const BOARD_W = 300;
const BOARD_H = 300;
const DIRECTIONS_MAP: Record<DirectionName, Vector> = {
  UP: { x: 0, y: -TILE },
  DOWN: { x: 0, y: TILE },
  LEFT: { x: -TILE, y: 0 },
  RIGHT: { x: TILE, y: 0 },
};
const SPEED = 120;

function randomGridPos(): Vector {
  return {
    x: Math.floor(Math.random() * (BOARD_W / TILE)) * TILE,
    y: Math.floor(Math.random() * (BOARD_H / TILE)) * TILE,
  };
}

function tileEquals(a: Vector, b: Vector): boolean {
  return a.x === b.x && a.y === b.y;
}

function rollFood(snake: Vector[]) {
  let pos: Vector = randomGridPos();

  while (snake.some((snakePart) => tileEquals(snakePart, pos))) {
    pos = randomGridPos();
  }

  return pos;
}

function SnakePage() {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
  const [snakePosition, setSnakePosition] = React.useState<Vector[]>([
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
  ]);
  const [foodPosition, setFoodPosition] = React.useState<Vector>({
    x: 195,
    y: 45,
  });
  const [direction, setDirection] = React.useState<Vector>(
    DIRECTIONS_MAP.RIGHT
  );

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const queuedDirection = React.useRef<Vector | null>(null);

  React.useEffect(() => {
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

      queuedDirection.current = DIRECTIONS_MAP[wanted];
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStatus]);

  React.useEffect(() => {
    if (gameStatus !== "running") return;

    const interval = setInterval(() => {
      const newDirection = queuedDirection.current;
      if (newDirection) setDirection(newDirection);
      queuedDirection.current = null;

      setSnakePosition((prev) => {
        const head = prev[0];
        const newHead = {
          x: (head.x + direction.x + BOARD_W) % BOARD_W,
          y: (head.y + direction.y + BOARD_H) % BOARD_H,
        };

        const ate = tileEquals(newHead, foodPosition);

        const nextSnake = ate
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)];

        if (ate) setFoodPosition(rollFood(nextSnake));

        if (
          nextSnake.slice(1).some((snakePart) => tileEquals(snakePart, newHead))
        ) {
          setGameStatus("lost");
          return prev; // keep old state so we can still draw the crash frame
        }

        return nextSnake;
      });
    }, SPEED);

    return () => clearInterval(interval);
  }, [direction, foodPosition, gameStatus]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, BOARD_W, BOARD_H);

    snakePosition.forEach((snakePart) => {
      ctx.fillStyle = "white";
      ctx.fillRect(snakePart.x, snakePart.y, TILE, TILE);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, TILE, TILE);
  }, [snakePosition, foodPosition]);

  function restart() {
    setSnakePosition([
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
    ]),
      setFoodPosition({ x: 195, y: 45 });
    setDirection(DIRECTIONS_MAP.RIGHT);

    setGameStatus("running");
  }

  return (
    <>
      <header>
        <h1>Snake Game</h1>
      </header>
      <main>
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className={styles.gameBoard}
        ></canvas>
        {gameStatus !== "running" && (
          <>
            <p>Game over</p>
            <button onClick={() => restart()}>New Game</button>
          </>
        )}
      </main>
    </>
  );
}

export default SnakePage;
