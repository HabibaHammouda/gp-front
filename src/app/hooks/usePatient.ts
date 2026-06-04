import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { PatientInfo } from '../services/types';

/**
 * usePatient — loads patient info once on mount.
 */
export function usePatient() {
  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPatient = async () => {
      try {
        const data = await api.getPatient();
        if (mounted) {
          setPatient(data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch patient');
          setLoading(false);
        }
      }
    };

    fetchPatient();

    return () => { mounted = false; };
  }, []);

  return { patient, loading, error };
}
