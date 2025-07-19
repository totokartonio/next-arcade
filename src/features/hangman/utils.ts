import type { LetterEntry } from "./types";

// Function to convert a word into an array of LetterEntry objects
function toAnswerArray(word: string): LetterEntry[] {
  return word.split("").map((letter) => ({ letter, isHidden: true }));
}

// Function to select a random integer between two values
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export { toAnswerArray, getRandomInt };
