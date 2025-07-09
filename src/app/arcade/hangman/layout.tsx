import React from "react";

function HangmanLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <h1>Hangman Game</h1>
      {children}
    </main>
  );
}

export default HangmanLayout;
