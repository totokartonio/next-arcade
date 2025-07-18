import styles from "./Timer.module.css";

function Timer({ timeLeft }: { timeLeft: number }) {
  return (
    <div className={styles.timerContainer}>
      <div className={styles.timer}>{timeLeft}s</div>
    </div>
  );
}

export default Timer;
