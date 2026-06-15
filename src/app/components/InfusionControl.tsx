import { Syringe, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { useInfusion } from '../hooks/useInfusion';

export function InfusionControl() {
  const { infusion, loading, error, adjustRate } = useInfusion();

  if (loading) return <div className="p-4 text-slate-400 font-bold text-sm uppercase tracking-wider h-full">Loading controller state...</div>;
  if (error || !infusion) return <div className="p-4 text-[#D31D24] font-bold text-sm uppercase tracking-wider h-full">Error: {error}</div>;

  const handleAdjust = async (delta: number) => {
    await adjustRate(delta);
    toast.success('Infusion rate updated');
  };

  const getTrendIcon = () => {
    if (infusion.trend === 'up') return <TrendingUp size={16} className="text-[#D31D24]" strokeWidth={2.5} />;
    if (infusion.trend === 'down') return <TrendingDown size={16} className="text-teal-600" strokeWidth={2.5} />;
    return <Minus size={16} className="text-slate-400" strokeWidth={2.5} />;
  };

  const getTrendColor = () => {
    if (infusion.trend === 'up') return 'border-[#D31D24]/30 bg-red-50/40 text-[#D31D24]';
    if (infusion.trend === 'down') return 'border-teal-100 bg-teal-50/40 text-teal-800';
    return 'border-slate-100 bg-slate-50/60 text-slate-700';
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 h-full flex flex-col justify-between antialiased text-slate-800">
      
      {/* Component Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#0B1B3D] to-[#254175] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
          <Syringe size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-[#0B1B3D] font-bold text-base tracking-tight leading-none">Norepinephrine</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Infusion Pump Node</p>
        </div>
      </div>

      {/* Current Rate Telemetry Card */}
      <div className={`rounded-xl p-4 mb-6 border-2 transition-colors duration-200 ${getTrendColor()}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Current Flow Rate</span>
          {getTrendIcon()}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-slate-900 font-black text-4xl tracking-tight tabular-nums">{infusion.currentRate.toFixed(1)}</span>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">μg/min</span>
        </div>
      </div>

      {/* Manual Controls Section */}
      <div className="space-y-4 mb-6 flex-1 flex flex-col justify-center">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Incremental Adjustments</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleAdjust(-0.5)}
            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            -0.5
          </button>
          <button
            onClick={() => handleAdjust(0.5)}
            className="flex-1 px-4 py-2.5 bg-[#0B1B3D] hover:bg-[#254175] text-white font-bold text-sm rounded-xl transition-all duration-150 cursor-pointer shadow-sm"
          >
            +0.5
          </button>
        </div>
        <button
          onClick={() => handleAdjust(-1)}
          className="w-full px-4 py-2.5 border-2 border-[#D31D24] text-[#D31D24] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-red-50/50 transition-all duration-150 cursor-pointer"
        >
          Emergency Reduction -1.0
        </button>
      </div>

      {/* Infusion Metrics Summary */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs font-semibold">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 uppercase tracking-wide text-[10px]">Target Horizon Rate</span>
          <span className="text-[#0B1B3D] font-bold bg-slate-50 border border-slate-200/40 px-2 py-0.5 rounded-md tabular-nums">{infusion.targetRate.toFixed(1)} μg/min</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 uppercase tracking-wide text-[10px]">Total Accumulated Dosage</span>
          <span className="text-[#0B1B3D] font-bold bg-slate-50 border border-slate-200/40 px-2 py-0.5 rounded-md tabular-nums">{infusion.totalDelivered.toFixed(1)} mg</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 uppercase tracking-wide text-[10px]">Active Administration Session</span>
          <span className="text-slate-600 font-medium">{formatDuration(infusion.duration)}</span>
        </div>
      </div>

      {/* Controller Loop Activation Status */}
      <div className={`mt-5 px-3 py-2 border-2 rounded-xl transition-all duration-200 ${infusion.controllerActive ? 'bg-teal-50/40 border-teal-600/20' : 'bg-amber-50/40 border-amber-500/20'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${infusion.controllerActive ? 'bg-teal-600 animate-pulse' : 'bg-amber-500'}`}></div>
          <span className={`text-[10px] font-black uppercase tracking-wider ${infusion.controllerActive ? 'text-teal-700' : 'text-amber-700'}`}>
            {infusion.controllerActive ? 'MPC Controller Link Active' : 'Loop Standby / Inactive'}
          </span>
        </div>
      </div>

    </div>
  );
}