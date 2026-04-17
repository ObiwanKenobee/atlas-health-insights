// Realistic mock data for Aga Khan University Hospital, Nairobi

export const kpis = {
  icuCapacity: { used: 22, total: 28, percent: 79 },
  emergencyWait: { minutes: 14, change: -3 },
  highRiskPatients: { count: 17, change: 4 },
  incomingReferrals: { count: 9, change: 2 },
};

export const patients = [
  { id: "AKU-3041", name: "Wanjiru K.", age: 67, ward: "ICU-2", risk: "critical", score: 92, condition: "Septic shock", trend: "up" },
  { id: "AKU-3018", name: "Otieno M.", age: 54, ward: "Cardiology", risk: "high", score: 81, condition: "Acute MI, post-PCI", trend: "down" },
  { id: "AKU-2987", name: "Achieng' P.", age: 41, ward: "HDU", risk: "high", score: 76, condition: "DKA, CKD stage 3", trend: "stable" },
  { id: "AKU-3052", name: "Mwangi S.", age: 72, ward: "Stroke Unit", risk: "moderate", score: 58, condition: "Ischemic stroke, day 3", trend: "down" },
  { id: "AKU-3009", name: "Hassan A.", age: 33, ward: "Surgical", risk: "moderate", score: 49, condition: "Post-op laparotomy", trend: "stable" },
  { id: "AKU-3061", name: "Njeri L.", age: 28, ward: "Maternity", risk: "low", score: 22, condition: "Postpartum, day 1", trend: "down" },
] as const;

export const earlyAlerts = [
  { id: 1, patient: "Wanjiru K.", room: "ICU-2 / Bed 4", type: "Sepsis SIRS criteria met", time: "2 min ago", severity: "critical" },
  { id: 2, patient: "Otieno M.", room: "CCU / Bed 7", type: "Cardiac arrhythmia detected", time: "11 min ago", severity: "high" },
  { id: 3, patient: "Achieng' P.", room: "HDU / Bed 3", type: "Rising lactate trend", time: "24 min ago", severity: "high" },
  { id: 4, patient: "Kimani R.", room: "Ward 4B / Bed 12", type: "MEWS score escalation", time: "38 min ago", severity: "moderate" },
];

export const triageQueue = [
  { name: "Akinyi O.", complaint: "Chest pain, radiating", priority: 1, eta: "Now" },
  { name: "Barasa T.", complaint: "MVA polytrauma", priority: 1, eta: "Now" },
  { name: "Cherono J.", complaint: "Severe abdominal pain", priority: 2, eta: "5 min" },
  { name: "Diko M.", complaint: "Pediatric high fever", priority: 2, eta: "8 min" },
  { name: "Esposito R.", complaint: "Laceration, controlled", priority: 3, eta: "20 min" },
];

export const wards = [
  { name: "ICU", beds: 28, occ: 22 },
  { name: "HDU", beds: 16, occ: 13 },
  { name: "CCU", beds: 12, occ: 9 },
  { name: "Maternity", beds: 32, occ: 21 },
  { name: "Pediatrics", beds: 24, occ: 14 },
  { name: "Surgical", beds: 40, occ: 32 },
  { name: "Medical 4A", beds: 36, occ: 30 },
  { name: "Medical 4B", beds: 36, occ: 24 },
  { name: "Oncology", beds: 18, occ: 12 },
  { name: "Stroke Unit", beds: 10, occ: 7 },
  { name: "Renal", beds: 14, occ: 10 },
  { name: "Isolation", beds: 8, occ: 2 },
];

export const surgeries = [
  { time: "08:00", or: "OR-1", procedure: "CABG x3", surgeon: "Dr. Ouma", duration: 240, status: "in-progress" },
  { time: "08:30", or: "OR-2", procedure: "Lap. cholecystectomy", surgeon: "Dr. Patel", duration: 90, status: "in-progress" },
  { time: "09:00", or: "OR-3", procedure: "TKR", surgeon: "Dr. Mwangi", duration: 180, status: "in-progress" },
  { time: "11:00", or: "OR-1", procedure: "Mitral valve repair", surgeon: "Dr. Ouma", duration: 300, status: "scheduled" },
  { time: "12:30", or: "OR-2", procedure: "Hernia repair", surgeon: "Dr. Singh", duration: 60, status: "scheduled" },
  { time: "14:00", or: "OR-4", procedure: "C-section, elective", surgeon: "Dr. Achieng", duration: 75, status: "scheduled" },
  { time: "15:30", or: "OR-3", procedure: "Appendectomy", surgeon: "Dr. Mwangi", duration: 60, status: "scheduled" },
];

