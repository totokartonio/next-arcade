import { useState } from "react";

function useAttempts(max: number, onLose: () => void) {
  const [attempts, setAttempts] = useState(max);

  //Wrong guess
  function consumeAttempt() {
    setAttempts((prevAttempts) => {
      const next = prevAttempts - 1;
      if (next === 0) onLose(); //Check if game is lost
      return next;
    });
  }

  function resetAttempts() {
    setAttempts(max);
  }

  return { attempts, consumeAttempt, resetAttempts };
}

export default useAttempts;
