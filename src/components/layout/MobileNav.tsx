import { NavLink } from "@/components/NavLink";
import { Dna, Hospital, Globe2, HeartPulse, LayoutDashboard } from "lucide-react";

const items = [
  { url: "/", icon: LayoutDashboard, label: "Home", end: true },
  { url: "/clinical", icon: Dna, label: "Clinical" },
  { url: "/operations", icon: Hospital, label: "Ops" },
  { url: "/regional", icon: Globe2, label: "Network" },
  { url: "/preventive", icon: HeartPulse, label: "Health" },
];

export const MobileNav = () => (
  <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-card/95 backdrop-blur-xl border-t border-border flex justify-around items-center">
    {items.map((item) => (
      <NavLink
        key={item.url}
        to={item.url}
        end={item.end}
        className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 text-muted-foreground transition-base"
        activeClassName="!text-secondary"
      >
        <item.icon className="h-5 w-5" />
        <span className="text-[10px] font-medium">{item.label}</span>
      </NavLink>
    ))}
  </nav>
);