export const equipment = [
  { name: "Ventilators", available: 18, total: 24, status: "ok" },
  { name: "Dialysis machines", available: 6, total: 10, status: "ok" },
  { name: "Infusion pumps", available: 42, total: 60, status: "ok" },
  { name: "Defibrillators", available: 8, total: 8, status: "ok" },
  { name: "MRI scanner", available: 1, total: 2, status: "warning" },
  { name: "CT scanner", available: 2, total: 2, status: "ok" },
  { name: "ECMO units", available: 1, total: 3, status: "warning" },
];

export const referrals = [
  { id: "R-1042", from: "Mombasa Hospital", patient: "Cardiac, 58M", priority: "urgent", eta: "1h 20m", lat: 28, lng: 78 },
  { id: "R-1043", from: "Eldoret Referral", patient: "Trauma, 34F", priority: "urgent", eta: "2h 10m", lat: 22, lng: 35 },
  { id: "R-1044", from: "Kisumu County", patient: "Neonatal", priority: "stable", eta: "3h 00m", lat: 38, lng: 20 },
  { id: "R-1045", from: "Garissa General", patient: "Burns 45%", priority: "critical", eta: "45m", lat: 40, lng: 88 },
  { id: "R-1046", from: "Kampala IHK", patient: "Oncology", priority: "stable", eta: "Tomorrow", lat: 18, lng: 12 },
  { id: "R-1047", from: "Dar es Salaam", patient: "Neuro consult", priority: "stable", eta: "Tomorrow", lat: 70, lng: 60 },
];

export const teleQueue = [
  { specialty: "Cardiology", waiting: 4, avgWait: "8m" },
  { specialty: "Neurology", waiting: 2, avgWait: "12m" },
  { specialty: "Oncology", waiting: 3, avgWait: "15m" },
  { specialty: "Pediatric ICU", waiting: 1, avgWait: "4m" },
];

export const ambulances = [
  { id: "AMB-04", status: "en-route", patient: "Cardiac, code STEMI", eta: "6 min" },
  { id: "AMB-11", status: "en-route", patient: "RTA polytrauma", eta: "14 min" },
  { id: "AMB-07", status: "available", patient: "—", eta: "—" },
  { id: "AMB-02", status: "returning", patient: "Discharged", eta: "22 min" },
];

export const chronic = [
  { condition: "Hypertension", prevalence: 31, trend: 2.1, atRisk: 1840 },
  { condition: "Type 2 Diabetes", prevalence: 14, trend: 0.8, atRisk: 920 },
  { condition: "Cardiovascular", prevalence: 11, trend: -0.4, atRisk: 610 },
  { condition: "Chronic kidney", prevalence: 6, trend: 0.3, atRisk: 280 },
  { condition: "Respiratory", prevalence: 9, trend: 1.2, atRisk: 470 },
];

export const communityTrend = [
  { month: "Jan", cases: 412 }, { month: "Feb", cases: 438 }, { month: "Mar", cases: 467 },
  { month: "Apr", cases: 502 }, { month: "May", cases: 489 }, { month: "Jun", cases: 521 },
  { month: "Jul", cases: 558 }, { month: "Aug", cases: 540 }, { month: "Sep", cases: 575 },
  { month: "Oct", cases: 612 }, { month: "Nov", cases: 598 }, { month: "Dec", cases: 634 },
];

export const aiDecisions = [
  { id: "D-882", model: "Sepsis Predictor v3.2", input: "Patient AKU-3041 vitals + labs", output: "High risk (92%) — escalate", confidence: 92, override: false },
  { id: "D-881", model: "Triage Prioritizer v2.1", input: "ED arrival cohort 14:00", output: "Reorder 3 patients", confidence: 87, override: true },
  { id: "D-880", model: "Discharge Optimizer v1.8", input: "Ward 4B census", output: "5 candidates for discharge", confidence: 81, override: false },
  { id: "D-879", model: "Imaging Triage v2.0", input: "CT head — patient AKU-3052", output: "Probable ischemia (94%)", confidence: 94, override: false },
];
