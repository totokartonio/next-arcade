"use client";

import React from "react";

import styles from "./page.module.css";

const TILE = 15;
const BOARD_W = 300;
const BOARD_H = 300;

function SnakePage() {
  const [snakePosition, setSnakePosition] = React.useState([
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
  const [foodPosition, setFoodPosition] = React.useState({ x: 195, y: 150¸ });

  const [direction, setDirection] = React.useState({ x: TILE, y: 0 });

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          if (direction.x === 0) break;
          setDirection({ x: 0, y: -TILE });
          break;

        case "s":
        case "ArrowDown":
          if (direction.x === 0) break;
          setDirection({ x: 0, y: TILE });
          break;

        case "a":
        case "ArrowLeft":
          if (direction.y === 0) break;
          setDirection({ x: -TILE, y: 0 });
          break;

        case "d":
        case "ArrowRight":
          if (direction.y === 0) break;
          setDirection({ x: TILE, y: 0 });
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSnakePosition((prev) => {
        const head = prev[0];
        const newHead = {
          x: (head.x + direction.x + BOARD_W) % BOARD_W,
          y: (head.y + direction.y + BOARD_H) % BOARD_H,
        };
        return [newHead, ...prev.slice(0, -1)];
      });
    }, 180);

    return () => clearInterval(interval);
  }, [direction]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, BOARD_W, BOARD_H);

    snakePosition.forEach((snakePart) => {
      ctx.fillStyle = "white";
      ctx.fillRect(snakePart.x, snakePart.y, TILE, TILE);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, TILE, TILE);
  }, [snakePosition, foodPosition]);

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
      </main>
    </>
  );
}

export default SnakePage;
