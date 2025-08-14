"use client";

import { useCallback } from "react";
import styles from "./SnakeGame.module.css";

import useCheckSearchParams from "@/hooks/useCheckSearchParams";
import MobileGameControls from "@/components/MobileGameControls";

import { CANVAS_DIMENSIONS, SNAKE_DIFFICULTY } from "./constants";
import useSnake from "@/features/snake/hooks/useSnake";
import useCanvas from "@/features/snake/hooks/useCanvas";

import GameOver from "@/components/GameOver";

function SnakeGame() {
  const { selectedDifficulty } = useCheckSearchParams();

  const { speed, strictBorder } = SNAKE_DIFFICULTY[selectedDifficulty];
  const { tile, boardW, boardH } = CANVAS_DIMENSIONS;
  const game = useSnake(boardW, boardH, tile, speed, strictBorder);
  const canvasRef = useCanvas(game, boardW, boardH, tile);

  const handleDirectionChange = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const keyMap = {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
      };

      const event = new KeyboardEvent("keydown", {
        key: keyMap[direction],
        code: keyMap[direction],
        bubbles: true,
      });

      window.dispatchEvent(event);
    },
    []
  );

  return (
    <div className={styles.contentContainer} data-testid="game-content">
      <canvas
        ref={canvasRef}
        width={boardW}
        height={boardH}
        className={`${styles.gameBoard} ${strictBorder && styles.strictBorder}`}
      ></canvas>
      <div className={styles.belowSlot}>
        {game.isIdle && (
          <p>
            <strong>Press any button to start the game</strong>
          </p>
        )}
        {game.isLost && (
          <GameOver isWon={!game.isLost} onClick={game.restart} />
        )}
      </div>
      <MobileGameControls onDirectionChange={handleDirectionChange} />
    </div>
  );
}

export default SnakeGame;
