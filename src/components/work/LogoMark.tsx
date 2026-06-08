type LogoMarkProps = { name: string; logo?: string };

// Company logo, or a rounded letter-mark fallback when there's no asset.
export function LogoMark(props: LogoMarkProps) {
  const { name, logo } = props;

  if (logo) {
    return (
      <img
        src={logo}
        alt={`${name} logo`}
        width={20}
        height={20}
        className="size-5 shrink-0 rounded-[5px] object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="grid size-5 shrink-0 place-items-center rounded-[5px] bg-zinc-100 text-[10px] font-medium text-zinc-500"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
