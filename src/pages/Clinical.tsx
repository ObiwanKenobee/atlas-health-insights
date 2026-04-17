import { Panel } from "@/components/ui/panel";
import { RiskBadge } from "@/components/ui/risk-badge";
import { patients, earlyAlerts, triageQueue } from "@/data/mockData";
import { Dna, AlertOctagon, ListOrdered, Stethoscope, ArrowUpRight, Minus, ArrowDownRight } from "lucide-react";

const trendIcon = (t: string) =>
  t === "up" ? <ArrowUpRight className="h-3.5 w-3.5 text-critical" /> :
  t === "down" ? <ArrowDownRight className="h-3.5 w-3.5 text-success" /> :
  <Minus className="h-3.5 w-3.5 text-muted-foreground" />;

const Clinical = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Clinical Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Patient-level AI scoring, early warnings, and treatment guidance.</p>
      </div>

      <Panel
        title="Patient Risk Scoring"
        description="Composite deterioration index updated every 5 minutes"
        icon={<Dna className="h-5 w-5" />}
        action={<span className="text-[11px] font-semibold text-muted-foreground">{patients.length} active</span>}
      >
        <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Patient</th>
                <th className="py-3 pr-4 hidden sm:table-cell">Ward</th>
                <th className="py-3 pr-4 hidden md:table-cell">Condition</th>
                <th className="py-3 pr-4">Score</th>
                <th className="py-3 pr-4">Risk</th>
                <th className="py-3 pr-4">Trend</th>
                <th className="py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 transition-base">
                  <td className="py-3 pr-4">
                    <div className="font-semibold text-foreground">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.id} · {p.age}y</div>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell text-foreground">{p.ward}</td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{p.condition}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold tabular-nums text-foreground">{p.score}</span>
                      <div className="hidden sm:block w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full ${p.score >= 80 ? "bg-critical" : p.score >= 60 ? "bg-orange-500" : p.score >= 40 ? "bg-warning" : "bg-success"}`} style={{ width: `${p.score}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><RiskBadge level={p.risk as any} /></td>
                  <td className="py-3 pr-4">{trendIcon(p.trend)}</td>
                  <td className="py-3">
                    <button className="text-[11px] font-semibold text-secondary hover:underline">Open chart →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="AI Triage Priority" description="Real-time emergency department queue" icon={<ListOrdered className="h-5 w-5" />}>
          <ul className="space-y-2">
            {triageQueue.map((t, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
                <div className={`h-9 w-9 grid place-items-center rounded-lg font-bold text-sm ${
                  t.priority === 1 ? "bg-critical text-critical-foreground" :
                  t.priority === 2 ? "bg-warning text-warning-foreground" :
                  "bg-success/20 text-success"
                }`}>P{t.priority}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.complaint}</p>
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums">{t.eta}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Early Warning Alerts" description="Sepsis, cardiac, and deterioration signals" icon={<AlertOctagon className="h-5 w-5" />}>
          <ul className="space-y-2">
            {earlyAlerts.map((a) => (
              <li key={a.id} className="p-3 rounded-xl border border-border/60 bg-muted/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{a.type}</span>
                  <RiskBadge level={a.severity as any} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.patient} · {a.room} · {a.time}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Treatment Pathway Recommendations" description="Evidence-aligned next steps generated by AI" icon={<Stethoscope className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Sepsis Bundle — 1 hour", patient: "Wanjiru K.", steps: ["Broad-spectrum antibiotics within 60m", "Lactate level + recheck", "30 mL/kg crystalloid bolus", "Vasopressor if MAP < 65"] },
            { title: "Post-MI Recovery", patient: "Otieno M.", steps: ["Dual antiplatelet therapy", "High-intensity statin", "Beta-blocker titration", "Cardiac rehab referral"] },
            { title: "DKA Management", patient: "Achieng' P.", steps: ["IV insulin infusion", "Hourly glucose + K+", "Fluid resuscitation per protocol", "Endocrinology consult"] },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">{p.patient}</p>
              <h3 className="text-sm font-bold text-foreground mt-1">{p.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {p.steps.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};

export default Clinical;
