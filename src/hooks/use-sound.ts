import { useSyncExternalStore } from "react";
import { sound } from "../lib/sound";

// Subscribes the UI to the shared mute flag. `muted` defaults to true (sound
// off) on the server and before hydration.
export function useSoundMuted() {
  const muted = useSyncExternalStore(
    (listener) => sound.subscribe(listener),
    () => sound.isMuted(),
    () => true,
  );

  return { muted, toggle: () => sound.toggle() };
}
