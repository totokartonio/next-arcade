import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { randomGridPos, tileEquals, rollFood } from "@/features/snake/utils";
import type { Vector } from "@/features/snake/types";

describe("Snake Utils", () => {
  describe("randomGridPos", () => {
    beforeEach(() => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should generate position aligned to grid", () => {
      const pos = randomGridPos(300, 300, 15);
      expect(pos.x % 15).toBe(0);
      expect(pos.y % 15).toBe(0);
    });

    it("should be within bounds", () => {
      const pos = randomGridPos(300, 300, 15);
      expect(pos.x).toBeGreaterThanOrEqual(0);
      expect(pos.x).toBeLessThan(300);
      expect(pos.y).toBeGreaterThanOrEqual(0);
      expect(pos.y).toBeLessThan(300);
    });
  });

  describe("tileEquals", () => {
    it("should return true for equal positions", () => {
      const pos1: Vector = { x: 15, y: 30 };
      const pos2: Vector = { x: 15, y: 30 };
      expect(tileEquals(pos1, pos2)).toBe(true);
    });

    it("should return false for different positions", () => {
      const pos1: Vector = { x: 15, y: 30 };
      const pos2: Vector = { x: 30, y: 15 };
      expect(tileEquals(pos1, pos2)).toBe(false);
    });

    it("should return false for partial matches", () => {
      const pos1: Vector = { x: 15, y: 30 };
      const pos2: Vector = { x: 15, y: 45 };
      expect(tileEquals(pos1, pos2)).toBe(false);
    });
  });

  describe("rollFood", () => {
    beforeEach(() => {
      vi.spyOn(Math, "random").mockReturnValue(0.1);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should generate food position not occupied by snake", () => {
      const snake: Vector[] = [
        { x: 45, y: 45 },
        { x: 30, y: 45 },
        { x: 15, y: 45 },
      ];

      const foodPos = rollFood(snake, 300, 300, 15);

      expect(foodPos.x % 15).toBe(0);
      expect(foodPos.y % 15).toBe(0);

      const isOnSnake = snake.some((segment) => tileEquals(segment, foodPos));
      expect(isOnSnake).toBe(false);
    });

    it("should handle empty snake", () => {
      const snake: Vector[] = [];
      const foodPos = rollFood(snake, 300, 300, 15);

      expect(foodPos.x % 15).toBe(0);
      expect(foodPos.y % 15).toBe(0);
    });
  });
});
