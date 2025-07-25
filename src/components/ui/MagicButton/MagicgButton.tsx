/* Used Magic Button by Josh W. Comeau
https://www.joshwcomeau.com/animation/3d-button/ */

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MagicButton.module.css";

type CommonProps = {
  children: ReactNode;
  variant: "primary" | "secondary" | "keyButton";
  className?: string;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & {
    as?: "button";
  };

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & {
    as: "link";
    href: string;
  };

type Props = ButtonProps | LinkProps;

function MagicButton(props: Props) {
  const content = (
    <>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{props.children}</span>
    </>
  );

  if (props.as === "link") {
    const { as, href, className, variant, ...rest } = props;
    return (
      <Link
        href={href}
        className={`${styles.container} ${styles[variant]}`}
        {...rest}
      >
        <div className={`${styles.back} ${className || ""}`}>{content}</div>
      </Link>
    );
  }

  const { as, className, variant, ...rest } = props;
  return (
    <button
      className={`${styles.back} ${styles[variant]} ${className || ""}`}
      {...rest}
    >
      {content}
    </button>
  );
}
export default MagicButton;
