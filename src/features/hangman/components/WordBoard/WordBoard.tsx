import styles from "./WordBoard.module.css";

import type { LetterEntry } from "../../types";

import LetterPad from "../LetterPad";

function WordBoard({ answer }: { answer: LetterEntry[] }) {
  return (
    <div className={styles.wordBoard}>
      {answer.map(({ letter, isHidden }, index) => (
        <LetterPad
          key={`${index}-${letter}`}
          isHidden={isHidden}
          letter={letter}
        />
      ))}
    </div>
  );
}

export default WordBoard;
