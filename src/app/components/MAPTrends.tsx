import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart, ResponsiveContainer } from 'recharts';
import { Clock, Download } from 'lucide-react';
import { useMAPTrends } from '../hooks/useMAPTrends';
import { useState } from 'react';
import type { TrendRange } from '../services/types';

export function MAPTrends() {
  const [timeRange, setTimeRange] = useState<TrendRange>('6h');
  const { trendData, stats, loading, error } = useMAPTrends(timeRange);

  if (loading) return <div className="p-6 text-slate-500">Loading trends...</div>;
  if (error || !stats) return <div className="p-6 text-red-500">Error: {error}</div>;

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
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-slate-900">MAP Trends Analysis</h3>
              <p className="text-sm text-slate-500">Historical hemodynamic data</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-xl p-1">
              {(['1h', '6h', '12h', '24h'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button onClick={exportCSV} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAP Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-4">Mean Arterial Pressure Over Time</h4>
        <div className="h-96 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="mapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 11 }}
                interval={Math.floor(trendData.length / 12)}
              />
              <YAxis 
                domain={[60, 120]}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="map" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                fill="url(#mapGradient)"
                name="MAP"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
                name="Target MAP"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Blood Pressure Range Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-4">Systolic / Diastolic Trends</h4>
        <div className="h-80 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 11 }}
                interval={Math.floor(trendData.length / 12)}
              />
              <YAxis 
                domain={[40, 160]}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
                label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
                name="Systolic"
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Average MAP</p>
          <p className="text-slate-900 text-3xl">{stats.averageMAP} mmHg</p>
          <p className="text-sm text-green-600 mt-2">Calculated for {timeRange}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Time in Target</p>
          <p className="text-slate-900 text-3xl">{stats.timeInTarget}%</p>
          <p className="text-sm text-green-600 mt-2">Excellent control</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">MAP Variability</p>
          <p className="text-slate-900 text-3xl">±{stats.mapVariability}</p>
          <p className="text-sm text-blue-600 mt-2">Low variance</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Hypotensive Events</p>
          <p className="text-slate-900 text-3xl">{stats.hypotensiveEvents}</p>
          <p className="text-sm text-orange-600 mt-2">Last: {stats.lastHypotensiveEvent}</p>
        </div>
      </div>
    </div>
  );
}
