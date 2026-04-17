import { Panel } from "@/components/ui/panel";
import { referrals, teleQueue, ambulances } from "@/data/mockData";
import { Globe2, Video, Ambulance, MapPin } from "lucide-react";

const priorityColor: Record<string, string> = {
  critical: "hsl(var(--critical))",
  urgent: "hsl(var(--warning))",
  stable: "hsl(var(--secondary))",
};

const Regional = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Decision Center</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mt-1">Regional Health Network</h1>
        <p className="text-sm text-muted-foreground mt-1">East African referral network, telemedicine, and transport coordination.</p>
      </div>

      <Panel title="East Africa Referral Network" description="Live incoming referrals to Aga Khan University Hospital, Nairobi" icon={<Globe2 className="h-5 w-5" />}>
        <div className="relative w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-primary/8 via-secondary/5 to-background overflow-hidden border border-border/60">
          {/* Stylized East Africa map */}
          <svg viewBox="0 0 100 65" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary) / 0.18)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.22)" />
              </linearGradient>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="65" fill="url(#grid)" />
            {/* Stylized country shapes — abstract not geographic */}
            <path d="M15 12 Q22 8 32 10 L40 14 L44 22 L48 28 L42 38 L36 44 L28 48 L18 46 L12 38 L10 26 Z" fill="url(#land)" stroke="hsl(var(--primary) / 0.35)" strokeWidth="0.3" />
            <path d="M48 28 L62 24 L72 28 L78 36 L74 46 L66 52 L54 50 L46 44 L42 38 Z" fill="url(#land)" stroke="hsl(var(--primary) / 0.45)" strokeWidth="0.3" />
            <path d="M78 36 L88 34 L92 42 L88 52 L80 56 L74 50 L74 46 Z" fill="url(#land)" stroke="hsl(var(--primary) / 0.35)" strokeWidth="0.3" />
            <path d="M40 14 L52 10 L60 14 L62 24 L48 28 L44 22 Z" fill="url(#land)" stroke="hsl(var(--primary) / 0.35)" strokeWidth="0.3" />

            {/* Nairobi hub */}
            <g>
              <circle cx="58" cy="38" r="2.5" fill="hsl(var(--secondary))" />
              <circle cx="58" cy="38" r="4.5" fill="none" stroke="hsl(var(--secondary))" strokeWidth="0.4" opacity="0.6">
                <animate attributeName="r" values="2.5;7;2.5" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="58" y="34" textAnchor="middle" fontSize="2.4" fontWeight="700" fill="hsl(var(--foreground))">AKUH Nairobi</text>
            </g>

            {/* Referral nodes + lines */}
            {referrals.map((r) => (
              <g key={r.id}>
                <line x1="58" y1="38" x2={r.lng} y2={r.lat} stroke={priorityColor[r.priority]} strokeWidth="0.35" strokeDasharray="1 0.8" opacity="0.7" />
                <circle cx={r.lng} cy={r.lat} r="1.4" fill={priorityColor[r.priority]} />
                <circle cx={r.lng} cy={r.lat} r="2.6" fill="none" stroke={priorityColor[r.priority]} strokeWidth="0.25" opacity="0.4" />
                <text x={r.lng} y={r.lat - 2.5} textAnchor="middle" fontSize="1.8" fill="hsl(var(--foreground))" fontWeight="600">{r.from.split(" ")[0]}</text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 px-3 py-2 rounded-lg bg-card/85 backdrop-blur border border-border text-[10px] font-semibold">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-critical" /> Critical</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Urgent</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" /> Stable</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {referrals.map((r) => (
            <div key={r.id} className="p-3 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <MapPin className="h-3 w-3 text-secondary" /> {r.from}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: priorityColor[r.priority] }}>{r.priority}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{r.patient}</p>
              <p className="text-[11px] font-semibold text-foreground mt-1">ETA · {r.eta}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Telemedicine Consultation Queue" icon={<Video className="h-5 w-5" />}>
          <ul className="space-y-2.5">
            {teleQueue.map((q) => (
              <li key={q.specialty} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/40">
                <span className="text-sm font-semibold text-foreground">{q.specialty}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">avg {q.avgWait}</span>
                  <span className="px-2.5 py-1 rounded-md bg-secondary/15 text-secondary text-xs font-bold">{q.waiting} waiting</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Ambulance Coordination" icon={<Ambulance className="h-5 w-5" />}>
          <ul className="space-y-2.5">
            {ambulances.map((a) => (
              <li key={a.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/40">
                <div className={`h-9 w-9 rounded-lg grid place-items-center ${
                  a.status === "en-route" ? "bg-warning/15 text-warning" :
                  a.status === "available" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  <Ambulance className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">{a.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{a.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{a.patient}</p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-foreground">{a.eta}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default Regional;
