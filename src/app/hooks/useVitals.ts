import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import type { VitalSigns } from '../services/types';

/**
 * useVitals — polls vital signs every 1 second.
 * Returns the latest vital signs and a loading state.
 */
export function useVitals(pollIntervalMs = 1000) {
  const [vitals, setVitals] = useState<VitalSigns | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchVitals = async () => {
      try {
        const data = await api.getVitals();
        if (mounted) {
          setVitals(data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch vitals');
          setLoading(false);
        }
      }
    };

    fetchVitals();
    intervalRef.current = setInterval(fetchVitals, pollIntervalMs);

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollIntervalMs]);

  return { vitals, loading, error };
}
