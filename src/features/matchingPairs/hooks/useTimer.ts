import { useState, useEffect } from "react";
import { GameStatus } from "@/types";

type Props = {
  gameStatus: GameStatus;
  setGameStatus: (nextGameStatus: GameStatus) => void;
  totalTime: number;
};

function useTimer({ gameStatus, setGameStatus, totalTime }: Props) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (gameStatus !== "running") return;
    if (timeLeft === 0) {
      setGameStatus("lost");
      return;
    }

    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [gameStatus, timeLeft, setGameStatus]);

  function resetTimer() {
    setTimeLeft(totalTime);
  }

  return { timeLeft, resetTimer };
}

export default useTimer;
