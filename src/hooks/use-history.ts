import { useCallback, useState } from "react";

const mergeWindowMs = 500;
const maxEntries = 100;

type History<T> = {
  past: T[];
  present: T;
  future: T[];
  changedAt: number;
};

export function useHistory<T>(initial: T) {
  const [history, setHistory] = useState<History<T>>({
    past: [],
    present: initial,
    future: [],
    changedAt: 0,
  });

  const set = useCallback((update: (present: T) => T) => {
    setHistory((previous) => {
      const next = update(previous.present);
      if (Object.is(next, previous.present)) return previous;

      const now = Date.now();
      const merge = now - previous.changedAt < mergeWindowMs;
      return {
        past: merge
          ? previous.past
          : [...previous.past, previous.present].slice(-maxEntries),
        present: next,
        future: [],
        changedAt: now,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((previous) => {
      if (previous.past.length === 0) return previous;
      return {
        past: previous.past.slice(0, -1),
        present: previous.past[previous.past.length - 1],
        future: [previous.present, ...previous.future],
        changedAt: 0,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((previous) => {
      if (previous.future.length === 0) return previous;
      return {
        past: [...previous.past, previous.present],
        present: previous.future[0],
        future: previous.future.slice(1),
        changedAt: 0,
      };
    });
  }, []);

  return {
    present: history.present,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    set,
    undo,
    redo,
  };
}
