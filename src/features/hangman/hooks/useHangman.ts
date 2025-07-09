import React from "react";

import { WORD } from "../data";
import type { GameStatus, LetterEntry } from "../types";

const word = WORD;

function useHangman() {
  const [attempts, setAttempts] = React.useState(7);
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
  const [answer, setAnswer] = React.useState<LetterEntry[]>(() =>
    toAnswerArray(word)
  );
  const [usedLetters, setUsedLetters] = React.useState<Set<string>>(
    () => new Set()
  );

  function toAnswerArray(word: string): LetterEntry[] {
    return word.split("").map((letter) => ({ letter, isHidden: true }));
  }

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleGuess(event.key);
    };

    window.addEventListener("keyup", handleKeyDown);

    return () => window.removeEventListener("keyup", handleKeyDown);
  }, [gameStatus]); //Added gameStatus as dependecy so when the status is changed useEffect rerenders

  function checkIfGameIsWon(entries: LetterEntry[]) {
    if (entries.every((entry) => !entry.isHidden)) {
      setGameStatus("won");
      return;
    }
  }

  function checkGameHaveFinished(attempts: number) {
    if (attempts === 0) {
      setGameStatus("lost");
      return;
    }
  }

  function addLetterToUsedLetters(letter: string) {
    setUsedLetters((prev) => new Set(prev).add(letter));
  }

  function handleGuess(rawLetter: string) {
    //If game ended — ignore
    if (gameStatus !== "running") return;

    const letter = rawLetter.toUpperCase();

    //Check if letter was already used
    if (usedLetters.has(letter)) return;

    //Add letter to used letters array
    addLetterToUsedLetters(letter);

    // Wrong guess
    if (!word.includes(letter)) {
      setAttempts((prevAttempts) => {
        const next = prevAttempts - 1;
        checkGameHaveFinished(next);
        return next;
      });
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

    return;
  }

  function restart() {
    setAttempts(7);
    setGameStatus("running");
    setAnswer(() => toAnswerArray(word));
    setUsedLetters(new Set());
  }

  return {
    attempts,
    answer,
    gameStatus,
    usedLetters,
    isRunning: gameStatus === "running",
    handleGuess,
    restart,
  };
}

export default useHangman;
