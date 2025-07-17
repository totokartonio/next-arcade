import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.linkContainer}>
        <Link href="/arcade/hangman">Hangman</Link>
        <Link href="/arcade/snake">Snake</Link>
        <Link href="/arcade/matching-pairs">Matching Pairs</Link>
      </div>
    </div>
  );
}
