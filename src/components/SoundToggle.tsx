import { useSoundMuted } from "../hooks/use-sound";

type SpeakerIconProps = { muted: boolean };

function SpeakerIcon(props: SpeakerIconProps) {
  const { muted } = props;

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
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

type SoundToggleProps = {};

export function SoundToggle(props: SoundToggleProps) {
  const { muted, toggle } = useSoundMuted();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-keyshortcuts="m"
      title={`${muted ? "Turn sound on" : "Turn sound off"} (press M)`}
      className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-black"
    >
      <SpeakerIcon muted={muted} />
      {muted ? "Sound off" : "Sound on"}
    </button>
  );
}
