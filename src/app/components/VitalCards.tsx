import { Activity, Heart, Droplet } from 'lucide-react';
import { useVitals } from '../hooks/useVitals';

export function VitalCards() {
  const { vitals, loading, error } = useVitals();

  if (loading) {
    return <div className="p-4 text-slate-500">Loading vitals...</div>;
  }

  if (error || !vitals) {
    return <div className="p-4 text-red-500">Error loading vitals: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {/* Blood Pressure Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Blood Pressure</p>
            <p className="text-xs text-slate-400">mmHg</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-slate-900 text-4xl tabular-nums">{vitals.systolic}</span>
          <span className="text-slate-400 text-2xl">/</span>
          <span className="text-slate-900 text-4xl tabular-nums">{vitals.diastolic}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
          <span className="text-xs text-slate-500">Normal</span>
        </div>
      </div>

      {/* MAP Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Droplet size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Mean Arterial Pressure</p>
              <p className="text-xs text-slate-400">Target: 65-100 mmHg</p>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-slate-900 text-5xl tabular-nums">{vitals.map}</span>
            <span className="text-blue-500 text-xl">mmHg</span>
          </div>
          <div className="mt-4 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg inline-block">
            <span className="text-xs text-green-700">Within Target Range</span>
          </div>
        </div>
      </div>

      {/* Heart Rate Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Heart Rate</p>
            <p className="text-xs text-slate-400">bpm</p>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-slate-900 text-5xl tabular-nums">{vitals.heartRate}</span>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-4">
          <div className="flex gap-1 h-8 items-end">
            {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.4].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm opacity-60"
                style={{ height: `${height * 100}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
