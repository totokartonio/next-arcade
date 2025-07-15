import type { Vector } from "./types";

function randomGridPos(
  boardWidth: number = 300,
  boardHeight: number = 300,
  tileSize: number = 15
): Vector {
  return {
    x: Math.floor(Math.random() * (boardWidth / tileSize)) * tileSize,
    y: Math.floor(Math.random() * (boardHeight / tileSize)) * tileSize,
  };
}

function tileEquals(a: Vector, b: Vector): boolean {
  return a.x === b.x && a.y === b.y;
}

function rollFood(
  snake: Vector[],
  boardWidth: number = 300,
  boardHeight: number = 300,
  tileSize: number = 15
) {
  let pos: Vector = randomGridPos(boardWidth, boardHeight, tileSize);

  while (snake.some((snakePart) => tileEquals(snakePart, pos))) {
    pos = randomGridPos(boardWidth, boardHeight, tileSize);
  }

  return pos;
}

export { randomGridPos, tileEquals, rollFood };
