import styles from "./DropdownList.module.css";
import { ReactNode } from "react";
import useGameSounds from "@/hooks/useGameSounds";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

function Trigger({ onClick, children }: Props) {
  const { playOnClick, playOnHover } = useGameSounds();

  return (
    <div
      className={styles.trigger}
      onClick={() => {
        playOnClick();
        onClick();
      }}
      onMouseEnter={() => playOnHover()}
    >
      {children}
    </div>
  );
}

export default Trigger;
