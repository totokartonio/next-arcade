import React from "react";
import LinkToHub from "@/components/LinkToHub";

function SnakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <LinkToHub />
        <h1>Snake Game</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

export default SnakeLayout;
