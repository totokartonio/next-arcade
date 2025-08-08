"use client";

import styles from "./page.module.css";
import MagicButton from "@/components/ui/MagicButton";

function Error({
  reset,
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <div className={styles.gameContainer}>
      <h3 className={styles.errorTitle}>Game Crashed!</h3>
      <div className={styles.errorContent}>
        <p className={styles.errorMessage}>
          Sorry, something went wrong with the game.
        </p>
        <div className={styles.actions}>
          <MagicButton
            as="button"
            variant="primary"
            onClick={() => reset()}
            className={styles.retryButton}
          >
            Try Again
          </MagicButton>
          <MagicButton
            as="link"
            variant="secondary"
            href="/"
            className={styles.homeButton}
          >
            Back to Hub
          </MagicButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
