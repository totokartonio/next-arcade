"use client";

import styles from "./MatchingPairsGame.module.css";

import useCheckSearchParams from "@/hooks/useCheckSearchParams";

import { MP_DIFFICULTY, CARD_POOL } from "./constants";

import Card from "@/features/matchingPairs/components/Card";
import CardsRow from "@/features/matchingPairs/components/CardsRow/CardsRow";
import Timer from "@/features/matchingPairs/components/Timer";
import RestartButton from "@/components/RestartButton";
import useMatchingPairs from "@/features/matchingPairs/hooks/useMatchingPairs";

function MatchingPairsGame() {
  const selectedDifficulty = useCheckSearchParams();
  const { pairs, totalTime } = MP_DIFFICULTY[selectedDifficulty];

  const {
    deck,
    timeLeft,
    openCardsIds,
    guessedCardsIds,
    handleFlip,
    restart,
    isWon,
    isLost,
    isIdle,
    isRunning,
  } = useMatchingPairs(pairs, totalTime);

  return (
    <div className={styles.contentContainer}>
      <Timer timeLeft={timeLeft} />
      <CardsRow>
        {deck.map(({ value, id }) => {
          return (
            <Card
              value={value}
              key={id}
              id={id}
              isFlipped={openCardsIds.includes(id)}
              isMatched={guessedCardsIds.includes(id)}
              onClick={() => handleFlip({ value, id })}
            />
          );
        })}
      </CardsRow>
      <p>
        <em>
          {isWon && `You won with ${timeLeft} seconds left!`}
          {isLost && "Time's up. Try again!"}
        </em>
      </p>
      <p>
        <strong>{isIdle && "Select a card to start playing"}</strong>
        <strong>{!isRunning && "Game over"}</strong>
      </p>
      {!isRunning && <RestartButton onClick={restart} />}
    </div>
  );
}

export default MatchingPairsGame;
