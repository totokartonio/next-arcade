"use client";

import { useState } from "react";
import useGameSounds from "@/hooks/useGameSounds";
import styles from "./GameSelector.module.css";
import GameCard from "./atoms/GameCard";
import { GAMES_CATALOGUE, DIFFICULTIES } from "@/constants";

function GameSelector() {
  const [isSelected, setIsSelected] = useState<string | null>(null);

  function handleOnClick(id: string) {
    if (id !== isSelected) {
      playOnClick();
    }
    setIsSelected(id);
  }

  function handleDisselect() {
    setIsSelected(null);
  }

  const games = Object.values(GAMES_CATALOGUE);

  const { playOnClick } = useGameSounds();

  return (
    <div className={styles.container}>
      {games.map(({ title, slug, img }) => {
        const gameOptions = [];

        for (const difficulty of DIFFICULTIES) {
          gameOptions.push({
            label: difficulty,
            href: `/arcade/${slug}?difficulty=${difficulty}`,
          });
        }

        return (
          <GameCard
            onClick={() => handleOnClick(slug)}
            onDisselect={handleDisselect}
            key={slug}
            title={title}
            id={slug}
            img={img}
            isSelected={slug === isSelected}
            optionsArray={gameOptions}
          />
        );
      })}
    </div>
  );
}

export default GameSelector;
