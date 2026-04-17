import { Activity } from "lucide-react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const isLight = variant === "light";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-teal shadow-glow">
        <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-sm font-bold tracking-tight ${isLight ? "text-sidebar-foreground" : "text-foreground"}`}>
          Atlas Sanctum
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-[0.14em] ${isLight ? "text-sidebar-foreground/60" : "text-muted-foreground"}`}>
          Health
        </span>
      </div>
    </div>
  );
};
