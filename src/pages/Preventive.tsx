import { Panel } from "@/components/ui/panel";
import { chronic, communityTrend } from "@/data/mockData";
import { HeartPulse, TrendingUp, Users, Sparkles } from "lucide-react";

const Preventive = () => {
  const max = Math.max(...communityTrend.map((c) => c.cases));
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Preventive & Regenerative Health</h1>
        <p className="text-sm text-muted-foreground mt-1">Population-level analytics and community outreach intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl gradient-primary p-5 text-primary-foreground shadow-card">
          <p className="text-[11px] uppercase tracking-wider font-semibold opacity-80">Population Health Score</p>
          <p className="text-4xl font-bold mt-2 tabular-nums">72<span className="text-lg opacity-70">/100</span></p>
          <p className="text-xs mt-2 opacity-80">+3 pts vs Q3 — improving trajectory across catchment area.</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Catchment Population</p>
          <p className="text-4xl font-bold mt-2 tabular-nums text-foreground">5.9M</p>
          <p className="text-xs mt-2 text-muted-foreground">Across Nairobi metro & 7 counties</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Outreach Programs Active</p>
          <p className="text-4xl font-bold mt-2 tabular-nums text-foreground">14</p>
          <p className="text-xs mt-2 text-muted-foreground">23,400 reached this quarter</p>
        </div>
      </div>

      <Panel title="Chronic Disease Risk Analytics" icon={<HeartPulse className="h-5 w-5" />}>
        <div className="space-y-3">
          {chronic.map((c) => (
            <div key={c.condition} className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{c.condition}</p>
                  <p className="text-[11px] text-muted-foreground">{c.atRisk.toLocaleString()} patients at risk</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold tabular-nums text-foreground">{c.prevalence}<span className="text-sm text-muted-foreground">%</span></p>
                  <p className={`text-[11px] font-semibold ${c.trend > 0 ? "text-critical" : "text-success"}`}>
                    {c.trend > 0 ? "+" : ""}{c.trend}% YoY
                  </p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-background overflow-hidden">
                <div className="h-full rounded-full gradient-teal" style={{ width: `${c.prevalence * 3}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Community Health Trend" description="Reported cases · last 12 months" icon={<TrendingUp className="h-5 w-5" />}>
          <div className="flex items-end justify-between gap-1.5 h-48">
            {communityTrend.map((c) => (
              <div key={c.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[10px] font-semibold tabular-nums text-foreground opacity-0 group-hover:opacity-100 transition-base">{c.cases}</span>
                <div
                  className="w-full rounded-t-md gradient-teal hover:opacity-90 transition-base"
                  style={{ height: `${(c.cases / max) * 100}%` }}
                />
                <span className="text-[10px] font-medium text-muted-foreground">{c.month}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Preventive Outreach Suggestions" icon={<Sparkles className="h-5 w-5" />}>
          <ul className="space-y-3">
            {[
              { title: "Hypertension screening — Eastlands", target: "12,000 residents", impact: "Est. 380 early diagnoses" },
              { title: "Diabetes awareness — Kibera", target: "8,500 residents", impact: "Est. 210 prevented complications" },
              { title: "Maternal health — Kiambu County", target: "3,200 expectant mothers", impact: "Est. 28 fewer preventable deaths" },
              { title: "Cervical cancer screening — Kajiado", target: "6,400 women aged 30-65", impact: "Est. 95 early-stage detections" },
            ].map((s) => (
              <li key={s.title} className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.target}</p>
                    <p className="text-[11px] font-semibold text-success mt-1">{s.impact}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Preventive;
