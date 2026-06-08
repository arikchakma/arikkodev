import { motion } from "motion/react";
import { cn } from "../../lib/classname";

type RequestChipProps = {
  token: string;
  show: boolean;
  reduce: boolean;
  tone: "danger" | "safe";
};

export function RequestChip(props: RequestChipProps) {
  const { token, show, reduce, tone } = props;

  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 12, scale: 0.96 }
      }
      transition={
        reduce ? { duration: 0 } : { type: "spring", bounce: 0.32, duration: 0.5 }
      }
      className={cn(
        "pointer-events-none absolute -top-4.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1 text-[11px] font-medium",
        tone === "danger"
          ? "border-red-200 text-red-600"
          : "border-emerald-200 text-emerald-700",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "danger" ? "bg-red-500" : "bg-emerald-500",
        )}
      />
      {token}
    </motion.div>
  );
}
