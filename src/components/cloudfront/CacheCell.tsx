import { motion } from "motion/react";
import { cn } from "../../lib/classname";
import { BoxIcon } from "../icons/BoxIcon";
import { TENANTS, type Tenant } from "../../lib/tenants";

type CacheCellProps = {
  tenant: Tenant;
  cleared: boolean;
  delay: number;
  reduce: boolean;
  compact?: boolean;
};

export function CacheCell(props: CacheCellProps) {
  const { tenant, cleared, delay, reduce, compact = false } = props;
  const style = TENANTS[tenant];

  return (
    <motion.div
      className={cn(
        "relative rounded-lg border",
        compact ? "aspect-square" : "aspect-4/3",
        cleared ? "border-dashed border-zinc-300/80" : "border-zinc-200",
      )}
      animate={{ scale: cleared && !reduce ? [1, 0.92, 0.97] : 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.4, delay: cleared ? delay : 0, ease: "easeOut" }
      }
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-lg bg-white"
        animate={{ opacity: cleared ? 0 : 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.35, delay: cleared ? delay : 0, ease: "easeOut" }
        }
      >
        <BoxIcon
          className={cn(compact ? "size-4" : "size-5", style.icon)}
          aria-label={style.label}
        />
      </motion.div>
    </motion.div>
  );
}
