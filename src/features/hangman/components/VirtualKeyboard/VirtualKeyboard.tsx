import styles from "./VirtualKeyboard.module.css";

import KeyButton from "../KeyButton";

import { KEYS } from "../../data";

type Props = {
  onClick: (letter: string) => void;
  usedLetters: Set<string>;
  disabled: boolean;
};

function VirtualKeyboard({ onClick, usedLetters, disabled }: Props) {
  return (
    <fieldset className={styles.virtualKeyboardFieldset} disabled={disabled}>
      <div className={styles.virtualKeyboard}>
        {KEYS.split("").map((letter) => (
          <KeyButton
            key={letter}
            letter={letter}
            onClick={onClick}
            wasSelected={usedLetters.has(letter)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default VirtualKeyboard;
