import { motion } from "motion/react";
import { cn } from "../../lib/classname";

type ScanProps = {
  fireId: number;
  active: boolean;
  reduce: boolean;
  tone?: "danger" | "safe";
};

export function Scan(props: ScanProps) {
  const { fireId, active, reduce, tone = "safe" } = props;
  if (reduce || !active) return null;

  return (
    <motion.div
      key={fireId}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 origin-top",
        tone === "danger" ? "bg-red-400/20" : "bg-emerald-400/15",
      )}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.8, 0], scaleY: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-px",
          tone === "danger"
            ? "bg-red-500/60 shadow-[0_0_12px_2px_rgb(239_68_68/0.35)]"
            : "bg-emerald-500/60 shadow-[0_0_12px_2px_rgb(16_185_129/0.3)]",
        )}
      />
    </motion.div>
  );
}
