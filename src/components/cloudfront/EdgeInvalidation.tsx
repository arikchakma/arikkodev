import { cn } from "../../lib/classname";
import { CloudDatabaseIcon } from "../icons/CloudDatabaseIcon";
import { LocationIcon } from "../icons/LocationIcon";
import { CacheCell } from "./CacheCell";
import { gridBackdrop } from "../../lib/grid";
import { GridStage } from "./GridStage";
import { InvalidateButton } from "./InvalidateButton";
import { ResetButton } from "./ResetButton";
import { Legend } from "./Legend";
import { Scan } from "./Scan";
import { useInvalidation } from "../../hooks/use-invalidation";
import { TENANTS, type Tenant } from "../../lib/tenants";

const ORIGIN_TAGS: Tenant[] = ["arikko", "maily", "nano"];

const EDGES: { code: string; objects: Tenant[] }[] = [
  { code: "IAD", objects: ["maily", "arikko", "nano", "maily"] },
  { code: "LHR", objects: ["arikko", "nano", "arikko", "maily"] },
  { code: "NRT", objects: ["nano", "maily", "arikko", "nano"] },
];

type EdgeProps = {
  code: string;
  objects: Tenant[];
  edgeIndex: number;
  fired: boolean;
  reduce: boolean;
};

function Edge(props: EdgeProps) {
  const { code, objects, edgeIndex, fired, reduce } = props;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[11px] font-medium text-zinc-500">{code}</span>
        <LocationIcon className="size-3.5 text-zinc-300" />
      </div>
      <GridStage className="rounded-lg">
        <div className="relative grid grid-cols-2 gap-1.5">
          {objects.map((tenant, i) => (
            <CacheCell
              key={i}
              tenant={tenant}
              cleared={fired && tenant === "arikko"}
              delay={edgeIndex * 0.07 + i * 0.05}
              reduce={reduce}
              compact
            />
          ))}
        </div>
      </GridStage>
    </div>
  );
}

type EdgeInvalidationProps = {};

export function EdgeInvalidation(props: EdgeInvalidationProps) {
  const { fired, fireId, fire, reset, reduce } = useInvalidation();

  return (
    <div
      className="not-prose my-6 flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80"
      style={gridBackdrop}
    >
      <div className="p-2">
        <Legend tenants={["arikko", "maily", "nano"]} />

        <div className="flex flex-col items-stretch mt-4 gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col rounded-xl border border-zinc-200/80 bg-white sm:w-36 sm:shrink-0">
            <div className="flex items-center justify-between border-b p-1 px-2 border-b-zinc-200">
              <span className="text-xs font-medium text-zinc-500">Origin</span>
              <CloudDatabaseIcon className="size-4 text-zinc-300" />
            </div>

            <div className="flex flex-col gap-1 divide-y divide-zinc-200">
              {ORIGIN_TAGS.map((tenant) => (
                <span
                  key={tenant}
                  className="flex items-center gap-1.5 text-xs leading-none px-2 py-1.5 text-zinc-600"
                >
                  <span
                    className={cn("size-1.5 rounded-full", TENANTS[tenant].dot)}
                  />
                  tenant:{TENANTS[tenant].label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center text-zinc-300 sm:self-center">
            <span className="hidden text-lg sm:block">&rarr;</span>
            <span className="text-lg sm:hidden">&darr;</span>
          </div>

          <div className="min-w-0 flex-1">
            <GridStage className="rounded-lg">
              <Scan fireId={fireId} active={fired} reduce={reduce} />
              <div className="relative grid grid-cols-3 gap-2.5">
                {EDGES.map((edge, i) => (
                  <Edge
                    key={edge.code}
                    code={edge.code}
                    objects={edge.objects}
                    edgeIndex={i}
                    fired={fired}
                    reduce={reduce}
                  />
                ))}
              </div>
            </GridStage>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-100 p-2.5 bg-white">
        <InvalidateButton onClick={fire} label="Invalidate" />
        <ResetButton onClick={reset} disabled={!fired} />
        <span
          className={cn(
            "min-w-0 truncate text-[11px] transition-colors",
            fired ? "text-emerald-600" : "text-zinc-400",
          )}
        >
          {fired ? "arikko cleared · 8 untouched" : "12 objects across 3 edges"}
        </span>
      </div>
    </div>
  );
}
