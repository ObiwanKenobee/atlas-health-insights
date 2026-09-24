// Per-patient clinical detail backing the patient drawer.

export interface VitalSeries {
  label: string;
  unit: string;
  points: number[];
  normal: [number, number];
}

export interface LabResult {
  name: string;
  value: string;
  unit: string;
  range: string;
  flag: "normal" | "high" | "low" | "critical";
}

export interface Medication {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  started: string;
}

export interface RiskFactor {
  label: string;
  contribution: number; // percentage points of the total score
  direction: "increases" | "decreases";
}

export interface PatientDetail {
  admitted: string;
  attending: string;
  allergies: string[];
  vitals: VitalSeries[];
  labs: LabResult[];
  meds: Medication[];
  ai: {
    model: string;
    confidence: number;
    summary: string;
    factors: RiskFactor[];
    recommendation: string;
  };
}

export const patientDetails: Record<string, PatientDetail> = {
  "AKU-3041": {
    admitted: "3 days ago",
    attending: "Dr. Ouma",
    allergies: ["Penicillin"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [98, 104, 110, 118, 124, 129, 133, 130, 136, 141, 138, 144] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [124, 120, 116, 110, 105, 101, 96, 94, 90, 87, 85, 82] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [97, 97, 96, 96, 95, 94, 93, 93, 92, 91, 90, 89] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [37.4, 37.8, 38.1, 38.5, 38.9, 39.2, 39.4, 39.1, 39.5, 39.6, 39.4, 39.7] },
    ],
    labs: [
      { name: "Lactate", value: "4.8", unit: "mmol/L", range: "0.5–2.2", flag: "critical" },
      { name: "WBC", value: "19.4", unit: "×10⁹/L", range: "4.0–11.0", flag: "high" },
      { name: "CRP", value: "218", unit: "mg/L", range: "<5", flag: "critical" },
      { name: "Creatinine", value: "184", unit: "µmol/L", range: "60–110", flag: "high" },
      { name: "Platelets", value: "88", unit: "×10⁹/L", range: "150–400", flag: "low" },
      { name: "Procalcitonin", value: "12.6", unit: "ng/mL", range: "<0.5", flag: "critical" },
    ],
    meds: [
      { name: "Meropenem", dose: "1 g", route: "IV", frequency: "8-hourly", started: "Today 06:10" },
      { name: "Noradrenaline", dose: "0.18 µg/kg/min", route: "IV infusion", frequency: "Continuous", started: "Today 07:45" },
      { name: "Hydrocortisone", dose: "50 mg", route: "IV", frequency: "6-hourly", started: "Today 08:00" },
      { name: "Sodium chloride 0.9%", dose: "30 mL/kg", route: "IV bolus", frequency: "Once", started: "Today 05:55" },
    ],
    ai: {
      model: "Sepsis Predictor v3.2",
      confidence: 92,
      summary:
        "Septic shock with progressive organ dysfunction. Lactate clearance has stalled despite adequate fluid resuscitation and vasopressor support.",
      factors: [
        { label: "Lactate 4.8 mmol/L and rising", contribution: 28, direction: "increases" },
        { label: "Falling systolic BP despite vasopressors", contribution: 24, direction: "increases" },
        { label: "Procalcitonin 12.6 ng/mL", contribution: 17, direction: "increases" },
        { label: "Acute kidney injury (creatinine ×1.7 baseline)", contribution: 14, direction: "increases" },
        { label: "Thrombocytopenia", contribution: 9, direction: "increases" },
        { label: "Antibiotics started within 1 hour", contribution: 6, direction: "decreases" },
      ],
      recommendation:
        "Escalate to ICU consultant now. Consider second vasopressor and repeat lactate in 1 hour. Source control review — abdominal imaging pending.",
    },
  },
  "AKU-3018": {
    admitted: "2 days ago",
    attending: "Dr. Ouma",
    allergies: ["None known"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [112, 108, 104, 101, 98, 96, 94, 92, 90, 88, 86, 84] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [102, 106, 110, 113, 116, 118, 120, 121, 122, 124, 125, 126] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [93, 94, 94, 95, 95, 96, 96, 97, 97, 97, 98, 98] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [37.2, 37.1, 37.0, 37.0, 36.9, 36.9, 36.8, 36.8, 36.9, 36.8, 36.7, 36.8] },
    ],
    labs: [
      { name: "Troponin I", value: "8.42", unit: "ng/mL", range: "<0.04", flag: "critical" },
      { name: "CK-MB", value: "62", unit: "U/L", range: "<25", flag: "high" },
      { name: "LDL cholesterol", value: "4.6", unit: "mmol/L", range: "<3.0", flag: "high" },
      { name: "Potassium", value: "4.1", unit: "mmol/L", range: "3.5–5.0", flag: "normal" },
      { name: "eGFR", value: "78", unit: "mL/min", range: ">90", flag: "low" },
      { name: "HbA1c", value: "6.1", unit: "%", range: "<5.7", flag: "high" },
    ],
    meds: [
      { name: "Aspirin", dose: "75 mg", route: "Oral", frequency: "Daily", started: "2 days ago" },
      { name: "Ticagrelor", dose: "90 mg", route: "Oral", frequency: "12-hourly", started: "2 days ago" },
      { name: "Atorvastatin", dose: "80 mg", route: "Oral", frequency: "Nightly", started: "2 days ago" },
      { name: "Bisoprolol", dose: "2.5 mg", route: "Oral", frequency: "Daily", started: "Yesterday" },
      { name: "Ramipril", dose: "2.5 mg", route: "Oral", frequency: "Daily", started: "Yesterday" },
    ],
    ai: {
      model: "Cardiac Recovery Monitor v2.4",
      confidence: 88,
      summary:
        "Day 2 post-PCI for anterior STEMI. Haemodynamics and oxygenation are improving steadily; residual risk driven by infarct size and intermittent arrhythmia.",
      factors: [
        { label: "Peak troponin 8.42 ng/mL (large infarct)", contribution: 31, direction: "increases" },
        { label: "Intermittent non-sustained VT on telemetry", contribution: 22, direction: "increases" },
        { label: "Reduced eGFR", contribution: 11, direction: "increases" },
        { label: "Improving heart rate and BP trend", contribution: 18, direction: "decreases" },
        { label: "Full dual antiplatelet therapy in place", contribution: 12, direction: "decreases" },
        { label: "Beta-blocker tolerated", contribution: 6, direction: "decreases" },
      ],
      recommendation:
        "Continue telemetry for a further 24 hours. Echo for ejection fraction before step-down. Titrate bisoprolol as tolerated and refer to cardiac rehabilitation.",
    },
  },
  "AKU-2987": {
    admitted: "18 hours ago",
    attending: "Dr. Patel",
    allergies: ["Sulfonamides"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [118, 116, 114, 112, 110, 109, 108, 107, 106, 105, 104, 104] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [96, 98, 99, 101, 103, 104, 105, 106, 107, 108, 109, 110] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [96, 96, 97, 97, 97, 97, 98, 98, 98, 98, 98, 98] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [36.6, 36.7, 36.7, 36.8, 36.8, 36.8, 36.9, 36.9, 36.9, 37.0, 36.9, 37.0] },
    ],
    labs: [
      { name: "Glucose", value: "24.8", unit: "mmol/L", range: "4.0–7.8", flag: "critical" },
      { name: "Blood pH", value: "7.19", unit: "", range: "7.35–7.45", flag: "critical" },
      { name: "Bicarbonate", value: "11", unit: "mmol/L", range: "22–29", flag: "low" },
      { name: "Ketones (β-OHB)", value: "5.4", unit: "mmol/L", range: "<0.6", flag: "critical" },
      { name: "Potassium", value: "3.2", unit: "mmol/L", range: "3.5–5.0", flag: "low" },
      { name: "Creatinine", value: "156", unit: "µmol/L", range: "60–110", flag: "high" },
    ],
    meds: [
      { name: "Insulin (soluble)", dose: "0.1 units/kg/hr", route: "IV infusion", frequency: "Continuous", started: "18 hours ago" },
      { name: "Sodium chloride 0.9%", dose: "1 L", route: "IV", frequency: "Per DKA protocol", started: "18 hours ago" },
      { name: "Potassium chloride", dose: "40 mmol/L", route: "IV", frequency: "With fluids", started: "16 hours ago" },
      { name: "Enoxaparin", dose: "40 mg", route: "Subcutaneous", frequency: "Daily", started: "Yesterday" },
    ],
    ai: {
      model: "Metabolic Risk Engine v1.9",
      confidence: 84,
      summary:
        "Diabetic ketoacidosis resolving on protocol, complicated by stage 3 chronic kidney disease which narrows the safe fluid window.",
      factors: [
        { label: "Blood pH 7.19 with ketosis", contribution: 30, direction: "increases" },
        { label: "Glucose 24.8 mmol/L", contribution: 19, direction: "increases" },
        { label: "Hypokalaemia on insulin infusion", contribution: 16, direction: "increases" },
        { label: "CKD stage 3 limits fluid tolerance", contribution: 14, direction: "increases" },
        { label: "Haemodynamics improving on protocol", contribution: 15, direction: "decreases" },
        { label: "No infection markers", contribution: 6, direction: "decreases" },
      ],
      recommendation:
        "Hourly glucose and potassium. Do not stop insulin until ketones under 0.6 mmol/L and bicarbonate normalised. Endocrinology and renal review today.",
    },
  },
  "AKU-3052": {
    admitted: "3 days ago",
    attending: "Dr. Mwangi",
    allergies: ["None known"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [88, 86, 85, 84, 83, 82, 82, 81, 80, 80, 79, 78] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [168, 164, 160, 156, 152, 150, 147, 145, 143, 141, 139, 138] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [95, 95, 96, 96, 96, 97, 97, 97, 97, 98, 98, 98] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [36.8, 36.8, 36.9, 36.8, 36.9, 36.9, 36.8, 36.9, 36.9, 36.8, 36.9, 36.8] },
    ],
    labs: [
      { name: "INR", value: "1.1", unit: "", range: "0.8–1.2", flag: "normal" },
      { name: "LDL cholesterol", value: "3.9", unit: "mmol/L", range: "<3.0", flag: "high" },
      { name: "HbA1c", value: "7.4", unit: "%", range: "<5.7", flag: "high" },
      { name: "Sodium", value: "137", unit: "mmol/L", range: "135–145", flag: "normal" },
      { name: "Creatinine", value: "98", unit: "µmol/L", range: "60–110", flag: "normal" },
      { name: "Swallow screen", value: "Pass", unit: "", range: "Pass", flag: "normal" },
    ],
    meds: [
      { name: "Aspirin", dose: "300 mg", route: "Oral", frequency: "Daily (14 days)", started: "3 days ago" },
      { name: "Atorvastatin", dose: "40 mg", route: "Oral", frequency: "Nightly", started: "3 days ago" },
      { name: "Amlodipine", dose: "5 mg", route: "Oral", frequency: "Daily", started: "2 days ago" },
      { name: "Metformin", dose: "500 mg", route: "Oral", frequency: "12-hourly", started: "2 days ago" },
    ],
    ai: {
      model: "Stroke Trajectory Model v2.2",
      confidence: 79,
      summary:
        "Day 3 ischaemic stroke with steady neurological recovery. Elevated blood pressure and glycaemic control are the main modifiable risks for recurrence.",
      factors: [
        { label: "Admission systolic BP 168 mmHg", contribution: 24, direction: "increases" },
        { label: "HbA1c 7.4% (suboptimal control)", contribution: 18, direction: "increases" },
        { label: "Age 72", contribution: 13, direction: "increases" },
        { label: "Swallow screen passed", contribution: 17, direction: "decreases" },
        { label: "Improving NIHSS over 72 hours", contribution: 19, direction: "decreases" },
        { label: "Secondary prevention started", contribution: 9, direction: "decreases" },
      ],
      recommendation:
        "Continue physiotherapy and speech therapy. Target systolic BP under 140 mmHg. Plan carotid imaging and arrange stroke clinic follow-up at 6 weeks.",
    },
  },
  "AKU-3009": {
    admitted: "4 days ago",
    attending: "Dr. Singh",
    allergies: ["Codeine"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [96, 95, 94, 93, 92, 91, 90, 89, 88, 88, 87, 86] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [118, 119, 120, 121, 121, 122, 122, 123, 123, 124, 124, 125] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [96, 96, 96, 97, 97, 97, 97, 98, 98, 98, 98, 98] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [37.6, 37.5, 37.4, 37.3, 37.3, 37.2, 37.1, 37.1, 37.0, 37.0, 36.9, 36.9] },
    ],
    labs: [
      { name: "WBC", value: "11.8", unit: "×10⁹/L", range: "4.0–11.0", flag: "high" },
      { name: "CRP", value: "64", unit: "mg/L", range: "<5", flag: "high" },
      { name: "Haemoglobin", value: "10.4", unit: "g/dL", range: "13.0–17.0", flag: "low" },
      { name: "Albumin", value: "31", unit: "g/L", range: "35–50", flag: "low" },
      { name: "Creatinine", value: "86", unit: "µmol/L", range: "60–110", flag: "normal" },
      { name: "Lactate", value: "1.4", unit: "mmol/L", range: "0.5–2.2", flag: "normal" },
    ],
    meds: [
      { name: "Paracetamol", dose: "1 g", route: "IV", frequency: "6-hourly", started: "4 days ago" },
      { name: "Morphine", dose: "2.5 mg", route: "IV", frequency: "As required", started: "4 days ago" },
      { name: "Cefazolin", dose: "1 g", route: "IV", frequency: "8-hourly", started: "4 days ago" },
      { name: "Enoxaparin", dose: "40 mg", route: "Subcutaneous", frequency: "Daily", started: "4 days ago" },
    ],
    ai: {
      model: "Surgical Recovery Index v1.6",
      confidence: 81,
      summary:
        "Day 4 post-laparotomy progressing normally. Inflammatory markers are falling and fever has settled; anaemia and low albumin are slowing recovery.",
      factors: [
        { label: "CRP 64 mg/L (down from 142)", contribution: 21, direction: "decreases" },
        { label: "Fever resolved over 48 hours", contribution: 18, direction: "decreases" },
        { label: "Haemoglobin 10.4 g/dL", contribution: 20, direction: "increases" },
        { label: "Albumin 31 g/L", contribution: 16, direction: "increases" },
        { label: "Mild persistent leucocytosis", contribution: 14, direction: "increases" },
        { label: "Mobilising independently", contribution: 11, direction: "decreases" },
      ],
      recommendation:
        "Step down to oral analgesia. Dietitian review for protein supplementation. Repeat full blood count in 48 hours; discharge planning can begin.",
    },
  },
  "AKU-3061": {
    admitted: "Yesterday",
    attending: "Dr. Achieng",
    allergies: ["None known"],
    vitals: [
      { label: "Heart rate", unit: "bpm", normal: [60, 100], points: [84, 83, 82, 81, 80, 79, 78, 78, 77, 76, 76, 75] },
      { label: "Systolic BP", unit: "mmHg", normal: [90, 140], points: [116, 115, 114, 114, 113, 113, 112, 112, 113, 112, 111, 112] },
      { label: "SpO₂", unit: "%", normal: [95, 100], points: [98, 98, 99, 99, 99, 99, 99, 99, 100, 99, 99, 100] },
      { label: "Temperature", unit: "°C", normal: [36, 37.5], points: [36.9, 36.8, 36.8, 36.9, 36.8, 36.8, 36.7, 36.8, 36.8, 36.7, 36.8, 36.7] },
    ],
    labs: [
      { name: "Haemoglobin", value: "11.6", unit: "g/dL", range: "12.0–16.0", flag: "low" },
      { name: "WBC", value: "9.2", unit: "×10⁹/L", range: "4.0–11.0", flag: "normal" },
      { name: "Platelets", value: "244", unit: "×10⁹/L", range: "150–400", flag: "normal" },
      { name: "CRP", value: "8", unit: "mg/L", range: "<5", flag: "high" },
      { name: "Blood group", value: "O positive", unit: "", range: "—", flag: "normal" },
      { name: "Urinalysis", value: "Clear", unit: "", range: "Clear", flag: "normal" },
    ],
    meds: [
      { name: "Ferrous sulfate", dose: "200 mg", route: "Oral", frequency: "Daily", started: "Yesterday" },
      { name: "Paracetamol", dose: "1 g", route: "Oral", frequency: "As required", started: "Yesterday" },
      { name: "Folic acid", dose: "5 mg", route: "Oral", frequency: "Daily", started: "Yesterday" },
    ],
    ai: {
      model: "Postpartum Wellness Check v1.3",
      confidence: 76,
      summary:
        "Uncomplicated day 1 postpartum course. All observations within normal limits; mild iron-deficiency anaemia is the only active issue.",
      factors: [
        { label: "Haemoglobin 11.6 g/dL", contribution: 34, direction: "increases" },
        { label: "Mildly raised CRP (expected post-delivery)", contribution: 12, direction: "increases" },
        { label: "Stable observations over 24 hours", contribution: 27, direction: "decreases" },
        { label: "No bleeding or infection signs", contribution: 19, direction: "decreases" },
        { label: "Breastfeeding established", contribution: 8, direction: "decreases" },
      ],
      recommendation:
        "Suitable for discharge tomorrow if observations hold. Continue iron supplementation for 3 months and arrange 6-week postnatal review.",
    },
  },
};
