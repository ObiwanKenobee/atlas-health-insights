import { Panel } from "@/components/ui/panel";
import { aiDecisions } from "@/data/mockData";
import { ShieldCheck, Eye, Hand, Lock, AlertCircle } from "lucide-react";

const Ethics = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Ethical AI Governance</h1>
        <p className="text-sm text-muted-foreground mt-1">Explainability, override controls, and patient data protection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "AI Models Active", value: "12", icon: ShieldCheck, tone: "bg-secondary/10 text-secondary" },
          { label: "Decisions Today", value: "1,248", icon: Eye, tone: "bg-primary/10 text-primary" },
          { label: "Human Overrides", value: "37", icon: Hand, tone: "bg-warning/10 text-warning" },
          { label: "Privacy Compliance", value: "100%", icon: Lock, tone: "bg-success/10 text-success" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{s.label}</p>
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${s.tone}`}><s.icon className="h-4 w-4" /></div>
            </div>
            <p className="text-3xl font-bold mt-2 tabular-nums text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="AI Decision Explainability" description="Recent decisions made by clinical AI — review the reasoning" icon={<Eye className="h-5 w-5" />}>
        <ul className="space-y-3">
          {aiDecisions.map((d) => (
            <li key={d.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-card transition-base">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{d.id}</span>
                    <span className="text-sm font-bold text-foreground">{d.model}</span>
                    {d.override && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-warning/15 text-warning">Overridden</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5"><span className="font-semibold text-foreground">Input:</span> {d.input}</p>
                  <p className="text-xs text-foreground mt-1"><span className="font-semibold">Output:</span> {d.output}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold tabular-nums text-foreground">{d.confidence}%</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-foreground transition-base">
                      Explain
                    </button>
                    <button className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-warning text-warning-foreground hover:opacity-90 transition-base inline-flex items-center gap-1">
                      <Hand className="h-3 w-3" /> Override
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Risk Monitoring" icon={<AlertCircle className="h-5 w-5" />}>
          <ul className="space-y-3">
            {[
              { name: "Model bias drift", status: "ok", value: "Within tolerance" },
              { name: "Demographic parity", status: "ok", value: "0.94 / 1.0" },
              { name: "False negative rate", status: "warning", value: "Slight uptick (+0.3%)" },
              { name: "Calibration accuracy", status: "ok", value: "0.91" },
            ].map((r) => (
              <li key={r.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60">
                <span className="text-sm font-semibold text-foreground">{r.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${r.status === "ok" ? "bg-success" : "bg-warning"}`} />
                  <span className="text-xs text-muted-foreground">{r.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Data Privacy & Compliance" icon={<Lock className="h-5 w-5" />}>
          <ul className="space-y-3">
            {[
              { standard: "Kenya Data Protection Act", status: "Compliant" },
              { standard: "HIPAA-aligned controls", status: "Compliant" },
              { standard: "ISO 27001", status: "Certified" },
              { standard: "Patient consent registry", status: "100% coverage" },
              { standard: "End-to-end encryption", status: "Active" },
            ].map((c) => (
              <li key={c.standard} className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <span className="text-sm font-semibold text-foreground">{c.standard}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success">
                  <ShieldCheck className="h-3.5 w-3.5" /> {c.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Ethics;
