import styles from "./VirtualKeyboard.module.css";

import MagicButton from "@/components/ui/MagicButton";

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
          <MagicButton
            key={letter}
            as="button"
            variant="keyButton"
            onClick={() => onClick(letter)}
            disabled={usedLetters.has(letter)}
          >
            {letter}
          </MagicButton>
        ))}
      </div>
    </fieldset>
  );
}

export default VirtualKeyboard;
