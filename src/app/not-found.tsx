import styles from "./page.module.css";

function NotFound() {
  return (
    <div className={styles.content}>
      <h2 className={styles.errorTitle}>404 – Page Not Found</h2>
      <p className={styles.errorMessage}>Looks like this game doesn’t exist.</p>
    </div>
  );
}

export default NotFound;
