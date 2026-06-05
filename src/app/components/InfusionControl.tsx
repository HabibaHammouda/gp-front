import { Syringe, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { useInfusion } from '../hooks/useInfusion';

export function InfusionControl() {
  const { infusion, loading, error, adjustRate } = useInfusion();

  if (loading) return <div className="p-4 text-slate-500 h-full">Loading controller state...</div>;
  if (error || !infusion) return <div className="p-4 text-red-500 h-full">Error: {error}</div>;

  const handleAdjust = async (delta: number) => {
    await adjustRate(delta);
    toast.success('Infusion rate updated');
  };

  const getTrendIcon = () => {
    if (infusion.trend === 'up') return <TrendingUp size={16} className="text-orange-500" />;
    if (infusion.trend === 'down') return <TrendingDown size={16} className="text-blue-500" />;
    return <Minus size={16} className="text-slate-400" />;
  };

  const getTrendColor = () => {
    if (infusion.trend === 'up') return 'border-orange-200 bg-orange-50';
    if (infusion.trend === 'down') return 'border-blue-200 bg-blue-50';
    return 'border-slate-200 bg-slate-50';
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Syringe size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-slate-900">Norepinephrine</h3>
          <p className="text-sm text-slate-500">Infusion Control</p>
        </div>
      </div>

      {/* Current Rate Display */}
      <div className={`rounded-xl p-4 mb-6 border-2 transition-colors ${getTrendColor()}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">Current Rate</span>
          {getTrendIcon()}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-slate-900 text-4xl tabular-nums">{infusion.currentRate.toFixed(1)}</span>
          <span className="text-slate-500">μg/min</span>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="space-y-4 mb-6 flex-1">
        <label className="text-sm text-slate-600">Manual Adjustment</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleAdjust(-0.5)}
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <span className="text-slate-700">-0.5</span>
          </button>
          <button
            onClick={() => handleAdjust(0.5)}
            className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors cursor-pointer"
          >
            <span>+0.5</span>
          </button>
        </div>
        <button
          onClick={() => handleAdjust(-1)}
          className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors text-sm cursor-pointer"
        >
          Emergency -1.0
        </button>
      </div>

      {/* Infusion Stats */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Target Rate</span>
          <span className="text-slate-900 tabular-nums">{infusion.targetRate.toFixed(1)} μg/min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Total Delivered</span>
          <span className="text-slate-900 tabular-nums">{infusion.totalDelivered.toFixed(1)} mg</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Duration</span>
          <span className="text-slate-900">{formatDuration(infusion.duration)}</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`mt-6 px-3 py-2 border rounded-lg ${infusion.controllerActive ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${infusion.controllerActive ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
          <span className={`text-xs ${infusion.controllerActive ? 'text-green-700' : 'text-orange-700'}`}>
            {infusion.controllerActive ? 'Controller Active' : 'Controller Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
}
