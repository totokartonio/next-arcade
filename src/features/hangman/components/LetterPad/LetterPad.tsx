import styles from "./LetterPad.module.css";

type Props = {
  letter: string;
  isHidden: boolean;
};

function LetterPad({ letter, isHidden }: Props) {
  return (
    <div className={`${styles.pad} ${styles[isHidden ? "closed" : "open"]}`}>
      {!isHidden && letter}
    </div>
  );
}

export default LetterPad;
