type InvalidateButtonProps = {
  onClick: () => void;
  label: string;
};

export function InvalidateButton(props: InvalidateButtonProps) {
  const { onClick, label } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-2 rounded-lg bg-black px-3 pl-2 py-1.5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 active:translate-y-px"
    >
      <svg viewBox="0 0 12 12" className="size-2.5 fill-current" aria-hidden="true">
        <path d="M3.4 2.4v7.2a.5.5 0 0 0 .77.42l5.5-3.6a.5.5 0 0 0 0-.84l-5.5-3.6a.5.5 0 0 0-.77.42Z" />
      </svg>
      {label}
    </button>
  );
}
