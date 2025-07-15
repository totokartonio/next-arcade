function RestartButton({ onClick }: { onClick: () => void }) {
  return <button onClick={() => onClick()}>New game</button>;
}

export default RestartButton;
