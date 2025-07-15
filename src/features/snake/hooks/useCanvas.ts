import { useEffect, useRef } from "react";

import type { Vector } from "../types";

function useCanvas(
  {
    snakePosition,
    foodPosition,
  }: { snakePosition: Vector[]; foodPosition: Vector },
  boardWidth: number = 300,
  boardHeight: number = 300,
  tile = 15
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, boardWidth, boardHeight);

    snakePosition.forEach((snakePart) => {
      ctx.fillStyle = "white";
      ctx.fillRect(snakePart.x, snakePart.y, tile, tile);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, tile, tile);
  }, [snakePosition, foodPosition]);

  return canvasRef;
}

export default useCanvas;
