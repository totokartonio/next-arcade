import { useState, useCallback } from "react";

import { WORDS } from "../data";
import { getRandomInt } from "../utils";
import { Difficulty } from "@/types";

function useWord(difficulty: Difficulty) {
  const [usedWords, setUsedWords] = useState<string[]>([]);

  function randomlySelectWord(wordsArray: string[]) {
    const i = getRandomInt(0, wordsArray.length);

    return wordsArray[i];
  }

  const getNextWord = useCallback(() => {
    const bank = WORDS[difficulty];

    let nextWord: string = randomlySelectWord(WORDS[difficulty]);

    while (usedWords.includes(nextWord)) {
      nextWord = randomlySelectWord(WORDS[difficulty]);
    }

    nextWord = nextWord.toUpperCase();

    const nextUsedWords = [...usedWords, nextWord];

    bank.length === nextUsedWords.length
      ? setUsedWords([])
      : setUsedWords(nextUsedWords);

    console.log(nextWord);

    return nextWord;
  }, [difficulty]);

  return getNextWord;
}

export default useWord;
