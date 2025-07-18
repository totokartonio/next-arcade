import React from "react";
import LinkToHub from "@/components/LinkToHub";

function MatchingPairsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <LinkToHub />
        <h1>Matching Pairs Game</h1>
      </header>
      <main>{children}</main>
    </>
  );
}

export default MatchingPairsLayout;
