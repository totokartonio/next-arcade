import { ReactNode, useRef, useEffect } from "react";
import useGameSounds from "@/hooks/useGameSounds";

import styles from "./DropdownList.module.css";

import Trigger from "./Trigger";
import OptionsList from "./OptionsList";

type Option = {
  label: string;
  href: string;
};

type Props = {
  id: string;
  isOpen: boolean;
  title?: string;
  optionsArray: Option[];
  slug: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

function DropdownList({
  isOpen,
  title,
  optionsArray,
  id,
  onClick,
  className,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClick]);

  const { playOnClick } = useGameSounds();

  return (
    <div
      ref={containerRef}
      className={`${styles.dropdownContainer} ${className} ${
        isOpen && styles.open
      }`}
      id={id}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        const targetIsContainer = e.currentTarget === e.target;
        if (targetIsContainer && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
          playOnClick();
        }
      }}
    >
      <Trigger onClick={onClick}>{children}</Trigger>
      {isOpen && <OptionsList optionsArray={optionsArray} title={title} />}
    </div>
  );
}

export default DropdownList;
