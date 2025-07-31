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
    <div
      className={styles.cardWrapper}
      tabIndex={0}
      data-id={id}
      onClick={onClick}
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
