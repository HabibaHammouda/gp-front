import { Settings, Target, Zap, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useController } from '../hooks/useController';
import type { ControlMode } from '../services/types';

export function ControllerSettings() {
  const { config, loading, saving, error, updateConfig, saveConfig, resetDefaults } = useController();

  if (loading) return <div className="p-6 text-slate-500 font-medium">Loading controller settings...</div>;
  if (error || !config) return <div className="p-6 text-[#D31D24] font-bold">Error: {error}</div>;

  const handleSave = async () => {
    try {
      await saveConfig();
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6 antialiased text-slate-800">
      
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0B1B3D] to-[#254175] rounded-xl flex items-center justify-center shadow-sm">
            <Settings size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-[#0B1B3D] font-bold text-base md:text-lg tracking-tight">Controller Settings</h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Configure digital-twin control parameters</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Control Mode Selection Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-3">
            <Zap size={18} className="text-[#D31D24]" />
            <h4 className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight">Control Mode Matrix</h4>
          </div>

          <div className="space-y-3">
            {[
              { id: 'auto', label: 'Autonomous Control', desc: 'Fully automated closed-loop MAP regulation' },
              { id: 'advisory', label: 'Advisory Mode', desc: 'System generates digital-twin suggestions' },
              { id: 'manual', label: 'Manual Override', desc: 'Direct raw clinician pump control' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => updateConfig({ mode: mode.id as ControlMode })}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  config.mode === mode.id
                    ? 'border-[#0B1B3D] bg-slate-50/80 shadow-inner'
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-bold ${config.mode === mode.id ? 'text-[#0B1B3D]' : 'text-slate-700'}`}>
                      {mode.label}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">{mode.desc}</p>
                  </div>
                  {config.mode === mode.id && (
                    <div className="w-5 h-5 bg-[#0B1B3D] rounded-full flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Parameters Slider Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-3">
            <Target size={18} className="text-teal-600" />
            <h4 className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight">Target Constraints</h4>
          </div>

          <div className="space-y-6">
            {/* Target MAP Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target MAP</label>
                <span className="text-sm font-black text-[#0B1B3D] tabular-nums bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/40">{config.targetMAP} mmHg</span>
              </div>
              <input
                type="range"
                min="65"
                max="100"
                value={config.targetMAP}
                onChange={(e) => updateConfig({ targetMAP: Number(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#D31D24]"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                <span>65 mmHg</span>
                <span>100 mmHg</span>
              </div>
            </div>

            {/* Control Aggressiveness Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Control Aggressiveness</label>
                <span className="text-sm font-black text-[#0B1B3D] tabular-nums bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/40">{config.aggressiveness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.aggressiveness}
                onChange={(e) => updateConfig({ aggressiveness: Number(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0B1B3D]"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                <span>Conservative (PID)</span>
                <span>Aggressive (MPC)</span>
              </div>
            </div>

            {/* Micro Telemetry Metrics */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Response Horizon Horizon</span>
                <span className="text-[#0B1B3D] font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">45 seconds</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Loop Calculation Frequency</span>
                <span className="text-[#0B1B3D] font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Every 30s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Limits Card Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#D31D24]/30">
        <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-3">
          <Shield size={18} className="text-[#D31D24]" />
          <h4 className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight">Critical Safety Threshold Bounds</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Max Infusion Rate</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.maxRate}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, maxRate: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-[#D31D24]/20 focus:border-[#D31D24]"
              />
              <span className="text-xs font-bold text-slate-400 whitespace-nowrap">μg/min</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Min MAP Threshold</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.minMAP}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, minMAP: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-[#D31D24]/20 focus:border-[#D31D24]"
              />
              <span className="text-xs font-bold text-slate-400">mmHg</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Max MAP Threshold</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={config.safetyLimits.maxMAP}
                onChange={(e) => updateConfig({ safetyLimits: { ...config.safetyLimits, maxMAP: Number(e.target.value) } })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-[#0B1B3D] focus:outline-none focus:ring-2 focus:ring-[#D31D24]/20 focus:border-[#D31D24]"
              />
              <span className="text-xs font-bold text-slate-400">mmHg</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-50/50 border border-[#D31D24]/20 rounded-xl">
          <p className="text-xs font-medium text-[#D31D24] leading-relaxed">
            ⚠️ <strong>Safety Guard Isolation Layer:</strong> Hard safety limits instantly prevent the automated pump controller logic from calculating or executing rates beyond specified critical boundaries.
          </p>
        </div>
      </div>

      {/* Advanced Control System Gains Matrix */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight mb-6 border-b border-slate-50 pb-3">Advanced Mathematical Control Gains</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">NN-PID - Kp (Proportional)</span>
              <input
                type="number"
                value={config.pidGains.kp}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, kp: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">NN-PID - Ki (Integral)</span>
              <input
                type="number"
                value={config.pidGains.ki}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, ki: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
            <div className="flex items-center justify-between py-2.5 border-b lg:border-none border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">NN-PID - Kd (Derivative)</span>
              <input
                type="number"
                value={config.pidGains.kd}
                onChange={(e) => updateConfig({ pidGains: { ...config.pidGains, kd: Number(e.target.value) } })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Digital-Twin Adaptation Rate</span>
              <input
                type="number"
                value={config.modelAdaptationRate}
                onChange={(e) => updateConfig({ modelAdaptationRate: Number(e.target.value) })}
                step="0.01"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kalman Noise Filter Bandwidth</span>
              <input
                type="number"
                value={config.noiseFilterBandwidth}
                onChange={(e) => updateConfig({ noiseFilterBandwidth: Number(e.target.value) })}
                step="0.1"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">LSTM Prediction Horizon (Np)</span>
              <input
                type="number"
                value={config.predictionHorizon}
                onChange={(e) => updateConfig({ predictionHorizon: Number(e.target.value) })}
                step="1"
                className="w-24 px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold text-right text-[#0B1B3D]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <button 
          onClick={resetDefaults}
          className="px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 bg-[#0B1B3D] hover:bg-[#D31D24] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md shadow-[#0B1B3D]/10 hover:shadow-[#D31D24]/10 flex items-center gap-2 cursor-pointer ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save size={14} />
          {saving ? 'Saving...' : 'Commit Configuration'}
        </button>
      </div>
    </div>
  );
}