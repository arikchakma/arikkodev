export type Tenant = "arikko" | "maily" | "nano";

type TenantStyle = {
  label: string;
  fill: string;
  border: string;
  text: string;
  icon: string;
  dot: string;
};

export const TENANTS: Record<Tenant, TenantStyle> = {
  arikko: {
    label: "arikko",
    fill: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  maily: {
    label: "maily",
    fill: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    icon: "text-sky-400",
    dot: "bg-sky-500",
  },
  nano: {
    label: "nano",
    fill: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: "text-amber-400",
    dot: "bg-amber-500",
  },
};
