import styles from "./page.module.css";
import GameSelector from "@/components/GameSelector";

export default function Home() {
  return (
    <div className={styles.content}>
      <GameSelector />
    </div>
  );
}
