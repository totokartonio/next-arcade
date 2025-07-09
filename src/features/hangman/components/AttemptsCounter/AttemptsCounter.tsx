import styles from "./AttemptsCounter.module.css";

function AttemptsCounter({ attempts }: { attempts: number }) {
  return <div className={styles.counter}>Attempts left {attempts}</div>;
}

export default AttemptsCounter;
