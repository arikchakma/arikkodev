import { motion } from "motion/react";

type RippleProps = {
  fireId: number;
  active: boolean;
  reduce: boolean;
  size?: number;
};

export function Ripple(props: RippleProps) {
  const { fireId, active, reduce, size = 288 } = props;
  if (reduce || !active) return null;

  return (
    <motion.span
      key={fireId}
      initial={{ scale: 0, opacity: 0.35 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-zinc-400/40"
      style={{ originX: 0.5, originY: 1, width: size, height: size }}
    />
  );
}
