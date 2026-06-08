import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { sound } from "../lib/sound";

export function useInvalidation() {
  const reduce = useReducedMotion() ?? false;
  const [fired, setFired] = useState(false);
  const [fireId, setFireId] = useState(0);
  const replayTimer = useRef<number | null>(null);

  const fire = useCallback(() => {
    sound.reveal();

    if (reduce) {
      setFired((prev) => !prev);
      return;
    }

    if (replayTimer.current) window.clearTimeout(replayTimer.current);
    setFired(false);
    replayTimer.current = window.setTimeout(() => {
      setFired(true);
      setFireId((id) => id + 1);
    }, 20);
  }, [reduce]);

  const reset = useCallback(() => {
    if (replayTimer.current) window.clearTimeout(replayTimer.current);
    setFired(false);
  }, []);

  return { fired, fireId, fire, reset, reduce };
}
