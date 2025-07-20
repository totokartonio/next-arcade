import HangmanGame from "@/features/hangman/HangmanGame";
import SnakeGame from "@/features/snake/SnakeGame";
import MatchingPairsGame from "@/features/matchingPairs/MatchingPairsGame";

enum Games {
  HANGMAN = "hangman",
  SNAKE = "snake",
  MATCHING_PAIRS = "matching-pairs",
}

const isGame = (game: string): game is Games =>
  Object.values(Games).includes(game as Games);
const MAP_GAME_TO_COMPONENT: Record<Games, React.FC> = {
  [Games.HANGMAN]: HangmanGame,
  [Games.SNAKE]: SnakeGame,
  [Games.MATCHING_PAIRS]: MatchingPairsGame,
};

async function GamePage({ params }: { params: { game: string } }) {
  const { game } = await params;

  if (!isGame(game)) {
    throw new Error(`${game} game does not exist`);
  }

  const Component = MAP_GAME_TO_COMPONENT[game];
  return <Component />;
}

export default GamePage;
