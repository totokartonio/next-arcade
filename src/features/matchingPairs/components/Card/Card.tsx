import styles from "./Card.module.css";
import Image from "next/image";

type Props = {
  value: string;
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick?: () => void;
};

function Card({ value, id, isFlipped, isMatched, onClick }: Props) {
  const flippingBack = !isFlipped && !isMatched;

  return (
    <div
      className={styles.cardWrapper}
      tabIndex={0}
      data-id={id}
      onClick={onClick}
      data-testid="mp-card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        id={id}
        data-value={value}
        className={`${styles.card} ${
          isFlipped || isMatched ? styles.flipped : ""
        } ${flippingBack ? styles.flippingBack : ""}`}
      >
        {(isFlipped || isMatched) && (
          <div className={styles.imageWrapper}>
            <Image
              src={`/icons/${value}.png`}
              alt={`${value} icon`}
              fill={true}
              className={styles.cardImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
