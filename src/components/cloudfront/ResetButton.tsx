type ResetButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function ResetButton(props: ResetButtonProps) {
  const { onClick, disabled } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 pl-2 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 active:translate-y-px disabled:opacity-40 disabled:hover:bg-white"
    >
      <svg
        viewBox="0 0 12 12"
        className="size-2.5 fill-none stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 6a4 4 0 1 1-1.2-2.85" />
        <path d="M9.5 1.5v2.5H7" />
      </svg>
      Reset
    </button>
  );
}
