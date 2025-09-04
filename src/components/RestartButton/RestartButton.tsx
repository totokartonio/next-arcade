import { useEffect } from "react";
import styles from "./RestartButton.module.css";
import useGameSounds from "@/hooks/useGameSounds";
import useCheckIfIsMobile from "@/hooks/useCheckIfIsMobile";
import MagicButton from "../ui/MagicButton";

function RestartButton({ onClick }: { onClick: () => void }) {
  const { playOnToggle } = useGameSounds();

  const isMobile = useCheckIfIsMobile();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        playOnToggle();
        onClick();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClick, playOnToggle]);

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
      {!isMobile && <p>Press SPACE to start a new game</p>}
    </>
  );
}

export default RestartButton;
