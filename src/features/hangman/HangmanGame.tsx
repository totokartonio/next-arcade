"use client";

import styles from "./HangmanGame.module.css";
import useCheckSearchParams from "@/hooks/useCheckSearchParams";

import useHangman from "@/features/hangman/hooks/useHangman";
import AttemptsCounter from "@/features/hangman/components/AttemptsCounter";
import VirtualKeyboard from "@/features/hangman/components/VirtualKeyboard";
import WordBoard from "@/features/hangman/components/WordBoard";
import RestartButton from "@/components/RestartButton";

function HangmanGame() {
  const selectedDifficulty = useCheckSearchParams();

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
  } = useHangman(selectedDifficulty);
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

export default HangmanGame;
