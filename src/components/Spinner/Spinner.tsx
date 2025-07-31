import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 24 24" width="50" height="50">
        <rect className={styles.rect} x="1" y="1" width="10" height="10" />
        <rect
          className={`${styles.rect} ${styles.delay1}`}
          x="1"
          y="1"
          width="10"
          height="10"
        />
        <rect
          className={`${styles.rect} ${styles.delay2}`}
          x="1"
          y="1"
          width="10"
          height="10"
        />
      </svg>
    </div>
  );
}

export default Spinner;
