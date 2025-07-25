import { useState, useEffect } from "react";

import type { GameStatus } from "@/types";
import type { MemoryCard } from "../types";
import { CARD_POOL } from "../constants";

import useDeck from "./useDeck";
import useTimer from "./useTimer";
import { startIfIdle } from "@/utils";
import { mapIds } from "../utils";

function useMatchingPairs(pairCount: number, totalTime: number) {
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");

  //cards state
  const [openCards, setOpenCards] = useState<MemoryCard[]>([]);
  const [guessedCards, setGuessedCards] = useState<MemoryCard[]>([]);
  const [isBusy, setIsBusy] = useState(false);

  const { deck, resetDeck } = useDeck(pairCount, CARD_POOL);
  const { timeLeft, resetTimer } = useTimer({
    gameStatus,
    setGameStatus,
    totalTime,
  });

  function checkTentativeWin(array: MemoryCard[]) {
    if (array.length === deck.length) {
      setGameStatus("won");
    }
  }

  function checkTentativeGuess(cardArray: MemoryCard[]) {
    if (cardArray[0].value === cardArray[1].value) {
      const nextGuessedCards = [...guessedCards, cardArray[0], cardArray[1]];
      setGuessedCards(nextGuessedCards);
      checkTentativeWin(nextGuessedCards);
      setOpenCards([]);
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      setOpenCards([]);
      setIsBusy(false);
    }, 600);
    return;
  }

  function handleFlip({ id, value }: MemoryCard) {
    startIfIdle(gameStatus, setGameStatus);
    if (gameStatus !== "running" && gameStatus !== "idle") return;
    if (isBusy) return;
    if (
      openCards.some((card) => card.id === id) ||
      guessedCards.some((card) => card.id === id)
    )
      return;
    const nextOpenCards = [...openCards, { id, value }];
    setOpenCards(nextOpenCards);

    if (nextOpenCards.length === 2) {
      checkTentativeGuess(nextOpenCards);
    }
  }

  function restart() {
    resetDeck();
    resetTimer();
    setOpenCards([]);
    setGuessedCards([]);
    setGameStatus("idle");
  }

  const openCardsIds = mapIds(openCards);
  const guessedCardsIds = mapIds(guessedCards);

  return {
    deck,
    timeLeft,
    openCardsIds,
    guessedCardsIds,
    handleFlip,
    restart,
    isWon: gameStatus === "won",
    isLost: gameStatus === "lost",
    isIdle: gameStatus === "idle",
    isRunning: gameStatus === "running" || gameStatus === "idle",
  };
}

export default useMatchingPairs;
