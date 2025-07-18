import Link from "next/link";
import styles from "./LinkToHub.module.css";

function LinkToHub() {
  return (
    <nav className={styles.navigation}>
      <Link href="/">Back to Hub</Link>
    </nav>
  );
}

export default LinkToHub;
