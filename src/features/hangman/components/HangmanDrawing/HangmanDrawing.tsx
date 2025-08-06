import styles from "./HangmanDrawing.module.css";

type Props = {
  wrongAttempts: number;
};

function HangmanDrawing({ wrongAttempts }: Props) {
  return (
    <svg width="200" height="250" style={{ stroke: "#333", strokeWidth: 4 }}>
      {wrongAttempts > 0 && (
        <>
          <line
            x1="20"
            y1="200"
            x2="180"
            y2="200"
            className={`${styles.drawingPart} ${styles.galowsBase}`}
          />
          <line
            x1="50"
            y1="200"
            x2="50"
            y2="20"
            className={`${styles.drawingPart} ${styles.galowsVertical}`}
          />
          <line
            x1="50"
            y1="20"
            x2="130"
            y2="20"
            className={`${styles.drawingPart} ${styles.galowsTop}`}
          />
          <line
            x1="130"
            y1="20"
            x2="130"
            y2="40"
            className={`${styles.drawingPart} ${styles.galowsRope}`}
          />
        </>
      )}

      {wrongAttempts > 1 && (
        <circle
          cx="130"
          cy="60"
          r="20"
          className={`${styles.drawingPart} ${styles.head}`}
        />
      )}

      {wrongAttempts > 2 && (
        <line
          x1="130"
          y1="80"
          x2="130"
          y2="130"
          className={`${styles.drawingPart} ${styles.body}`}
        />
      )}

      {wrongAttempts > 3 && (
        <line
          x1="130"
          y1="100"
          x2="100"
          y2="110"
          className={`${styles.drawingPart} ${styles.leftArm}`}
        />
      )}

      {wrongAttempts > 4 && (
        <line
          x1="130"
          y1="100"
          x2="160"
          y2="110"
          className={`${styles.drawingPart} ${styles.rightArm}`}
        />
      )}

      {wrongAttempts > 5 && (
        <line
          x1="130"
          y1="130"
          x2="110"
          y2="170"
          className={`${styles.drawingPart} ${styles.leftLeg}`}
        />
      )}

      {wrongAttempts > 6 && (
        <line
          x1="130"
          y1="130"
          x2="150"
          y2="170"
          className={`${styles.drawingPart} ${styles.rightLeg}`}
        />
      )}
    </svg>
  );
}

export default HangmanDrawing;
