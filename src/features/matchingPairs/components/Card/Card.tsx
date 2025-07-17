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
  return (
    <div
      id={id}
      className={`${styles.card} ${
        isFlipped || isMatched ? styles.cardFace : styles.cardBack
      }`}
      onClick={onClick}
    >
      {(isFlipped || isMatched) && value}
    </div>
  );
}

export default Card;
