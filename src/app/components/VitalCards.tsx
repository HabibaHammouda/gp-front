import { Activity, Heart, Droplet } from 'lucide-react';
import { useVitals } from '../hooks/useVitals';

export function VitalCards() {
  const { vitals, loading, error } = useVitals();

  if (loading) {
    return <div className="p-4 text-slate-400 font-bold text-sm uppercase tracking-wider">Loading vitals...</div>;
  }

  if (error || !vitals) {
    return <div className="p-4 text-[#D31D24] font-bold text-sm uppercase tracking-wider">Error loading vitals: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 antialiased text-slate-800">
      
      {/* 1. Blood Pressure Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-50 text-[#0B1B3D] border border-slate-200/60 rounded-xl flex items-center justify-center shadow-sm">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider">Blood Pressure</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">mmHg</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-[#0B1B3D] font-black text-4xl tracking-tight tabular-nums">{vitals.systolic}</span>
            <span className="text-slate-300 font-medium text-2xl">/</span>
            <span className="text-[#0B1B3D] font-black text-4xl tracking-tight tabular-nums">{vitals.diastolic}</span>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            <span>Hypo</span>
            <span className="text-teal-600 font-extrabold">Normal</span>
            <span>Hyper</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/20">
            {/* Custom linear marker indicator */}
            <div className="absolute top-0 bottom-0 left-[35%] right-[35%] bg-teal-600 rounded-full"></div>
            <div className="absolute top-0 bottom-0 left-[65%] w-1.5 bg-[#D31D24] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 2. MAP Card (Highlighted Primary System Feature) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 border-t-4 border-t-[#D31D24] relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D31D24]/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none"></div>
        <div>
          <div className="relative flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 text-[#D31D24] border border-red-100/50 rounded-xl flex items-center justify-center shadow-sm">
              <Droplet size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider">Mean Arterial Pressure</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Target: 65-100 mmHg</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[#0B1B3D] font-black text-5xl tracking-tight tabular-nums">{vitals.map}</span>
            <span className="text-[#D31D24] font-bold text-xs uppercase tracking-widest">mmHg</span>
          </div>
        </div>
        <div className="mt-5 self-start">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-100/80 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Within Target Range</span>
          </div>
        </div>
      </div>

      {/* 3. Heart Rate Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-50 text-[#0B1B3D] border border-slate-200/60 rounded-xl flex items-center justify-center shadow-sm">
              <Heart size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-black text-[#0B1B3D] uppercase tracking-wider">Heart Rate</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">bpm</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-2">
            <span className="text-[#0B1B3D] font-black text-5xl tracking-tight tabular-nums">{vitals.heartRate}</span>
            <div className="w-2 h-2 bg-[#D31D24] rounded-full animate-pulse mt-2"></div>
          </div>
        </div>
        
        {/* Simplified Live Mini Spark-bars */}
        <div className="mt-5">
          <div className="flex gap-1 h-6 items-end px-0.5">
            {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.5, 0.7, 0.4].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-[#0B1B3D]/10 group-hover:bg-[#0B1B3D]/20 rounded-sm transition-colors duration-200"
                style={{ height: `${height * 100}%` }}
              >
                {/* Active reading tracker cap */}
                <div 
                  className="w-full h-0.5 bg-[#0B1B3D]" 
                  style={{ opacity: i % 3 === 0 ? 0.8 : 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}