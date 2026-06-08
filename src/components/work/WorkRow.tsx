import {
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { WorkLabel } from "./WorkLabel";
import { sound } from "../../lib/sound";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type Work = {
  name: string;
  tagline: string;
  icon: IconComponent;
  href?: string;
  // Overrides the link chip's text (defaults to the href's host). Use for
  // internal links where a host wouldn't read well, e.g. "Read the write-up".
  linkLabel?: string;
  // Shown in the expanded panel, e.g. "Sep 2023".
  date?: string;
  description?: ReactNode;
};

const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
} as const;

// A link's host without protocol/www, e.g. "draw.roadmap.sh".
function hostLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

type WorkRowProps = { work: Work; index: number };

// One work row, in one of three shapes: expandable (has a description),
// a link out (has an href), or a plain static row. `index` drives the hover
// "wheel" detent pitch so sweeping the list ratchets up the scale.
export function WorkRow(props: WorkRowProps) {
  const { work, index } = props;

  const [open, setOpen] = useState(false);

  if (work.description) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) sound.open();
            else sound.close();
          }}
          onMouseEnter={() => sound.detent(index)}
          aria-expanded={open}
          className="group flex w-full cursor-help flex-col items-start gap-0.5 py-1 text-left hover:bg-zinc-100 rounded-lg px-1 sm:flex-row sm:items-center sm:gap-3"
        >
          <WorkLabel work={work} />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div {...expand} className="overflow-hidden">
              <div className="my-1.5 ml-9">
                <div className="mb-1.5 flex items-center gap-1.5">
                  {work.date && (
                    <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-sm tabular-nums text-zinc-500">
                      {work.date}
                    </span>
                  )}
                  {work.href && (
                    <a
                      href={work.href}
                      target={
                        work.href.startsWith("http") ? "_blank" : undefined
                      }
                      className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-black"
                    >
                      {work.linkLabel ?? hostLabel(work.href)} ↗
                    </a>
                  )}
                </div>

                <div className="max-w-prose leading-relaxed text-zinc-500 text-pretty">
                  {work.description}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (work.href) {
    return (
      <a
        href={work.href}
        target={work.href.startsWith("http") ? "_blank" : undefined}
        onMouseEnter={() => sound.detent(index)}
        onClick={() => sound.nav()}
        className="group flex flex-col items-start gap-0.5 py-1 hover:bg-zinc-100 rounded-lg px-1 sm:flex-row sm:items-center sm:gap-3"
      >
        <WorkLabel
          work={work}
          trailing={
            <span className="ml-0.5 inline-block text-zinc-400 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
              ↗
            </span>
          }
        />
      </a>
    );
  }

  return (
    <div
      onMouseEnter={() => sound.detent(index)}
      className="flex flex-col items-start gap-0.5 py-1 hover:bg-zinc-100 rounded-lg px-1 sm:flex-row sm:items-center sm:gap-3"
    >
      <WorkLabel work={work} />
    </div>
  );
}
