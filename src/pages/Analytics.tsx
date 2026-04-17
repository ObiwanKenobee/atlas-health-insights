import { Panel } from "@/components/ui/panel";
import { BarChart3, TrendingUp } from "lucide-react";

const Analytics = () => {
  const departments = [
    { name: "Cardiology", admissions: 142, satisfaction: 94, ros: 18 },
    { name: "Oncology", admissions: 98, satisfaction: 91, ros: 22 },
    { name: "Maternity", admissions: 184, satisfaction: 96, ros: 12 },
    { name: "Surgery", admissions: 156, satisfaction: 89, ros: 16 },
    { name: "Pediatrics", admissions: 122, satisfaction: 95, ros: 9 },
    { name: "Emergency", admissions: 412, satisfaction: 84, ros: 26 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance, outcomes, and operational intelligence across departments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Length of Stay", value: "3.8", unit: "days", trend: "-0.4" },
          { label: "Readmission Rate", value: "6.2", unit: "%", trend: "-0.8" },
          { label: "Patient Satisfaction", value: "92", unit: "/100", trend: "+3" },
          { label: "Operating Margin", value: "11.4", unit: "%", trend: "+1.2" },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{m.label}</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tabular-nums text-foreground">{m.value}</span>
              <span className="text-sm text-muted-foreground">{m.unit}</span>
            </div>
            <p className="text-xs font-semibold text-success mt-1">{m.trend} vs last month</p>
          </div>
        ))}
      </div>

      <Panel title="Department Performance" description="Last 30 days" icon={<BarChart3 className="h-5 w-5" />}>
        <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Department</th>
                <th className="py-3 pr-4">Admissions</th>
                <th className="py-3 pr-4">Satisfaction</th>
                <th className="py-3 pr-4">Readmission %</th>
                <th className="py-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {departments.map((d) => (
                <tr key={d.name} className="hover:bg-muted/40 transition-base">
                  <td className="py-3 pr-4 font-semibold text-foreground">{d.name}</td>
                  <td className="py-3 pr-4 tabular-nums text-foreground">{d.admissions}</td>
                  <td className="py-3 pr-4 tabular-nums text-foreground">{d.satisfaction}%</td>
                  <td className="py-3 pr-4 tabular-nums text-foreground">{d.ros}%</td>
                  <td className="py-3">
                    <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-teal" style={{ width: `${d.satisfaction}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Quarterly Outcomes" icon={<TrendingUp className="h-5 w-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quarter: "Q1", value: 78, label: "Outcome score" },
            { quarter: "Q2", value: 82, label: "Outcome score" },
            { quarter: "Q3", value: 86, label: "Outcome score" },
            { quarter: "Q4 (proj)", value: 89, label: "Outcome score" },
          ].map((q, i) => (
            <div key={q.quarter} className={`p-5 rounded-xl border ${i === 3 ? "border-secondary/40 bg-secondary/5" : "border-border bg-muted/40"}`}>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{q.quarter}</p>
              <p className="text-3xl font-bold tabular-nums text-foreground mt-2">{q.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{q.label}</p>
            </div>
          )).slice(0, 4)}
        </div>
      </Panel>
    </div>
  );
};

export default Analytics;
