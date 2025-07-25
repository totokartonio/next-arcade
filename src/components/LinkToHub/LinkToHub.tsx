import MagicButton from "../ui/MagicButton";
import styles from "./LinkToHub.module.css";

function LinkToHub() {
  return (
    <nav className={styles.navigation}>
      <MagicButton
        as="link"
        variant="secondary"
        href="/"
        className={styles.button}
      >
        Back to Hub
      </MagicButton>
    </nav>
  );
}

export default LinkToHub;
