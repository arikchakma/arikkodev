import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "./LogoMark";
import { WorkRow, type Work } from "./WorkRow";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { cn } from "../../lib/classname";
import { sound } from "../../lib/sound";

export type Company = {
  company: string;
  tagline: string;
  logo?: string;
  startDate: string;
  // Omit while still there; the row then reads "<startDate> – Present".
  endDate?: string;
  works: Work[];
};

const expand = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
} as const;

type CompanyRowProps = { company: Company };

export function CompanyRow(props: CompanyRowProps) {
  const { company } = props;

  const [open, setOpen] = useState(false);

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
        aria-expanded={open}
        className="group ml-1 flex w-full items-center justify-between gap-6 py-2.5 text-left"
      >
        <span className="flex shrink-0 items-center gap-2.5 group-hover:text-zinc-500">
          <LogoMark name={company.company} logo={company.logo} />
          <span className="font-medium transition-colors">
            {company.company}
          </span>
          <span className="text-sm text-zinc-400 tabular-nums">
            {company.startDate} – {company.endDate ?? "Present"}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-1.5 text-sm text-zinc-400">
          <span className="hidden opacity-0 transition-opacity group-hover:opacity-100 md:inline">
            Expand to see more
          </span>
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 transition-transform",
              open ? "rotate-90" : "rotate-0",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div {...expand} className="overflow-hidden">
            <div className="mb-2">
              {company.works.map((w, i) => (
                <WorkRow key={w.name} work={w} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
