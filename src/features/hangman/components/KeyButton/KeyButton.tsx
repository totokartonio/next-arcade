import React from "react";

import styles from "./KeyButton.module.css";

type Props = {
  letter: string;
  wasSelected: boolean;
  onClick: (letter: string) => void;
};

function KeyButton({ letter, wasSelected, onClick }: Props) {
  return (
    <button
      className={styles.keyButton}
      onClick={() => onClick(letter)}
      disabled={wasSelected}
    >
      {letter}
    </button>
  );
}

export default KeyButton;
