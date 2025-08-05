import { useState } from "react";

import type { GameStatus } from "@/types";
import { startIfIdle } from "@/utils";
import useGameSounds from "@/hooks/useGameSounds";

import type { MemoryCard } from "../types";
import { CARD_POOL } from "../constants";

import useDeck from "./useDeck";
import useTimer from "./useTimer";

import { mapIds } from "../utils";
import { checkTentativeGuess } from "../utils";
import { checkTentativeWin } from "../utils";

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

  const { playOnFlip, playOnDisabled, playOnMatch, playOnWon } =
    useGameSounds();

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

    playOnFlip();

    if (nextOpenCards.length === 2) {
      if (checkTentativeGuess(nextOpenCards)) {
        const nextGuessedCards = [...guessedCards, ...nextOpenCards];

        setTimeout(() => {
          playOnMatch();
        }, 300);

        setGuessedCards(nextGuessedCards);

        if (checkTentativeWin(nextGuessedCards, deck)) {
          playOnWon();
          setGameStatus("won");
        }
        setOpenCards([]);
      } else {
        setIsBusy(true);
        setTimeout(() => {
          playOnDisabled();
          setOpenCards([]);
          setIsBusy(false);
        }, 600);
      }
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
    isIdle: gameStatus === "idle",
    isRunning: gameStatus === "running" || gameStatus === "idle",
  };
}

export default useMatchingPairs;
