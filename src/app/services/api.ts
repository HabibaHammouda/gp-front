// =============================================================================
// NeuroPy ICU Dashboard — API Client
// =============================================================================
// Toggle USE_MOCK_DATA to switch between mock and real backend.
// When backend is ready, set to false and all calls go to real endpoints.
// =============================================================================

import type {
  VitalSigns,
  InfusionState,
  PatientInfo,
  ControllerConfig,
  Alert,
  TrendDataPoint,
  TrendRange,
  MAPStatistics,
} from './types';

import {
  generateVitals,
  generateInfusionState,
  adjustInfusionTarget,
  generateTrendData,
  MOCK_PATIENT,
  MOCK_CONTROLLER_CONFIG,
  MOCK_ALERTS,
  MOCK_MAP_STATS,
} from './mockData';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FLIP THIS TO false WHEN BACKEND IS READY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const USE_MOCK_DATA = false;

// Base URL for the real backend
const API_BASE = 'https://gp-back-production-f096.up.railway.app/api';

// --- Helper ---
async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// --- Mock state (mutable copy for alerts) ---
let _mockAlerts = [...MOCK_ALERTS];
let _mockConfig = { ...MOCK_CONTROLLER_CONFIG };

// =============================================================================
// API Methods
// =============================================================================

export const api = {
  // ── Vitals (polled every 1s) ───────────────────────────────────────────────
  getVitals: async (): Promise<VitalSigns> => {
    if (USE_MOCK_DATA) return generateVitals();
    return fetchJson<VitalSigns>('/vitals');
  },

  // ── Patient Info (loaded once) ─────────────────────────────────────────────
  getPatient: async (): Promise<PatientInfo> => {
    if (USE_MOCK_DATA) return MOCK_PATIENT;
    return fetchJson<PatientInfo>('/patient');
  },

  // ── MAP Trends (on time range change) ──────────────────────────────────────
  getTrends: async (range: TrendRange): Promise<TrendDataPoint[]> => {
    if (USE_MOCK_DATA) return generateTrendData(range);
    return fetchJson<TrendDataPoint[]>(`/trends?range=${range}`);
  },

  // ── MAP Statistics ─────────────────────────────────────────────────────────
  getMAPStats: async (): Promise<MAPStatistics> => {
    if (USE_MOCK_DATA) return MOCK_MAP_STATS;
    return fetchJson<MAPStatistics>('/trends/stats');
  },

  // ── Infusion State (polled every 2s) ───────────────────────────────────────
  getInfusionState: async (): Promise<InfusionState> => {
    if (USE_MOCK_DATA) return generateInfusionState();
    return fetchJson<InfusionState>('/infusion');
  },

  // ── Adjust Infusion Rate ───────────────────────────────────────────────────
  adjustInfusionRate: async (delta: number): Promise<InfusionState> => {
    if (USE_MOCK_DATA) {
      adjustInfusionTarget(delta);
      return generateInfusionState();
    }
    return fetchJson<InfusionState>('/infusion/rate', {
      method: 'PUT',
      body: JSON.stringify({ delta }),
    });
  },

  // ── Alerts (polled every 5s) ───────────────────────────────────────────────
  getAlerts: async (): Promise<Alert[]> => {
    if (USE_MOCK_DATA) return _mockAlerts;
    return fetchJson<Alert[]>('/alerts');
  },

  // ── Acknowledge Alert ──────────────────────────────────────────────────────
  acknowledgeAlert: async (alertId: string): Promise<{ success: boolean }> => {
    if (USE_MOCK_DATA) {
      _mockAlerts = _mockAlerts.map((a) =>
        a.id === alertId ? { ...a, resolved: true } : a
      );
      return { success: true };
    }
    return fetchJson<{ success: boolean }>(`/alerts/${alertId}/ack`, {
      method: 'POST',
    });
  },

  // ── Controller Config (load) ───────────────────────────────────────────────
  getControllerConfig: async (): Promise<ControllerConfig> => {
    if (USE_MOCK_DATA) return _mockConfig;
    return fetchJson<ControllerConfig>('/controller');
  },

  // ── Controller Config (save) ───────────────────────────────────────────────
  updateControllerConfig: async (config: ControllerConfig): Promise<ControllerConfig> => {
    if (USE_MOCK_DATA) {
      _mockConfig = { ...config };
      return _mockConfig;
    }
    return fetchJson<ControllerConfig>('/controller', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  },
  // ── History ───────────────────────────────────────────────
  getHistory: async (type?: string, limit = 50) => {
  if (USE_MOCK_DATA) return []; // history only meaningful with real backend
  const params = new URLSearchParams({ limit: String(limit) });
  if (type) params.set('type', type);
  return fetchJson(`/history?${params}`);
  },

  getHistorySummary: async () => {
    if (USE_MOCK_DATA) return null;
    return fetchJson('/history/summary');
  },
};
