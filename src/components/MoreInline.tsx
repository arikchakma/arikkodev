import { useState, type ReactNode } from "react";
import { sound } from "../lib/sound";

type MoreInlineProps = { children: ReactNode };

export function MoreInline(props: MoreInlineProps) {
  const { children } = props;
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <span className="text-zinc-600">{children}</span>;
  }

  return (
    <button
      type="button"
      onClick={() => {
        setRevealed(true);
        sound.reveal();
      }}
      className="cursor-help align-baseline text-zinc-600 underline decoration-dotted underline-offset-2 transition-colors hover:text-black"
    >
      (more)
    </button>
  );
}
