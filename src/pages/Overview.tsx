import { KpiCard, RadialGauge } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { RiskBadge } from "@/components/ui/risk-badge";
import { kpis, patients, earlyAlerts, wards } from "@/data/mockData";
import { Activity, Clock, AlertOctagon, ArrowDownToLine, Bed, ChevronRight, Heart, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Decision Intelligence · Live
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">
            Good afternoon, Dr. Kamau
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hospital signal across all wards as of {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-success/10 border border-success/20 text-success">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="text-xs font-semibold">All systems nominal</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="ICU Capacity"
          value={`${kpis.icuCapacity.percent}%`}
          tone="warning"
          icon={<Bed className="h-5 w-5" />}
          footer={
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{kpis.icuCapacity.used}</span> of {kpis.icuCapacity.total} beds
              </div>
              <RadialGauge value={kpis.icuCapacity.percent} size={56} tone="warning" />
            </div>
          }
        />
        <KpiCard
          label="Emergency Wait"
          value={kpis.emergencyWait.minutes}
          unit="min"
          tone="success"
          icon={<Clock className="h-5 w-5" />}
          trend={{ direction: "down", value: `${kpis.emergencyWait.change} min`, positive: true }}
          footer={<p className="text-xs text-muted-foreground">Below national target of 30 min</p>}
        />
        <KpiCard
          label="High-Risk Patients"
          value={kpis.highRiskPatients.count}
          tone="critical"
          icon={<ShieldAlert className="h-5 w-5" />}
          trend={{ direction: "up", value: `+${kpis.highRiskPatients.change}`, positive: false }}
          footer={<p className="text-xs text-muted-foreground">3 require immediate escalation</p>}
        />
        <KpiCard
          label="Incoming Referrals"
          value={kpis.incomingReferrals.count}
          tone="info"
          icon={<ArrowDownToLine className="h-5 w-5" />}
          trend={{ direction: "up", value: `+${kpis.incomingReferrals.change}`, positive: true }}
          footer={<p className="text-xs text-muted-foreground">2 critical · ETA &lt; 1 hour</p>}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Early alerts */}
        <Panel
          className="xl:col-span-2"
          title="Early Warning Alerts"
          description="AI-detected deterioration signals across the hospital"
          icon={<AlertOctagon className="h-5 w-5" />}
          action={
            <Link to="/clinical" className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1">
              Open clinical view <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <ul className="divide-y divide-border/60 -mx-2">
            {earlyAlerts.map((a) => (
              <li key={a.id} className="px-2 py-3 flex items-start gap-3 hover:bg-muted/40 rounded-lg transition-base">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  a.severity === "critical" ? "bg-critical" : a.severity === "high" ? "bg-orange-500" : "bg-warning"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground truncate">{a.type}</p>
                    <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.patient} · {a.room}
                  </p>
                </div>
                <button className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-base">
                  Respond
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        {/* High-risk patients summary */}
        <Panel
          title="Top Risk Scores"
          description="Live patient deterioration risk"
          icon={<Heart className="h-5 w-5" />}
        >
          <ul className="space-y-3">
            {patients.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center text-xs font-bold text-foreground">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{p.ward} · {p.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums text-foreground">{p.score}</p>
                  <RiskBadge level={p.risk as any} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Bed occupancy strip */}
      <Panel
        title="Bed Occupancy · All Wards"
        description="Live census across the facility"
        icon={<Activity className="h-5 w-5" />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {wards.map((w) => {
            const pct = Math.round((w.occ / w.beds) * 100);
            const tone = pct >= 90 ? "critical" : pct >= 75 ? "warning" : "success";
            return (
              <div key={w.name} className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{w.name}</span>
                  <span className={`text-[10px] font-bold ${
                    tone === "critical" ? "text-critical" : tone === "warning" ? "text-warning" : "text-success"
                  }`}>{pct}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-background overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tone === "critical" ? "bg-critical" : tone === "warning" ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground tabular-nums">{w.occ}/{w.beds} beds</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
};

export default Overview;
