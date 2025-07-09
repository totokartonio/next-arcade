type GameStatus = "running" | "won" | "lost";

type LetterEntry = {
  letter: string;
  isHidden: boolean;
};

export type { GameStatus, LetterEntry };
