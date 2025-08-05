import styles from "./MuteButton.module.css";
import useSoundStore from "@/stores/SoundStore";
import useGameSounds from "@/hooks/useGameSounds";

import MagicButton from "../ui/MagicButton";

import SpeakerHigh from "@/assets/speaker-high.svg";
import SpeakerMute from "@/assets/speaker-mute.svg";

function MuteButton() {
  const muted = useSoundStore((state) => state.muted);
  const toggleMute = useSoundStore((state) => state.toggleMute);

  const { playOnToggle, playOnToggleForce } = useGameSounds();

  function handleOnClick() {
    if (muted) {
      playOnToggleForce();
    }

    toggleMute();
  }

  return (
    <MagicButton
      as="button"
      variant="secondary"
      className={styles.button}
      onClick={handleOnClick}
    >
      {muted ? <SpeakerMute /> : <SpeakerHigh />}
    </MagicButton>
  );
}

export default MuteButton;
