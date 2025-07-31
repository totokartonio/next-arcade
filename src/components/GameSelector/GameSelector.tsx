"use client";

import { useState } from "react";
import styles from "./GameSelector.module.css";
import DropdownList from "../DropdownList";
import { GAMES_CATALOGUE } from "@/constants";

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
      {games.map(({ title, slug }) => (
        <DropdownList
          slug={slug}
          id={slug}
          key={slug}
          onClick={() => handleOnClick(slug)}
          isOpen={isSelected === slug}
          className={styles.gameOption}
        >
          {title}
        </DropdownList>
      ))}
    </div>
  );
}

export default GameSelector;
