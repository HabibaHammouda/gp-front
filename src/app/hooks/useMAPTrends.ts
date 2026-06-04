import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { TrendDataPoint, TrendRange, MAPStatistics } from '../services/types';

/**
 * useMAPTrends — fetches historical MAP trend data for a given time range.
 * Re-fetches when range changes.
 */
export function useMAPTrends(range: TrendRange) {
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [stats, setStats] = useState<MAPStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [trends, mapStats] = await Promise.all([
          api.getTrends(range),
          api.getMAPStats(),
        ]);
        if (mounted) {
          setTrendData(trends);
          setStats(mapStats);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch trends');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [range]);

  return { trendData, stats, loading, error };
}
