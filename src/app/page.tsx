import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/arcade/hangman">Hangman</Link>
    </div>
  );
}
