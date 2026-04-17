import { Panel } from "@/components/ui/panel";
import { wards, surgeries, equipment } from "@/data/mockData";
import { Hospital, CalendarClock, Workflow, Cpu } from "lucide-react";

const Operations = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Operations Resilience</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time hospital flow, capacity, and equipment readiness.</p>
      </div>

      <Panel title="Bed Occupancy Heatmap" description="Color intensity reflects ward saturation" icon={<Hospital className="h-5 w-5" />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {wards.map((w) => {
            const pct = w.occ / w.beds;
            const intensity = Math.min(1, pct);
            return (
              <div
                key={w.name}
                className="aspect-square rounded-xl p-3 flex flex-col justify-between border border-border/60 transition-base hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--secondary) / ${0.08 + intensity * 0.35}), hsl(var(--primary) / ${0.06 + intensity * 0.4}))`,
                }}
              >
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{w.name}</p>
                  <p className="text-[10px] text-muted-foreground">{w.occ}/{w.beds}</p>
                </div>
                <p className="text-2xl font-bold tabular-nums text-foreground">{Math.round(pct * 100)}<span className="text-xs text-muted-foreground">%</span></p>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel title="Surgery Schedule Optimization" description="Today's OR utilization across 4 theaters" icon={<CalendarClock className="h-5 w-5" />}>
        <div className="space-y-3">
          {["OR-1", "OR-2", "OR-3", "OR-4"].map((or) => {
            const ops = surgeries.filter((s) => s.or === or);
            return (
              <div key={or} className="flex items-center gap-3">
                <span className="w-12 text-xs font-bold text-foreground">{or}</span>
                <div className="relative flex-1 h-9 rounded-lg bg-muted/60 overflow-hidden">
                  {ops.map((s) => {
                    const startMin = parseInt(s.time.split(":")[0]) * 60 + parseInt(s.time.split(":")[1]) - 8 * 60;
                    const left = (startMin / (12 * 60)) * 100;
                    const width = (s.duration / (12 * 60)) * 100;
                    return (
                      <div
                        key={`${s.time}-${s.procedure}`}
                        className={`absolute top-1 bottom-1 rounded-md px-2 text-[10px] font-semibold text-white flex items-center overflow-hidden ${
                          s.status === "in-progress" ? "gradient-teal" : "bg-primary/85"
                        }`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        title={`${s.time} ${s.procedure} — ${s.surgeon}`}
                      >
                        <span className="truncate">{s.procedure}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground pl-15 ml-15 mt-1" style={{ paddingLeft: "3.75rem" }}>
            {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Patient Flow Funnel" description="Last 24 hours" icon={<Workflow className="h-5 w-5" />}>
          <div className="space-y-3">
            {[
              { stage: "ED Arrivals", count: 184, pct: 100 },
              { stage: "Triaged", count: 178, pct: 97 },
              { stage: "Treated & Discharged", count: 121, pct: 66 },
              { stage: "Admitted", count: 47, pct: 26 },
              { stage: "Transferred to ICU/HDU", count: 14, pct: 8 },
            ].map((f) => (
              <div key={f.stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{f.stage}</span>
                  <span className="text-sm font-bold tabular-nums text-foreground">{f.count}</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Equipment Status" description="Critical asset availability" icon={<Cpu className="h-5 w-5" />}>
          <ul className="space-y-2.5">
            {equipment.map((e) => (
              <li key={e.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{e.name}</p>
                  <p className="text-[11px] text-muted-foreground">{e.available} available of {e.total}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${e.status === "ok" ? "bg-success" : "bg-warning"}`} />
                  <span className={`text-[11px] font-bold uppercase ${e.status === "ok" ? "text-success" : "text-warning"}`}>{e.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Operations;
