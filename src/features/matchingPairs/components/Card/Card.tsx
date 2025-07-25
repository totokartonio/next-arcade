import { useState } from "react";
import styles from "./Card.module.css";

type Props = {
  value: any;
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick?: () => void;
};

function Card({ value, id, isFlipped, isMatched, onClick }: Props) {
  const flippingBack = !isFlipped && !isMatched;

  return (
    <div className={styles.cardWrapper}>
      <div
        id={id}
        className={`${styles.card} ${
          isFlipped || isMatched ? styles.flipped : ""
        } ${flippingBack ? styles.flippingBack : ""}`}
        onClick={onClick}
      >
        {(isFlipped || isMatched) && (
          <img
            src={`/icons/${value}.png`}
            alt={`${value} icon`}
            className={styles.cardImage}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
