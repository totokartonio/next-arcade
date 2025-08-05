/* Used Magic Button by Josh W. Comeau
https://www.joshwcomeau.com/animation/3d-button/ */

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MagicButton.module.css";
import useGameSounds from "@/hooks/useGameSounds";

type CommonProps = {
  children: ReactNode;
  variant: "primary" | "secondary" | "keyButton";
  className?: string;
  enableOnClickSound?: boolean;
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
  const { playOnHover, playOnToggle } = useGameSounds();

  const content = (
    <>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>{props.children}</span>
    </>
  );

  if (props.as === "link") {
    const {
      as,
      href,
      className,
      variant,
      enableOnClickSound = true,
      ...rest
    } = props;
    return (
      <Link
        href={href}
        className={`${styles.container} ${styles[variant]}`}
        onMouseEnter={() => playOnHover()}
        onKeyDown={() => playOnToggle()}
        {...(enableOnClickSound ? { onMouseDown: () => playOnToggle() } : {})}
        {...rest}
      >
        <div className={`${styles.back} ${className || ""}`}>{content}</div>
      </Link>
    );
  }

  const { as, className, variant, enableOnClickSound = true, ...rest } = props;
  return (
    <button
      className={`${styles.back} ${styles[variant]} ${className || ""}`}
      onMouseEnter={() => playOnHover()}
      onKeyDown={() => playOnToggle()}
      {...(enableOnClickSound ? { onMouseDown: () => playOnToggle() } : {})}
      {...rest}
    >
      {content}
    </button>
  );
}
export default MagicButton;
