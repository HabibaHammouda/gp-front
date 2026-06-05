import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { ControllerConfig } from '../services/types';

/**
 * useController — loads and saves controller configuration.
 */
export function useController() {
  const [config, setConfig] = useState<ControllerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchConfig = async () => {
      try {
        const data = await api.getControllerConfig();
        if (mounted) {
          setConfig(data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch config');
          setLoading(false);
        }
      }
    };

    fetchConfig();

    return () => { mounted = false; };
  }, []);

  const updateConfig = useCallback((partial: Partial<ControllerConfig>) => {
    setConfig((prev) => prev ? { ...prev, ...partial } : prev);
  }, []);

  const saveConfig = useCallback(async () => {
    if (!config) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await api.updateControllerConfig(config);
      setConfig(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save config');
      throw err;
    } finally {
      setSaving(false);
    }
  }, [config]);

  const resetDefaults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getControllerConfig();
      setConfig(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset config');
    } finally {
      setLoading(false);
    }
  }, []);

  return { config, loading, saving, error, updateConfig, saveConfig, resetDefaults };
}
