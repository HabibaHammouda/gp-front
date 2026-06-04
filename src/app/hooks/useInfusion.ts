import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../services/api';
import type { InfusionState } from '../services/types';

/**
 * useInfusion — polls infusion state every 2 seconds.
 * Provides manual adjustment function.
 */
export function useInfusion(pollIntervalMs = 2000) {
  const [infusion, setInfusion] = useState<InfusionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchInfusion = useCallback(async () => {
    try {
      const data = await api.getInfusionState();
      setInfusion(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch infusion state');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfusion();
    intervalRef.current = setInterval(fetchInfusion, pollIntervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchInfusion, pollIntervalMs]);

  const adjustRate = useCallback(async (delta: number) => {
    try {
      const updated = await api.adjustInfusionRate(delta);
      setInfusion(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to adjust rate');
    }
  }, []);

  return { infusion, loading, error, adjustRate };
}
