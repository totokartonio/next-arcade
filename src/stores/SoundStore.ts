import { create } from "zustand";

type SoundState = {
  muted: boolean;
  toggleMute: () => void;
};

const useSoundStore = create<SoundState>((set) => ({
  muted: false,
  toggleMute: () => set((state) => ({ muted: !state.muted })),
}));

export default useSoundStore;
