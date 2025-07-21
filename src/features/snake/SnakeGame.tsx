"use client";

import React from "react";
import styles from "./SnakeGame.module.css";

import useCheckSearchParams from "@/hooks/useCheckSearchParams";

import { CANVAS_DIMENSIONS, SNAKE_DIFFICULTY } from "./constants";
import useSnake from "@/features/snake/hooks/useSnake";
import useCanvas from "@/features/snake/hooks/useCanvas";

import RestartButton from "@/components/RestartButton";

function SnakeGame() {
  const selectedDifficulty = useCheckSearchParams();

  const { speed, strictBorder } = SNAKE_DIFFICULTY[selectedDifficulty];
  const { tile, boardW, boardH } = CANVAS_DIMENSIONS;
  const game = useSnake(boardW, boardH, tile, speed, strictBorder);
  const canvasRef = useCanvas(game, boardW, boardH, tile);

  return (
    <div className={styles.contentContainer}>
      <canvas
        ref={canvasRef}
        width={boardW}
        height={boardH}
        className={`${styles.gameBoard} ${strictBorder && styles.strictBorder}`}
      ></canvas>
      <p>
        <strong>{game.isIdle && "Press any button to start the game"}</strong>
        <strong>{!game.isRunning && "Game over"}</strong>
      </p>
      {!game.isRunning && <RestartButton onClick={game.restart} />}
    </div>
  );
}

export default SnakeGame;
