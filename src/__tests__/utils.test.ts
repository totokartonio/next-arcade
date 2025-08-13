import { describe, it, expect, vi } from "vitest";
import {
  startIfIdle,
  transformLabel,
  upperCaseFirstLetter,
  isDifficulty,
  getTitleFromSlug,
} from "@/utils";

describe("Utils", () => {
  describe("startIfIdle", () => {
    it("should set game status to running when idle", () => {
      const mockSetGameStatus = vi.fn();
      startIfIdle("idle", mockSetGameStatus);
      expect(mockSetGameStatus).toHaveBeenCalledWith("running");
    });

    it("should not change status when not idle", () => {
      const mockSetGameStatus = vi.fn();
      startIfIdle("running", mockSetGameStatus);
      expect(mockSetGameStatus).not.toHaveBeenCalled();
    });
  });

  describe("transformLabel", () => {
    it("should transform hyphenated labels to title case", () => {
      expect(transformLabel("matching-pairs")).toBe("Matching Pairs");
      expect(transformLabel("snake-game")).toBe("Snake Game");
      expect(transformLabel("single")).toBe("Single");
    });
  });

  describe("upperCaseFirstLetter", () => {
    it("should capitalize first letter", () => {
      expect(upperCaseFirstLetter("hello")).toBe("Hello");
      expect(upperCaseFirstLetter("WORLD")).toBe("WORLD");
      expect(upperCaseFirstLetter("a")).toBe("A");
    });
  });

  describe("isDifficulty", () => {
    it("should return true for valid difficulties", () => {
      expect(isDifficulty("easy")).toBe(true);
      expect(isDifficulty("medium")).toBe(true);
      expect(isDifficulty("hard")).toBe(true);
    });

    it("should return false for invalid difficulties", () => {
      expect(isDifficulty("invalid")).toBe(false);
      expect(isDifficulty(123)).toBe(false);
      expect(isDifficulty(null)).toBe(false);
      expect(isDifficulty(undefined)).toBe(false);
    });
  });

  describe("getTitleFromSlug", () => {
    it("should return correct title for valid slugs", () => {
      expect(getTitleFromSlug("hangman")).toBe("Hangman");
      expect(getTitleFromSlug("snake")).toBe("Snake");
      expect(getTitleFromSlug("matching-pairs")).toBe("Matching Pairs");
    });

    it("should return slug for invalid slugs", () => {
      expect(getTitleFromSlug("invalid-game")).toBe("invalid-game");
    });
  });
});
