import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "moderate" | "high" | "critical";
  className?: string;
}

const styles = {
  low: "bg-success/10 text-success border-success/20",
  moderate: "bg-warning/10 text-warning border-warning/30",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
  critical: "bg-critical/10 text-critical border-critical/30",
};

export const RiskBadge = ({ level, className }: RiskBadgeProps) => (
  <span className={cn(
    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider",
    styles[level],
    className
  )}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {level}
  </span>
);
