"use client";

import styles from "./HangmanGame.module.css";
import useCheckSearchParams from "@/hooks/useCheckSearchParams";

import useHangman from "@/features/hangman/hooks/useHangman";
import AttemptsCounter from "@/features/hangman/components/AttemptsCounter";
import VirtualKeyboard from "@/features/hangman/components/VirtualKeyboard";
import WordBoard from "@/features/hangman/components/WordBoard";
import GameOver from "@/components/GameOver";
import HangmanDrawing from "./components/HangmanDrawing";
import { ATTEMPTS } from "./data";

function HangmanGame() {
  const selectedDifficulty = useCheckSearchParams();

  const {
    attempts,
    answer,
    usedLetters,
    isWon,
    isRunning,
    handleGuess,
    restart,
    word,
  } = useHangman(selectedDifficulty);
  return (
    <div className={styles.contentContainer}>
      <AttemptsCounter attempts={attempts} />
      <HangmanDrawing wrongAttempts={ATTEMPTS - attempts} />
      {isRunning ? (
        <>
          <WordBoard answer={answer} />
          <VirtualKeyboard
            onClick={handleGuess}
            usedLetters={usedLetters}
            disabled={!isRunning}
          />
        </>
      ) : (
        <GameOver
          isWon={isWon}
          message={!isWon ? `The word was ${word}` : null}
          onClick={restart}
        />
      )}
    </div>
  );
}

export default HangmanGame;
