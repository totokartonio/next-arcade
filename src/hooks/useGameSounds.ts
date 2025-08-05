import useSound from "use-sound";
import useSoundStore from "@/stores/SoundStore";

function useGameSounds() {
  const muted = useSoundStore((state) => state.muted);

  const [playOnHover] = useSound("/sounds/hover.mp3", {
    volume: 0.4,
    soundEnabled: !muted,
  });

  const [playOnClick] = useSound("/sounds/click.mp3", {
    volume: 0.4,
    soundEnabled: !muted,
  });

  const [playOnToggle] = useSound("/sounds/toggle.mp3", {
    volume: 0.4,
    soundEnabled: !muted,
  });

  const [playOnToggleForce] = useSound("/sounds/toggle.mp3", {
    // To make toggle sound on mute button when trying to unmute
    volume: 0.4,
    soundEnabled: true,
  });

  const [playOnDisabled] = useSound("/sounds/disabled.mp3", {
    volume: 0.4,
    soundEnabled: !muted,
  });

  const [playOnWon] = useSound("/sounds/win.mp3", {
    volume: 0.4,
    soundEnabled: !muted,
  });

  const [playOnLose] = useSound("/sounds/lose.mp3", {
    volume: 0.2,
    soundEnabled: !muted,
  });

  // Snake
  const [playOnBite] = useSound("/sounds/crunch.mp3", {
    volume: 0.5,
    soundEnabled: !muted,
  });

  const [playOnTurn] = useSound("/sounds/whoosh.mp3", {
    volume: 0.3,
    soundEnabled: !muted,
  });

  // Matching Pairs
  const [playOnFlip] = useSound("/sounds/flip.mp3", {
    volume: 0.2,
    soundEnabled: !muted,
  });

  const [playOnMatch] = useSound("/sounds/ding.mp3", {
    volume: 0.2,
    soundEnabled: !muted,
  });

  return {
    playOnHover,
    playOnClick,
    playOnToggle,
    playOnToggleForce,
    playOnDisabled,
    playOnWon,
    playOnLose,
    playOnBite,
    playOnTurn,
    playOnFlip,
    playOnMatch,
  };
}

export default useGameSounds;
