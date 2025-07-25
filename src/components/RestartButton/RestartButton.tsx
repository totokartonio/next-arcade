import { useEffect } from "react";
import styles from "./RestartButton.module.css";
import MagicButton from "../ui/MagicButton";

function RestartButton({ onClick }: { onClick: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        onClick();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClick]);

  return (
    <>
      <MagicButton
        as="button"
        variant="primary"
        onClick={onClick}
        className={styles.restartButton}
      >
        New game
      </MagicButton>
      <p>Press SPACE to start a new game</p>
    </>
  );
}

export default RestartButton;
