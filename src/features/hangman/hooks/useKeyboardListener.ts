import { useEffect } from "react";

function useKeyboardListener(onKey: (key: string) => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    function handleKeyDown(event: KeyboardEvent) {
      return onKey(event.key);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKey, active]);
}

export default useKeyboardListener;
