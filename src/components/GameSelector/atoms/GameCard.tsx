import { useEffect, useRef } from "react";
import useGameSounds from "@/hooks/useGameSounds";
import styles from "../GameSelector.module.css";
import Image, { StaticImageData } from "next/image";
import OptionsList from "./OptionsList";

type Option = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  id: string;
  img: StaticImageData;
  isSelected: boolean;
  onClick: () => void;
  onDisselect: () => void;
  optionsArray: Option[];
};

function GameCard({
  title,
  id,
  img,
  isSelected,
  onClick,
  onDisselect,
  optionsArray,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSelected) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onDisselect();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDisselect();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    };
  }, [isSelected, onDisselect]);

  const { playOnHover } = useGameSounds();

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => playOnHover()}
      className={`${styles.cardContainer} ${styles.card} ${
        isSelected && styles.selected
      }`}
      tabIndex={0}
      id={id}
      data-id={id}
      onClick={onClick}
      data-testid="game-card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className={`${styles.originalContent} ${
          isSelected ? styles.hidden : ""
        }`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={img.src}
            alt={`${title} cover`}
            fill={true}
            className={styles.cover}
            sizes="(max-width: 2560px) 150px, 250px"
          />
        </div>
        <span>{title}</span>
      </div>

      <OptionsList
        title={title}
        optionsArray={optionsArray}
        isVisible={isSelected}
      />
    </div>
  );
}

export default GameCard;
