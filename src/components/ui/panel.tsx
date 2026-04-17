import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Panel = ({ title, description, icon, action, children, className }: PanelProps) => (
  <section
    className={cn(
      "rounded-2xl bg-card border border-border shadow-card overflow-hidden gradient-card",
      className
    )}
  >
    <header className="px-5 md:px-6 py-4 flex items-start justify-between gap-4 border-b border-border/60">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="h-9 w-9 shrink-0 rounded-lg bg-accent text-accent-foreground grid place-items-center">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground truncate">{title}</h2>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
    <div className="p-5 md:p-6">{children}</div>
  </section>
);
