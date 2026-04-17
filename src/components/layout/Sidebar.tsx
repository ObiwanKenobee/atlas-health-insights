import { NavLink } from "@/components/NavLink";
import {
  Dna,
  Hospital,
  Globe2,
  HeartPulse,
  ShieldCheck,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "./Logo";

const items = [
  { title: "Overview", url: "/", icon: LayoutDashboard, end: true },
  { title: "Clinical Intelligence", url: "/clinical", icon: Dna },
  { title: "Operations", url: "/operations", icon: Hospital },
  { title: "Regional Network", url: "/regional", icon: Globe2 },
  { title: "Preventive Health", url: "/preventive", icon: HeartPulse },
  { title: "Ethics & Governance", url: "/ethics", icon: ShieldCheck },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 gradient-sidebar border-r border-sidebar-border">
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
        <Logo variant="light" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/40">
          Decision Centers
        </p>
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.end}
            className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/75 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-base"
            activeClassName="!text-sidebar-primary-foreground !bg-sidebar-accent shadow-sm before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r-full before:bg-sidebar-primary"
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-3 p-4 rounded-xl bg-sidebar-accent/60 border border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-sidebar-primary animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/80">
            System Status
          </span>
        </div>
        <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
          All decision engines operational. Ethical AI monitoring active.
        </p>
      </div>
    </aside>
  );
};
