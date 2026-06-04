import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';
import type { Alert } from '../services/types';

/**
 * useAlerts — polls alerts every 5 seconds.
 * Provides acknowledge functionality.
 */
export function useAlerts(pollIntervalMs = 5000) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await api.getAlerts();
      setAlerts(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    intervalRef.current = setInterval(fetchAlerts, pollIntervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAlerts, pollIntervalMs]);

  const acknowledgeAlert = useCallback(async (alertId: string) => {
    try {
      await api.acknowledgeAlert(alertId);
      // Optimistic update
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to acknowledge alert');
    }
  }, []);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);

  return { alerts, activeAlerts, resolvedAlerts, loading, error, acknowledgeAlert };
}
