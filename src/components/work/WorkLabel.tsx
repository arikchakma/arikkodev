import type { ReactNode } from "react";
import type { Work } from "./WorkRow";

type WorkLabelProps = { work: Work; trailing?: ReactNode };

// icon · name <dotted leader> tagline. `trailing` sits after the name (e.g. ↗).
export function WorkLabel(props: WorkLabelProps) {
  const { work, trailing } = props;

  const Icon = work.icon;
  return (
    <>
      <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
        <span className="flex w-5 shrink-0 justify-center">
          <Icon className="size-4 text-zinc-400 transition-colors group-hover:text-zinc-600" />
        </span>
        <span className="transition-colors group-hover:text-zinc-600">
          {work.name} {trailing}
        </span>
      </span>

      {/* Dotted leader only earns its keep on the wide inline layout. */}
      <span
        aria-hidden
        className="hidden min-w-8 grow border-b border-dotted border-zinc-200 sm:block"
      />

      {/* Mobile: wraps in full under the name. sm+: truncates as a teaser. */}
      <span className="ml-[30px] text-zinc-500 sm:ml-0 sm:min-w-0 sm:shrink sm:truncate sm:text-right">
        {work.tagline}
      </span>
    </>
  );
}
