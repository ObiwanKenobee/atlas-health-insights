import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "Clinician" | "Operations" | "Admin";

/** Routes each role is allowed to see in navigation. */
export const roleRoutes: Record<Role, string[]> = {
  Clinician: ["/", "/clinical", "/preventive", "/ethics", "/settings"],
  Operations: ["/", "/operations", "/regional", "/analytics", "/settings"],
  Admin: ["/", "/clinical", "/operations", "/regional", "/preventive", "/ethics", "/analytics", "/settings"],
};

/** KPI keys ordered by what matters most to each role. */
export type KpiKey = "icu" | "edWait" | "highRisk" | "referrals";

export const roleKpiOrder: Record<Role, KpiKey[]> = {
  Clinician: ["highRisk", "edWait", "icu", "referrals"],
  Operations: ["icu", "referrals", "edWait", "highRisk"],
  Admin: ["icu", "edWait", "highRisk", "referrals"],
};

/** Overview panel blocks ordered per role. */
export type PanelKey = "alerts" | "risk" | "beds";

export const rolePanelOrder: Record<Role, PanelKey[]> = {
  Clinician: ["alerts", "risk", "beds"],
  Operations: ["beds", "alerts", "risk"],
  Admin: ["alerts", "risk", "beds"],
};

export const roleMeta: Record<Role, { title: string; subtitle: string }> = {
  Clinician: { title: "Chief of Medicine", subtitle: "Patient-facing decision support" },
  Operations: { title: "Operations Lead", subtitle: "Capacity, flow, and logistics" },
  Admin: { title: "Hospital Administrator", subtitle: "Performance and governance" },
};

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
  allowedRoutes: string[];
  kpiOrder: KpiKey[];
  panelOrder: PanelKey[];
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("Clinician");

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        allowedRoutes: roleRoutes[role],
        kpiOrder: roleKpiOrder[role],
        panelOrder: rolePanelOrder[role],
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};
