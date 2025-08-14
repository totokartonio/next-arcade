"use client";

import styles from "./MatchingPairsGame.module.css";

import useCheckSearchParams from "@/hooks/useCheckSearchParams";

import { MP_DIFFICULTY } from "./constants";

import Card from "@/features/matchingPairs/components/Card";
import CardsRow from "@/features/matchingPairs/components/CardsRow/CardsRow";
import Timer from "@/features/matchingPairs/components/Timer";
import useMatchingPairs from "@/features/matchingPairs/hooks/useMatchingPairs";

import GameOver from "@/components/GameOver";

function MatchingPairsGame() {
  const { selectedDifficulty, defaultDeck } = useCheckSearchParams();
  const { pairs, totalTime } = MP_DIFFICULTY[selectedDifficulty];

  const {
    deck,
    timeLeft,
    openCardsIds,
    guessedCardsIds,
    handleFlip,
    restart,
    isWon,
    isIdle,
    isRunning,
  } = useMatchingPairs(pairs, totalTime, defaultDeck);

  return (
    <div className={styles.contentContainer} data-testid="game-content">
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
      <div className={styles.belowSlot}>
        {isIdle && (
          <p>
            <strong>Select a card to start playing</strong>
          </p>
        )}
        {!isRunning && (
          <GameOver
            isWon={isWon}
            message={
              isWon
                ? `You won with ${timeLeft} seconds left!`
                : "Time's up. Try again!"
            }
            onClick={restart}
          />
        )}
      </div>
    </div>
  );
}

export default MatchingPairsGame;
