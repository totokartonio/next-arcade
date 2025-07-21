import { useState, useEffect, useCallback, useMemo } from "react";

import { ATTEMPTS } from "../data";
import type { LetterEntry } from "../types";
import type { GameStatus, Difficulty } from "@/types";

import useAttempts from "./useAttempts";
import useWord from "./useWord";
import useKeyboardListener from "./useKeyboardListener";

import { toAnswerArray } from "../utils";

function useHangman(difficulty: Difficulty = "easy") {
  const getNextWord = useWord(difficulty);

  const [gameStatus, setGameStatus] = useState<GameStatus>("running");
  const [word, setWord] = useState<string>(() => getNextWord());
  const [answer, setAnswer] = useState<LetterEntry[]>(() =>
    toAnswerArray(word)
  );
  const [usedLetters, setUsedLetters] = useState<Set<string>>(() => new Set());

  const { attempts, consumeAttempt, resetAttempts } = useAttempts(
    ATTEMPTS,
    () => setGameStatus("lost")
  );

  function checkIfGameIsWon(entries: LetterEntry[]) {
    if (entries.every((entry) => !entry.isHidden)) {
      setGameStatus("won");
      return;
    }
  }

  function addLetterToUsedLetters(letter: string) {
    setUsedLetters((prev) => new Set(prev).add(letter));
  }

  const handleGuess = useCallback(
    (rawLetter: string) => {
      //If game ended — ignore
      if (gameStatus !== "running") return;

      const letter = rawLetter.toUpperCase();

      //Check if letter was already used or pressed key is not a letter
      if (usedLetters.has(letter) || !/^[A-Z]$/.test(letter)) return;

      //Add letter to used letters array
      addLetterToUsedLetters(letter);

      // Wrong guess
      if (!word.includes(letter)) {
        consumeAttempt();
        return;
      }

      //Right guess
      setAnswer((prevAnswer) => {
        const next = prevAnswer.map((entry) =>
          entry.letter === letter ? { ...entry, isHidden: false } : entry
        );
        checkIfGameIsWon(next);
        return next;
      });
    },
    [
      gameStatus,
      usedLetters,
      addLetterToUsedLetters,
      consumeAttempt,
      word,
      answer,
    ]
  );

  useKeyboardListener(handleGuess, gameStatus === "running");

  // Function to restart the game
  function restart() {
    const nextWord = getNextWord();
    const nextAnswer = toAnswerArray(nextWord);

    resetAttempts();
    setGameStatus("running");
    setWord(nextWord);
    setAnswer(nextAnswer);
    setUsedLetters(new Set());
  }

  return {
    attempts,
    answer,
    usedLetters,
    isRunning: gameStatus === "running",
    isWon: gameStatus === "won",
    isLost: gameStatus === "lost",
    handleGuess,
    restart,
    word,
  };
}

export default useHangman;
