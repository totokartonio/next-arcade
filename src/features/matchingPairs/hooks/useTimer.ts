import { useState, useEffect } from "react";
import { GameStatus } from "@/types";
import useGameSounds from "@/hooks/useGameSounds";

type Props = {
  gameStatus: GameStatus;
  setGameStatus: (nextGameStatus: GameStatus) => void;
  totalTime: number;
};

function useTimer({ gameStatus, setGameStatus, totalTime }: Props) {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const { playOnLose } = useGameSounds();

  useEffect(() => {
    if (gameStatus !== "running") return;
    if (timeLeft === 0) {
      playOnLose();
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
