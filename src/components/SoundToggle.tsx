import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSoundMuted } from "../hooks/use-sound";

type SpeakerIconProps = { muted: boolean };

function SpeakerIcon(props: SpeakerIconProps) {
  const { muted } = props;
  const reduce = useReducedMotion();

  const group = {
    animate: { transition: { staggerChildren: 0.06 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const stroke = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: { pathLength: 0, opacity: 0, transition: { duration: 0.16 } },
  };

  const anim = reduce
    ? { initial: false as const }
    : { initial: "initial", animate: "animate", exit: "exit" };

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <AnimatePresence mode="wait" initial={false}>
        {muted ? (
          <motion.g key="muted" variants={group} {...anim}>
            <motion.line variants={stroke} x1="23" y1="9" x2="17" y2="15" />
            <motion.line variants={stroke} x1="17" y1="9" x2="23" y2="15" />
          </motion.g>
        ) : (
          <motion.g key="on" variants={group} {...anim}>
            <motion.path variants={stroke} d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <motion.path
              variants={stroke}
              d="M19.07 4.93a10 10 0 0 1 0 14.14"
            />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

type SoundToggleProps = {};

export function SoundToggle(props: SoundToggleProps) {
  const { muted, toggle } = useSoundMuted();
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      aria-pressed={!muted}
      aria-keyshortcuts="m"
      title={`${muted ? "Turn sound on" : "Turn sound off"} (press M)`}
      className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors outline-none hover:text-black focus-visible:ring focus-visible:ring-zinc-300"
    >
      <SpeakerIcon muted={muted} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={muted ? "off" : "on"}
          initial={{ opacity: 0, y: reduce ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -4 }}
          transition={{
            duration: reduce ? 0 : 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {muted ? "Sound off" : "Sound on"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
