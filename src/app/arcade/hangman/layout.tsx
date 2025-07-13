import React from "react";

function HangmanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Hangman Game</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

export default HangmanLayout;
