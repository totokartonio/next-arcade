import { describe, it, expect, vi } from "vitest";
import {
  shuffleDeck,
  buildDeck,
  mapIds,
  checkTentativeWin,
  checkTentativeGuess,
} from "@/features/matchingPairs/utils";
import type { MemoryCard } from "@/features/matchingPairs/types";

describe("Matching Pairs Utils", () => {
  describe("shuffleDeck", () => {
    it("should return array with same length", () => {
      const original = ["a", "b", "c", "d"];
      const shuffled = shuffleDeck(original);
      expect(shuffled).toHaveLength(original.length);
    });

    it("should contain all original elements", () => {
      const original = ["a", "b", "c", "d"];
      const shuffled = shuffleDeck(original);

      original.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it("should not mutate original array", () => {
      const original = ["a", "b", "c", "d"];
      const originalCopy = [...original];
      shuffleDeck(original);
      expect(original).toEqual(originalCopy);
    });
  });

  describe("buildDeck", () => {
    const mockPool = ["a", "b", "c", "d", "e"] as const;

    it("should create deck with correct number of pairs", () => {
      vi.spyOn(global.crypto, "randomUUID")
        .mockReturnValueOnce("id1")
        .mockReturnValueOnce("id2")
        .mockReturnValueOnce("id3")
        .mockReturnValueOnce("id4");

      const deck = buildDeck(2, mockPool);

      expect(deck).toHaveLength(4); // 2 pairs = 4 cards

      // Should have exactly 2 unique values
      const values = deck.map((card) => card.value);
      const uniqueValues = [...new Set(values)];
      expect(uniqueValues).toHaveLength(2);

      // Each value should appear exactly twice
      uniqueValues.forEach((value) => {
        const count = values.filter((v) => v === value).length;
        expect(count).toBe(2);
      });
    });

    it("should throw error if not enough icons in pool", () => {
      expect(() => buildDeck(10, mockPool)).toThrow(
        "Not enough icons in CARD_POOL"
      );
    });
  });

  describe("mapIds", () => {
    it("should extract ids from cards array", () => {
      const cards: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "banana" },
      ];

      const ids = mapIds(cards);
      expect(ids).toEqual(["id1", "id2"]);
    });

    it("should handle empty array", () => {
      const ids = mapIds([]);
      expect(ids).toEqual([]);
    });
  });

  describe("checkTentativeWin", () => {
    it("should return true when all cards are guessed", () => {
      const guessedCards: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "apple" },
      ];
      const deck: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "apple" },
      ];

      expect(checkTentativeWin(guessedCards, deck)).toBe(true);
    });

    it("should return false when not all cards are guessed", () => {
      const guessedCards: MemoryCard[] = [{ id: "id1", value: "apple" }];
      const deck: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "apple" },
      ];

      expect(checkTentativeWin(guessedCards, deck)).toBe(false);
    });
  });

  describe("checkTentativeGuess", () => {
    it("should return true for matching cards", () => {
      const cards: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "apple" },
      ];

      expect(checkTentativeGuess(cards)).toBe(true);
    });

    it("should return false for non-matching cards", () => {
      const cards: MemoryCard[] = [
        { id: "id1", value: "apple" },
        { id: "id2", value: "banana" },
      ];

      expect(checkTentativeGuess(cards)).toBe(false);
    });
  });
});
