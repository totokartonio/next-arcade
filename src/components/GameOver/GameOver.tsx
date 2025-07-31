import styles from "./GameOver.module.css";
import RestartButton from "../RestartButton";
type Props = {
  isWon: boolean;
  message?: string | null;
  onClick: () => void;
};

function GameOver({ isWon, message, onClick }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Game Over</h2>
      {isWon && (
        <p>
          <em>{"You won!"}</em>
        </p>
      )}
      {message && <p>{message}</p>}
      <RestartButton onClick={onClick} />
    </div>
  );
}

export default GameOver;
