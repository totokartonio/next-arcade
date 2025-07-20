"use client";

import React from "react";
import styles from "./SnakeGame.module.css";

import useSnake from "@/features/snake/hooks/useSnake";
import useCanvas from "@/features/snake/hooks/useCanvas";

import RestartButton from "@/components/RestartButton";

const TILE = 15;
const BOARD_W = 300;
const BOARD_H = 300;
const SPEED = 120;

function SnakeGame() {
  const game = useSnake(BOARD_W, BOARD_H, TILE, SPEED);
  const canvasRef = useCanvas(game, BOARD_W, BOARD_H, TILE);

  return (
    <div className={styles.contentContainer}>
      <canvas
        ref={canvasRef}
        width={BOARD_W}
        height={BOARD_H}
        className={styles.gameBoard}
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
