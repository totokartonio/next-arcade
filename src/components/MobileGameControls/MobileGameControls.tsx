import styles from "./MobileGameControls.module.css";
import useCheckIfIsMobile from "@/hooks/useCheckIfIsMobile";
import MagicButton from "../ui/MagicButton";

function MobileGameControls({
  onDirectionChange,
}: {
  onDirectionChange?: (direction: "up" | "down" | "left" | "right") => void;
}) {
  const isMobile = useCheckIfIsMobile();

  if (!isMobile) return null;

  return (
    <div className={styles.mobileControls} data-testid="mobile-controls">
      <div className={styles.dpad}>
        <div className={styles.upperRow}>
          <MagicButton
            as="button"
            variant="dpad"
            className={`${styles.dpadButton} ${styles.up}`}
            onClick={() => onDirectionChange?.("up")}
            enableOnClickSound={false}
          >
            ↑
          </MagicButton>
        </div>

        <div className={styles.middleRow}>
          <MagicButton
            as="button"
            variant="dpad"
            className={`${styles.dpadButton} ${styles.left}`}
            onClick={() => onDirectionChange?.("left")}
            enableOnClickSound={false}
          >
            ←
          </MagicButton>

          <MagicButton
            as="button"
            variant="dpad"
            className={`${styles.dpadButton} ${styles.right}`}
            onClick={() => onDirectionChange?.("right")}
            enableOnClickSound={false}
          >
            →
          </MagicButton>
        </div>
        <div className={styles.lowerRow}>
          <MagicButton
            as="button"
            variant="dpad"
            className={`${styles.dpadButton} ${styles.down}`}
            onClick={() => onDirectionChange?.("down")}
            enableOnClickSound={false}
          >
            ↓
          </MagicButton>
        </div>
      </div>
    </div>
  );
}

export default MobileGameControls;
