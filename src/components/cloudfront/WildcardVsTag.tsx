import { cn } from "../../lib/classname";
import { CacheCell } from "./CacheCell";
import { gridBackdrop, gridDelay } from "../../lib/grid";
import { GridStage } from "./GridStage";
import { InvalidateButton } from "./InvalidateButton";
import { ResetButton } from "./ResetButton";
import { Legend } from "./Legend";
import { Scan } from "./Scan";
import { useInvalidation } from "../../hooks/use-invalidation";
import { type Tenant } from "../../lib/tenants";

const LAYOUT: Tenant[] = [
  "maily",
  "arikko",
  "nano",
  "maily",
  "nano",
  "maily",
  "arikko",
  "nano",
  "maily",
  "nano",
  "maily",
  "arikko",
  "nano",
  "maily",
  "nano",
  "maily",
];

const ARIKKO = new Set([1, 6, 11]);
const WILDCARD = new Set(LAYOUT.map((_, i) => i));

type PanelProps = {
  title: string;
  tone: "danger" | "safe";
  targets: Set<number>;
  fired: boolean;
  fireId: number;
  reduce: boolean;
  idleCaption: string;
  firedCaption: string;
};

function Panel(props: PanelProps) {
  const { title, tone, targets, fired, fireId, reduce } = props;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm font-medium text-zinc-600">{title}</p>

      <div className="relative">
        <GridStage className="rounded-xl border border-zinc-200 bg-white p-2.5">
          <Scan fireId={fireId} active={fired} reduce={reduce} tone={tone} />
          <div className="relative grid grid-cols-4 gap-2.5">
            {LAYOUT.map((tenant, i) => (
              <CacheCell
                key={i}
                tenant={tenant}
                cleared={fired && targets.has(i)}
                delay={gridDelay(i, 4)}
                reduce={reduce}
              />
            ))}
          </div>
        </GridStage>
      </div>

      <p
        className={cn(
          "text-xs transition-colors",
          !fired
            ? "text-zinc-400"
            : tone === "danger"
              ? "text-red-500"
              : "text-emerald-600",
        )}
      >
        {fired ? props.firedCaption : props.idleCaption}
      </p>
    </div>
  );
}

type WildcardVsTagProps = {};

export function WildcardVsTag(props: WildcardVsTagProps) {
  const { fired, fireId, fire, reset, reduce } = useInvalidation();

  return (
    <div
      className="not-prose my-6 flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80"
      style={gridBackdrop}
    >
      <div className="p-2">
        <Legend tenants={["arikko", "maily", "nano"]} />

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
          <Panel
            title="Wildcard /*"
            tone="danger"
            targets={WILDCARD}
            fired={fired}
            fireId={fireId}
            reduce={reduce}
            idleCaption="16 objects cached"
            firedCaption="16 of 16 cleared · 3 other tenants hit"
          />
          <Panel
            title="Cache Tag"
            tone="safe"
            targets={ARIKKO}
            fired={fired}
            fireId={fireId}
            reduce={reduce}
            idleCaption="16 objects cached"
            firedCaption="3 of 16 cleared · only arikko"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-100 bg-white p-2.5">
        <InvalidateButton onClick={fire} label="Invalidate" />
        <ResetButton onClick={reset} disabled={!fired} />
        <span className="min-w-0 truncate text-[11px] text-zinc-400">
          {reduce ? "Toggles before & after" : "Clears the matching objects"}
        </span>
      </div>
    </div>
  );
}
