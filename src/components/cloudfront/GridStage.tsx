import { cn } from "../../lib/classname";

type GridStageProps = {
  children: React.ReactNode;
  className?: string;
};

export function GridStage(props: GridStageProps) {
  const { children, className } = props;
  return (
    <div className={cn("relative overflow-hidden", className)}>{children}</div>
  );
}
