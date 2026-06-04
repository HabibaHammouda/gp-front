import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { useVitals } from '../hooks/useVitals';

export function BloodPressureWaveform() {
  const [data, setData] = useState<Array<{ time: number; pressure: number }>>([]);
  const { vitals } = useVitals();

  useEffect(() => {
    // Initialize with arterial waveform data
    const initialData = Array.from({ length: 100 }, (_, i) => ({
      time: i,
      pressure: generateArterialWaveform(i, 78, 72, 46), // default params
    }));
    setData(initialData);

    // Update waveform in real-time
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastTime = newData[newData.length - 1]?.time || 0;
        
        // Use real vitals if available, otherwise defaults
        const hr = vitals?.heartRate || 78;
        const diastolic = vitals?.diastolic || 72;
        const systolic = vitals?.systolic || 118;
        const pulsePressure = systolic - diastolic;

        newData.push({
          time: lastTime + 1,
          pressure: generateArterialWaveform(lastTime + 1, hr, diastolic, pulsePressure),
        });
        return newData;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [vitals]);

  // Generate realistic arterial blood pressure waveform with dicrotic notch
  function generateArterialWaveform(t: number, heartRate: number, baselinePressure: number, pulsePressure: number): number {
    const cycleLength = (60 / heartRate) * 20; // samples per cardiac cycle
    const phase = (t % cycleLength) / cycleLength;
    
    if (phase < 0.3) {
      // Systolic upstroke
      const systolicPhase = phase / 0.3;
      return baselinePressure + pulsePressure * Math.pow(systolicPhase, 1.5);
    } else if (phase < 0.4) {
      // Peak and early decline
      const declinePhase = (phase - 0.3) / 0.1;
      return baselinePressure + pulsePressure * (1 - declinePhase * 0.3);
    } else if (phase < 0.45) {
      // Dicrotic notch
      const notchPhase = (phase - 0.4) / 0.05;
      return baselinePressure + pulsePressure * (0.7 - notchPhase * 0.15);
    } else if (phase < 0.5) {
      // Post-notch rise
      const risePhase = (phase - 0.45) / 0.05;
      return baselinePressure + pulsePressure * (0.55 + risePhase * 0.1);
    } else {
      // Diastolic decay
      const diastolicPhase = (phase - 0.5) / 0.5;
      return baselinePressure + pulsePressure * 0.65 * Math.exp(-diastolicPhase * 3);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-slate-900">Arterial Blood Pressure Waveform</h3>
          <p className="text-sm text-slate-500 mt-1">Real-time beat-to-beat monitoring</p>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
          <Maximize2 size={18} className="text-slate-400" />
        </button>
      </div>

      <div className="h-80 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={[40, 160]} 
              ticks={[40, 60, 80, 100, 120, 140, 160]}
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            />
            <ReferenceLine y={120} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" opacity={0.5} />
            <Line 
              type="monotone" 
              dataKey="pressure" 
              stroke="url(#colorGradient)" 
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-slate-600">Systolic Threshold (120)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-600">Diastolic Threshold (80)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-slate-500">Live</span>
        </div>
      </div>
    </div>
  );
}
