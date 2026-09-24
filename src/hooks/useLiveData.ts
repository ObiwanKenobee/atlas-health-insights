import { useEffect, useRef, useState } from "react";
import { kpis, earlyAlerts } from "@/data/mockData";

/**
 * Simulated real-time hospital telemetry.
 * KPIs jitter on a short interval; alert ages advance on a compressed clock
 * (TIME_SCALE seconds of real time == 1 simulated minute) so movement is visible.
 */
const TICK_MS = 4000;
const TIME_SCALE = 12;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const drift = (current: number, min: number, max: number, maxStep: number) => {
  const step = (Math.random() * 2 - 1) * maxStep;
  return clamp(Math.round((current + step) * 10) / 10, min, max);
};

export interface LiveTelemetry {
  icuUsed: number;
  icuTotal: number;
  icuPercent: number;
  edWaitMinutes: number;
  highRiskCount: number;
  referralCount: number;
  /** alert id -> minutes since detection */
  alertAges: Record<number, number>;
  lastUpdated: Date;
}

const initial = (): LiveTelemetry => ({
  icuUsed: kpis.icuCapacity.used,
  icuTotal: kpis.icuCapacity.total,
  icuPercent: kpis.icuCapacity.percent,
  edWaitMinutes: kpis.emergencyWait.minutes,
  highRiskCount: kpis.highRiskPatients.count,
  referralCount: kpis.incomingReferrals.count,
  alertAges: Object.fromEntries(earlyAlerts.map((a) => [a.id, a.minutesAgo])),
  lastUpdated: new Date(),
});

export const useLiveData = (): LiveTelemetry => {
  const [state, setState] = useState<LiveTelemetry>(initial);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => {
        const icuUsed = clamp(
          prev.icuUsed + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 0 : 1),
          14,
          prev.icuTotal,
        );

        const elapsedSimMinutes = Math.floor(
          (Date.now() - mountedAt.current) / 1000 / TIME_SCALE,
        );

        return {
          ...prev,
          icuUsed,
          icuPercent: Math.round((icuUsed / prev.icuTotal) * 100),
          edWaitMinutes: Math.round(drift(prev.edWaitMinutes, 6, 42, 2.5)),
          highRiskCount: Math.round(drift(prev.highRiskCount, 9, 26, 0.8)),
          referralCount: Math.round(drift(prev.referralCount, 3, 16, 0.6)),
          alertAges: Object.fromEntries(
            earlyAlerts.map((a) => [a.id, a.minutesAgo + elapsedSimMinutes]),
          ),
          lastUpdated: new Date(),
        };
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return state;
};

export const formatAge = (minutes: number) => {
  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} min ago`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h ago` : `${h}h ${m}m ago`;
};
