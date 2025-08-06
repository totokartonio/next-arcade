"use client";

import { useState } from "react";
import styles from "./GameSelector.module.css";
import DropdownList from "../DropdownList";
import { GAMES_CATALOGUE, DIFFICULTIES } from "@/constants";

function GameSelector() {
  const [isSelected, setIsSelected] = useState<string | null>(null);

  function handleOnClick(id: string) {
    if (id === isSelected) {
      setIsSelected(null);
      return;
    }
    setIsSelected(id);
  }

  const games = Object.values(GAMES_CATALOGUE);

  return (
    <div className={styles.container}>
      {games.map(({ title, slug, img }) => {
        const gameOptions = [];

        for (let difficulty of DIFFICULTIES) {
          gameOptions.push({
            label: difficulty,
            href: `/arcade/${slug}?difficulty=${difficulty}`,
          });
        }

        return (
          <DropdownList
            slug={slug}
            id={slug}
            title={"Select difficulty:"}
            optionsArray={gameOptions}
            key={slug}
            onClick={() => handleOnClick(slug)}
            isOpen={isSelected === slug}
            className={styles.gameOption}
          >
            <img
              src={img.src}
              alt={`${title} cover`}
              className={styles.cover}
            />
            {title}
          </DropdownList>
        );
      })}
    </div>
  );
}

export default GameSelector;
