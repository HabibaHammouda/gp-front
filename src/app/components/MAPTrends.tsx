import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart, ResponsiveContainer } from 'recharts';
import { Clock, Download } from 'lucide-react';
import { useMAPTrends } from '../hooks/useMAPTrends';
import { useState } from 'react';
import type { TrendRange } from '../services/types';

export function MAPTrends() {
  const [timeRange, setTimeRange] = useState<TrendRange>('6h');
  const { trendData, stats, loading, error } = useMAPTrends(timeRange);

  if (loading) return <div className="p-6 text-slate-400 font-bold text-sm uppercase tracking-wider">Loading trends...</div>;
  if (error || !stats) return <div className="p-6 text-[#D31D24] font-bold text-sm uppercase tracking-wider">Error: {error}</div>;

  const exportCSV = () => {
    const header = 'Time,MAP,Systolic,Diastolic';
    const rows = trendData.map(d => `${d.time},${d.map},${d.systolic},${d.diastolic}`);
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `map-trends-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 antialiased text-slate-800">
      
      {/* Header with controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0B1B3D] to-[#254175] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Clock size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#0B1B3D] font-bold text-base md:text-lg tracking-tight">MAP Trends Analysis</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Historical hemodynamic metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Time Filter Segmented Switch */}
            <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200/30">
              {(['1h', '6h', '12h', '24h'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-white text-[#0B1B3D] shadow-sm'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            {/* Export Actions Button */}
            <button 
              onClick={exportCSV} 
              className="px-5 py-2.5 bg-[#0B1B3D] hover:bg-[#D31D24] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all duration-200 shadow-md shadow-[#0B1B3D]/5 hover:shadow-[#D31D24]/10 cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAP Area Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">Mean Arterial Pressure Timeline</h4>
        <div className="h-96 bg-[#FAFAFA] rounded-xl border border-slate-100 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="mapTrendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D31D24" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#D31D24" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                interval={Math.floor(trendData.length / 12)}
              />
              <YAxis 
                domain={[60, 120]}
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 20px rgba(11,27,61,0.04)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0B1B3D'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', pt: '10px' }} />
              <Area 
                type="monotone" 
                dataKey="map" 
                stroke="#D31D24" 
                strokeWidth={3}
                fill="url(#mapTrendGradient)"
                name="Calculated MAP"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#0f766e" 
                strokeDasharray="6 4"
                strokeWidth={2}
                dot={false}
                name="Target Baseline"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Systolic / Diastolic Line Chart Tuple */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">Systolic / Diastolic Historical Bands</h4>
        <div className="h-80 bg-[#FAFAFA] rounded-xl border border-slate-100 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                interval={Math.floor(trendData.length / 12)}
              />
              <YAxis 
                domain={[40, 160]}
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 20px rgba(11,27,61,0.04)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', pt: '10px' }} />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="#e11d48" 
                strokeWidth={2.5}
                dot={false}
                name="Systolic Pressure"
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="#0B1B3D" 
                strokeWidth={2.5}
                dot={false}
                name="Diastolic Pressure"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Numerical Stats Summaries Footer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Average MAP</p>
          <p className="text-[#0B1B3D] text-2xl font-black tracking-tight">{stats.averageMAP} <span className="text-xs font-bold text-slate-400">mmHg</span></p>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mt-2 bg-teal-50 px-2 py-0.5 rounded-md inline-block">Horizon window: {timeRange}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time in Target</p>
          <p className="text-[#0B1B3D] text-2xl font-black tracking-tight">{stats.timeInTarget}%</p>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mt-2 bg-teal-50 px-2 py-0.5 rounded-md inline-block">Stable regulation</p>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">MAP Variance Coefficient</p>
          <p className="text-[#0B1B3D] text-2xl font-black tracking-tight">&plusmn;{stats.mapVariability}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2 bg-slate-50 px-2 py-0.5 rounded-md inline-block border border-slate-100">Optimal profile</p>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#D31D24]/20">
          <p className="text-[10px] font-black text-[#D31D24] uppercase tracking-widest mb-1">Hypotensive Incidents</p>
          <p className="text-[#D31D24] text-2xl font-black tracking-tight">{stats.hypotensiveEvents}</p>
          <p className="text-[10px] font-bold text-[#D31D24] uppercase tracking-wider mt-2 bg-red-50/60 px-2 py-0.5 rounded-md inline-block">Last: {stats.lastHypotensiveEvent}</p>
        </div>
      </div>
      
    </div>
  );
}