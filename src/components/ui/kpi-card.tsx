import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: { direction: "up" | "down"; value: string; positive?: boolean };
  icon: ReactNode;
  tone?: "default" | "success" | "warning" | "critical" | "info";
  footer?: ReactNode;
}

const toneStyles: Record<NonNullable<KpiCardProps["tone"]>, { bar: string; iconBg: string; iconColor: string }> = {
  default: { bar: "bg-primary", iconBg: "bg-primary/10", iconColor: "text-primary" },
  success: { bar: "bg-success", iconBg: "bg-success/10", iconColor: "text-success" },
  warning: { bar: "bg-warning", iconBg: "bg-warning/10", iconColor: "text-warning" },
  critical: { bar: "bg-critical", iconBg: "bg-critical/10", iconColor: "text-critical" },
  info: { bar: "bg-info", iconBg: "bg-info/10", iconColor: "text-info" },
};

export const KpiCard = ({ label, value, unit, trend, icon, tone = "default", footer }: KpiCardProps) => {
  const t = toneStyles[tone];
  return (
    <div className="relative rounded-2xl bg-card border border-border shadow-card p-5 overflow-hidden group hover:shadow-elevated transition-base gradient-card">
      <div className={cn("absolute left-0 top-5 bottom-5 w-1 rounded-r-full", t.bar)} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-foreground tracking-tight tabular-nums">{value}</span>
            {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <div className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
              trend.positive === false ? "text-critical" : trend.positive ? "text-success" : "text-muted-foreground"
            )}>
              {trend.direction === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              <span>{trend.value}</span>
              <span className="font-normal text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
        <div className={cn("h-11 w-11 rounded-xl grid place-items-center shrink-0", t.iconBg, t.iconColor)}>
          {icon}
        </div>
      </div>
      {footer && <div className="mt-4 pt-4 border-t border-border/60">{footer}</div>}
    </div>
  );
};

interface GaugeProps {
  value: number; // 0-100
  size?: number;
  tone?: "success" | "warning" | "critical";
}

export const RadialGauge = ({ value, size = 80, tone = "warning" }: GaugeProps) => {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = tone === "success" ? "hsl(var(--success))" : tone === "critical" ? "hsl(var(--critical))" : "hsl(var(--warning))";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={6} stroke="hsl(var(--muted))" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={6}
        stroke={color}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
};
