"use client";

import styles from "./page.module.css";

import useHangman from "@/features/hangman/hooks/useHangman";
import AttemptsCounter from "@/features/hangman/components/AttemptsCounter";
import VirtualKeyboard from "@/features/hangman/components/VirtualKeyboard";
import WordBoard from "@/features/hangman/components/WordBoard";
import RestartButton from "@/components/RestartButton";

function HangmanPage() {
  const {
    attempts,
    answer,
    usedLetters,
    isWon,
    isLost,
    isRunning,
    handleGuess,
    restart,
    word,
  } = useHangman();
  return (
    <div className={styles.contentContainer}>
      <AttemptsCounter attempts={attempts} />
      <WordBoard answer={answer} />
      <VirtualKeyboard
        onClick={handleGuess}
        usedLetters={usedLetters}
        disabled={!isRunning}
      />
      <p>
        <em>{isWon && "You won!"}</em>
      </p>
      <p>
        <strong>{!isRunning && "Game over"}</strong>
      </p>
      <p>
        <strong>{isLost && `The word was ${word}`}</strong>
      </p>
      {!isRunning && <RestartButton onClick={restart} />}
    </div>
  );
}

export default HangmanPage;
