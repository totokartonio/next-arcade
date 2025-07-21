"use client";

import { useState } from "react";
import styles from "./GameSelector.module.css";
import DropdownList from "../DropdownList";
import { transformLabel } from "@/utils";

function GameSelector() {
  const [isSelected, setIsSelected] = useState<string | null>(null);

  function handleOnClick(id: string) {
    if (id === isSelected) {
      setIsSelected(null);
      return;
    }
    setIsSelected(id);
  }

  const games = ["hangman", "snake", "matching-pairs"];

  return (
    <div className={styles.container}>
      {games.map((game) => (
        <DropdownList
          gameTitle={game}
          id={game}
          key={game}
          onClick={() => handleOnClick(game)}
          isOpen={isSelected === game}
          className={styles.gameOption}
        >
          {transformLabel(game)}
        </DropdownList>
      ))}
    </div>
  );
}

export default GameSelector;
