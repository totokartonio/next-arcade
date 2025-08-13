"use client";

import styles from "./Nav.module.css";
import { usePathname } from "next/navigation";

import MuteButton from "../MuteButton";

import MagicButton from "../ui/MagicButton";

function Nav() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className={styles.navigation}>
      {!isHomePage && (
        <MagicButton
          as="link"
          variant="secondary"
          href="/"
          className={isHomePage ? styles.hidden : styles.button}
        >
          Back to Hub
        </MagicButton>
      )}
      <div className={styles.controlGroup}>
        <MuteButton data-testid="mute-button" />
      </div>
    </nav>
  );
}

export default Nav;
