import React from "react";
import styles from "./CardsRow.module.css";

function CardsRow({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.cardsRowContainer}>
      <div className={styles.cardsRow}>{children}</div>
    </div>
  );
}

export default CardsRow;
