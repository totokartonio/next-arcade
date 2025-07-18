import React from "react";
import LinkToHub from "@/components/LinkToHub";

function HangmanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <LinkToHub />
        <h1>Hangman Game</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

export default HangmanLayout;
