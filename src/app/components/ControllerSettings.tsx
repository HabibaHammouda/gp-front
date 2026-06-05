import { Settings, Target, Zap, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useController } from '../hooks/useController';
import type { ControlMode } from '../services/types';

export function ControllerSettings() {
  const { config, loading, saving, error, updateConfig, saveConfig, resetDefaults } = useController();

  if (loading) return <div className="p-6 text-slate-500">Loading controller settings...</div>;
  if (error || !config) return <div className="p-6 text-red-500">Error: {error}</div>;

  const handleSave = async () => {
    try {
      await saveConfig();
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-slate-900">Controller Settings</h3>
            <p className="text-sm text-slate-500">Configure digital-twin control parameters</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Control Mode */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={18} className="text-indigo-500" />
            <h4 className="text-slate-900">Control Mode</h4>
          </div>

          <div className="space-y-3">
            {[
              { id: 'auto', label: 'Autonomous Control', desc: 'Fully automated MAP regulation' },
              { id: 'advisory', label: 'Advisory Mode', desc: 'System suggests adjustments' },
              { id: 'manual', label: 'Manual Override', desc: 'Direct clinician control' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => updateConfig({ mode: mode.id as ControlMode })}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  config.mode === mode.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-900">{mode.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{mode.desc}</p>
                  </div>
                  {config.mode === mode.id && (
                    <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Target size={18} className="text-blue-500" />
            <h4 className="text-slate-900">Target Parameters</h4>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm text-slate-600">Target MAP</label>
                <span className="text-slate-900 tabular-nums">{config.targetMAP} mmHg</span>
              </div>
              <input
                type="range"
                min="65"
                max="100"
                value={config.targetMAP}
                onChange={(e) => updateConfig({ targetMAP: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>65</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm text-slate-600">Control Aggressiveness</label>
                <span className="text-slate-900">{config.aggressiveness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.aggressiveness}
                onChange={(e) => updateConfig({ aggressiveness: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Response Time</span>
                <span className="text-slate-900">45 seconds</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Update Frequency</span>
                <span className="text-slate-900">Every 30s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Limits */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
        <div className="flex items-center gap-2 mb-6">
          <Shield size={18} className="text-red-500" />
          <h4 className="text-slate-900">Safety Limits</h4>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-slate-600 mb-2 block">Maximum Infusion Rate</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.maxRate}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, maxRate: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm text-slate-500 whitespace-nowrap">μg/min</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600 mb-2 block">Minimum MAP Threshold</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.minMAP}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, minMAP: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm text-slate-500">mmHg</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-600 mb-2 block">Maximum MAP Threshold</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.maxMAP}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, maxMAP: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm text-slate-500">mmHg</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">
            ⚠️ Safety limits prevent the controller from exceeding critical thresholds. Changes require supervisor approval.
          </p>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-6">Advanced Controller Parameters</h4>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">PID Controller - Kp (Proportional)</span>
              <input
                type="number"
                value={config.pidGains.kp}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, kp: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">PID Controller - Ki (Integral)</span>
              <input
                type="number"
                value={config.pidGains.ki}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, ki: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">PID Controller - Kd (Derivative)</span>
              <input
                type="number"
                value={config.pidGains.kd}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, kd: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Model Adaptation Rate</span>
              <input
                type="number"
                value={config.modelAdaptationRate}
                onChange={(e) => updateConfig({ modelAdaptationRate: Number(e.target.value) })}
                step="0.01"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Noise Filter Bandwidth</span>
              <input
                type="number"
                value={config.noiseFilterBandwidth}
                onChange={(e) => updateConfig({ noiseFilterBandwidth: Number(e.target.value) })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Prediction Horizon (min)</span>
              <input
                type="number"
                value={config.predictionHorizon}
                onChange={(e) => updateConfig({ predictionHorizon: Number(e.target.value) })}
                step="1"
                className="w-24 px-3 py-1 border border-slate-300 rounded-lg text-sm text-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button 
          onClick={resetDefaults}
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2 cursor-pointer ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
