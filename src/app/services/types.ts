// =============================================================================
// NeuroPy ICU Dashboard — Data Type Definitions
// =============================================================================
// These interfaces define the contract between frontend and backend.
// They map directly to the VPC signal structure in commandsFile.txt:
//   - MAP: double (patient model output)
//   - NE_infusion_rate: double (controller output)
//   - patientInfo: { initialBloodPressure, initialDosage, weight }
// =============================================================================

// --- Vital Signs (polled every 1s from /api/vitals) ---
export interface VitalSigns {
  map: number;           // Mean Arterial Pressure (mmHg)
  systolic: number;      // Systolic BP (mmHg)
  diastolic: number;     // Diastolic BP (mmHg)
  heartRate: number;     // Heart rate (bpm)
  timestamp: string;     // ISO 8601
}

// --- Infusion State (polled every 2s from /api/infusion) ---
export interface InfusionState {
  currentRate: number;      // NE_infusion_rate (mcg/min)
  targetRate: number;       // Controller target (mcg/min)
  totalDelivered: number;   // Cumulative dose (mg)
  duration: number;         // Infusion duration (seconds)
  trend: 'up' | 'down' | 'stable';
  controllerActive: boolean;
}

// --- Patient Info ---
export interface Medication {
  name: string;
  dose: string;
}

export interface LabValue {
  name: string;
  value: string;
  unit: string;
}

export interface PatientInfo {
  id: string;
  age: number;
  sex: 'M' | 'F';
  weight: number;           // kg — matches VPC patientInfo.weight
  height: number;           // cm
  bmi: number;
  admissionDate: string;
  bedId: string;
  diagnoses: string[];
  medications: Medication[];
  labValues: LabValue[];
}

// --- Controller Configuration ---
export type ControlMode = 'auto' | 'manual' | 'advisory';

export interface SafetyLimits {
  maxInfusionRate: number;  // mcg/min
  minMAP: number;           // mmHg
  maxMAP: number;           // mmHg
}

export interface PIDGains {
  kp: number;
  ki: number;
  kd: number;
}

export interface ControllerConfig {
  mode: ControlMode;
  targetMAP: number;           // Target MAP setpoint (mmHg)
  aggressiveness: number;      // 0-100%
  safetyLimits: SafetyLimits;
  pidGains: PIDGains;
  modelAdaptationRate: number;
  noiseFilterBandwidth: number;
  predictionHorizon: number;   // minutes
}

// --- Safety Alerts ---
export type AlertType = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// --- MAP Trend Data Point ---
export type TrendRange = '1h' | '6h' | '12h' | '24h';

export interface TrendDataPoint {
  time: string;
  map: number;
  target: number;
  systolic: number;
  diastolic: number;
}

// --- MAP Statistics ---
export interface MAPStatistics {
  averageMAP: number;
  timeInTarget: number;       // percentage
  mapVariability: number;     // ± mmHg
  hypotensiveEvents: number;
  lastHypotensiveEvent: string; // e.g. "4h ago"
}

// --- API Response wrapper ---
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
