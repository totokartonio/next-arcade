import Link from "next/link";
import { ReactNode } from "react";
import styles from "./LinkButton.module.css";

type Props = {
  href: string;
  children: ReactNode;
};

function LinkButton({ href, children }: Props) {
  return (
    <Link href={href}>
      <div className={styles.linkButtonContainer}>{children}</div>
    </Link>
  );
}

export default LinkButton;
