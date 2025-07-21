import { ReactNode, useRef, useEffect } from "react";
import styles from "./DropdownList.module.css";
import LinkButton from "../LinkButton";
import { transformLabel } from "@/utils";

type Props = {
  id: string;
  isOpen: boolean;
  gameTitle: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

function DropdownList({
  isOpen,
  gameTitle,
  id,
  onClick,
  className,
  children,
}: Props) {
  const difficultyOptions = ["easy", "medium", "hard"];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClick(); // Parent's toggler will turn `isOpen` → false
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClick]);

  return (
    <div
      ref={containerRef}
      className={`${styles.dropdownContainer} ${className}`}
      id={id}
      onClick={onClick}
      tabIndex={0}
    >
      {children}
      {isOpen && (
        <div className={styles.dropdown}>
          <span>Select difficulty:</span>
          <ul className={styles.list}>
            {difficultyOptions.map((option, index) => (
              <li key={index}>
                <LinkButton href={`/arcade/${gameTitle}?difficulty=${option}`}>
                  {transformLabel(option)}
                </LinkButton>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownList;
