import { describe, it, expect, vi } from "vitest";
import { toAnswerArray, getRandomInt } from "@/features/hangman/utils";

describe("Hangman Utils", () => {
  describe("toAnswerArray", () => {
    it("should convert word to array of LetterEntry objects", () => {
      const result = toAnswerArray("HELLO");

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ letter: "H", isHidden: true });
      expect(result[1]).toEqual({ letter: "E", isHidden: true });
      expect(result[2]).toEqual({ letter: "L", isHidden: true });
      expect(result[3]).toEqual({ letter: "L", isHidden: true });
      expect(result[4]).toEqual({ letter: "O", isHidden: true });
    });

    it("should handle empty string", () => {
      const result = toAnswerArray("");
      expect(result).toEqual([]);
    });

    it("should handle single character", () => {
      const result = toAnswerArray("A");
      expect(result).toEqual([{ letter: "A", isHidden: true }]);
    });
  });

  describe("getRandomInt", () => {
    it("should generate number within range", () => {
      // Mock Math.random to return predictable values
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const result = getRandomInt(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);

      vi.restoreAllMocks();
    });

    it("should handle same min and max", () => {
      const result = getRandomInt(5, 5);
      expect(result).toBe(5);
    });
  });
});
