import { Bell, AlertTriangle, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Role = "Clinician" | "Operations" | "Admin";

export const Topbar = () => {
  const [role, setRole] = useState<Role>("Clinician");

  return (
    <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-4 md:px-6 flex items-center gap-4">
        {/* Hospital identity */}
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Hospital
          </span>
          <span className="text-sm font-semibold text-foreground truncate">
            Aga Khan University Hospital, Nairobi
          </span>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md ml-6 px-3.5 h-10 rounded-xl bg-muted/60 border border-transparent hover:border-border focus-within:border-ring focus-within:bg-background transition-base">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search patients, wards, decisions…"
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden xl:inline text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">
            ⌘K
          </kbd>
        </div>

        <div className="flex-1 lg:hidden" />

        {/* Global alerts */}
        <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg bg-warning/10 border border-warning/30 text-warning hover:bg-warning/15 transition-base">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-semibold">3 Active Alerts</span>
        </button>

        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted transition-base">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="text-xs font-semibold text-foreground">{role}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Switch role view</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["Clinician", "Operations", "Admin"] as Role[]).map((r) => (
              <DropdownMenuItem key={r} onClick={() => setRole(r)}>
                {r}
                {role === r && <Badge variant="secondary" className="ml-auto text-[10px]">Active</Badge>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-border bg-card hover:bg-muted transition-base">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-2">
          <Avatar className="h-9 w-9 ring-2 ring-secondary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold">
              DK
            </AvatarFallback>
          </Avatar>
          <div className="hidden xl:flex flex-col leading-tight">
            <span className="text-xs font-semibold text-foreground">Dr. Kamau</span>
            <span className="text-[10px] text-muted-foreground">Chief of Medicine</span>
          </div>
        </div>
      </div>
    </header>
  );
};
