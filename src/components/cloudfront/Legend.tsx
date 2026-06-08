import { cn } from "../../lib/classname";
import { BoxIcon } from "../icons/BoxIcon";
import { TENANTS, type Tenant } from "../../lib/tenants";

type LegendProps = {
  tenants: Tenant[];
};

export function Legend(props: LegendProps) {
  const { tenants } = props;
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
      {tenants.map((tenant) => (
        <span
          key={tenant}
          className="flex items-center gap-1.5 border bg-white border-zinc-200 rounded-lg p-1.5 py-0.5"
        >
          <BoxIcon className={cn("size-3.5", TENANTS[tenant].icon)} />
          <span>{TENANTS[tenant].label}</span>
        </span>
      ))}
    </div>
  );
}
