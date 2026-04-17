import { Panel } from "@/components/ui/panel";
import { Settings as SettingsIcon, Bell, Shield, Users, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Row = ({ icon, title, desc, action }: any) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/40">
    <div className="flex items-start gap-3 min-w-0">
      <div className="h-9 w-9 rounded-lg bg-secondary/10 text-secondary grid place-items-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
    {action}
  </div>
);

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Workspace</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure preferences, notifications, and integrations.</p>
      </div>

      <Panel title="Notifications" icon={<Bell className="h-5 w-5" />}>
        <div className="space-y-3">
          <Row icon={<Bell className="h-4 w-4" />} title="Critical clinical alerts" desc="Sepsis, cardiac, code blue" action={<Switch defaultChecked />} />
          <Row icon={<Bell className="h-4 w-4" />} title="Capacity warnings" desc="ICU/HDU occupancy thresholds" action={<Switch defaultChecked />} />
          <Row icon={<Bell className="h-4 w-4" />} title="Daily operational digest" desc="08:00 EAT summary" action={<Switch />} />
        </div>
      </Panel>

      <Panel title="Security & Privacy" icon={<Shield className="h-5 w-5" />}>
        <div className="space-y-3">
          <Row icon={<Shield className="h-4 w-4" />} title="Two-factor authentication" desc="Required for all clinicians" action={<Switch defaultChecked />} />
          <Row icon={<Database className="h-4 w-4" />} title="Audit log retention" desc="7 years (Kenya DPA compliant)" action={<span className="text-xs font-semibold text-foreground">Active</span>} />
          <Row icon={<Users className="h-4 w-4" />} title="Role-based access" desc="142 active users · 5 roles" action={<button className="text-xs font-semibold text-secondary hover:underline">Manage</button>} />
        </div>
      </Panel>

      <Panel title="System" icon={<SettingsIcon className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Platform Version</p>
            <p className="text-sm font-bold text-foreground mt-1">Atlas Sanctum 4.2.1</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Last Sync</p>
            <p className="text-sm font-bold text-foreground mt-1">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SettingsPage;
