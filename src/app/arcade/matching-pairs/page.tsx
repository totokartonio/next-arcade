"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

import type { GameStatus } from "@/types";
import { startIfIdle } from "@/utils";

import Card from "@/features/matchingPairs/components/Card";
import RestartButton from "@/components/RestartButton";

type MemoryCard = {
  id: string;
  value: any;
};

const VALUES = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
const TOTAL_TIME = 60;

function MatchingPairsPage() {
  const [deck, setDeck] = useState<MemoryCard[]>(() => arrayToDeck(VALUES));
  const [openCards, setOpenCards] = useState<MemoryCard[]>([]);
  const [guessedCards, setGuessedCards] = useState<MemoryCard[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    setDeck((prev) => shuffleDeck(prev));
  }, []);

  useEffect(() => {
    if (gameStatus !== "running") return;
    if (!timeLeft) {
      setGameStatus("lost");
      return;
    }

    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [gameStatus, timeLeft]);

  function shuffleDeck(array: any[]) {
    const copy = [...array];
    for (let i = copy.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function arrayToDeck(array: any[]) {
    const objectList = [];
    for (let i = 0; i < array.length; i++) {
      objectList.push({ value: array[i], id: `${array[i]}-${i}` });
    }
    return objectList;
  }

  function checkTentativeWin(array: MemoryCard[]) {
    if (array.length === deck.length) {
      setGameStatus("won");
      setTimeLeft((t) => t);
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

  function handleClick({ id, value }: MemoryCard) {
    startIfIdle(gameStatus, setGameStatus);
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
    setDeck(() => shuffleDeck(deck));
    setOpenCards([]);
    setGuessedCards([]);
    setTimeLeft(TOTAL_TIME);
    setGameStatus("idle");
  }

  const isIdle = gameStatus === "idle";
  const isRunning = gameStatus === "running" || gameStatus === "idle";

  return (
    <>
      <header>
        <h1>Matching Pairs Game</h1>
      </header>
      <main>
        <span className={styles.timer}>{timeLeft}s</span>
        <div className={styles.cardsRowContainer}>
          <div className={styles.cardsRow}>
            {deck.map(({ value, id }) => {
              return (
                <Card
                  value={value}
                  key={id}
                  id={id}
                  isFlipped={openCards.some((card) => card.id === id)}
                  isMatched={guessedCards.some((card) => card.id === id)}
                  onClick={() => handleClick({ value, id })}
                />
              );
            })}
          </div>
        </div>
        <p>
          <em>
            {gameStatus === "won" && `You won with ${timeLeft} seconds left!`}
          </em>
        </p>
        <p>
          <strong>{isIdle && "Select a card to start playing"}</strong>
          <strong>{!isRunning && "Game over"}</strong>
        </p>
        {!isRunning && <RestartButton onClick={restart} />}
      </main>
    </>
  );
}

export default MatchingPairsPage;
