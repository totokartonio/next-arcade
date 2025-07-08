"use client";

import React from "react";

type GameStatus = "running" | "won" | "lost";

type LetterEntry = {
  letter: string;
  isHidden: boolean;
};

const keys = "QWERTYUIOPASDFGHJKLZXCVBNM";
const word = "HANGMAN";

function HangmanPage() {
  const [attempts, setAttempts] = React.useState(7);
  const [gameStatus, setGameStatus] = React.useState<GameStatus>("running");
  const [answer, setAnswer] = React.useState<LetterEntry[]>(() =>
    toAnswerArray(word)
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

  function handleGuess(rawLetter: string) {
    //If game ended — ignore
    if (gameStatus !== "running") return;

    const letter = rawLetter.toUpperCase();

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

  console.log(answer);

  return (
    <div>
      <h1>Hangman Game</h1>
      <p>Attempts left: {attempts}</p>
      <p>{answer.map(({ letter, isHidden }) => (isHidden ? "*" : letter))}</p>
      <p>
        <em>{gameStatus === "won" && "You won!"}</em>
      </p>
      {keys.split("").map((key) => (
        <button
          key={key}
          onClick={() => handleGuess(key)}
          disabled={gameStatus !== "running"}
        >
          {key}
        </button>
      ))}
      <p>
        <strong>{gameStatus !== "running" && "Game over"}</strong>
      </p>
    </div>
  );
}

export default HangmanPage;
