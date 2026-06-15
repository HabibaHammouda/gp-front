import { useEffect, useState, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { useVitals } from '../hooks/useVitals';

export function BloodPressureWaveform() {
  // Expanded to 200 data points to create a realistic, wide time-horizon sweep on screen
  const [data, setData] = useState<Array<{ time: number; pressure: number }>>([]);
  const { vitals } = useVitals();
  
  // Use a mutable reference to track the absolute live telemetry configuration variables
  const currentVitalsRef = useRef({ heartRate: 78, diastolic: 72, systolic: 118 });

  // Sync incoming telemetry variables into our tracking reference instantly without disrupting the loop
  useEffect(() => {
    if (vitals) {
      currentVitalsRef.current = {
        heartRate: vitals.heartRate || 78,
        diastolic: vitals.diastolic || 72,
        systolic: vitals.systolic || 118,
      };
    }
  }, [vitals]);

  useEffect(() => {
    // 1. Pre-populate a wide canvas array buffer baseline to establish immediate sizing metrics
    const initialData = Array.from({ length: 200 }, (_, i) => ({
      time: i,
      pressure: generateArterialWaveform(i, 78, 72, 46),
    }));
    setData(initialData);

    let globalTimelineIndex = 200;

    // 2. Strict, singular isolated execution thread running smoothly at a standard 30ms telemetry tick rate
    const interval = setInterval(() => {
      globalTimelineIndex++;
      
      // Pull parameters safely via reference pointers to protect against hook dependencies loop stacking
      const { heartRate, diastolic, systolic } = currentVitalsRef.current;
      const pulsePressure = systolic - diastolic;
      const nextPressureValue = generateArterialWaveform(globalTimelineIndex, heartRate, diastolic, pulsePressure);

      setData(prevData => {
        // Drop the earliest sample point from index 0 and slide the freshly computed vector value on the end
        const sliced = prevData.slice(1);
        sliced.push({
          time: globalTimelineIndex,
          pressure: nextPressureValue
        });
        return sliced;
      });
    }, 30); // Clean mathematical rendering rhythm

    return () => clearInterval(interval);
  }, []); // Zero dependency array guarantees EXACTLY one baseline loop thread ever runs

  /**
   * Generates a fully authentic human Arterial Blood Pressure (ABP) pulse.
   * Accurately features an immediate high-pressure Systolic upstroke, Peak rollout,
   * a distinct Dicrotic Notch (aortic valve closing backpressure), and long Diastolic runoff decay.
   */
  function generateArterialWaveform(t: number, heartRate: number, baselinePressure: number, pulsePressure: number): number {
    // Determine target sample point length dynamically based on current physiological rhythm
    const samplesPerMinute = 60000 / 30; // ~2000 rendering intervals per minute
    const cycleLength = samplesPerMinute / heartRate; 
    const phase = (t % cycleLength) / cycleLength;
    
    if (phase < 0.22) {
      // 1. Rapid Systolic Ejection / Upstroke Phase
      const systolicPhase = phase / 0.22;
      return baselinePressure + pulsePressure * Math.sin((systolicPhase * Math.PI) / 2);
    } else if (phase < 0.35) {
      // 2. Systolic Peak and early programmatic curve rollout
      const declinePhase = (phase - 0.22) / 0.13;
      return baselinePressure + pulsePressure * (1 - declinePhase * 0.18);
    } else if (phase < 0.40) {
      // 3. Catacrotic Drop plunging immediately down into the Dicrotic Notch point
      const notchPhase = (phase - 0.35) / 0.05;
      return baselinePressure + pulsePressure * (0.82 - notchPhase * 0.14);
    } else if (phase < 0.46) {
      // 4. The Dicrotic Wave rebound (Reflective arterial wave elasticity kickback)
      const reboundPhase = (phase - 0.40) / 0.06;
      return baselinePressure + pulsePressure * (0.68 + Math.sin(reboundPhase * Math.PI) * 0.06);
    } else {
      // 5. Long progressive Diastolic Runoff / Runout decay line back to baseline rest
      const diastolicPhase = (phase - 0.46) / (1 - 0.46);
      return baselinePressure + (pulsePressure * 0.68) * Math.exp(-diastolicPhase * 2.2);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#0B1B3D] font-bold text-base md:text-lg tracking-tight">Arterial Blood Pressure Waveform</h3>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Real-time beat-to-beat monitoring</p>
        </div>
        <button className="p-2 hover:bg-slate-50 border border-slate-100 rounded-lg transition-all cursor-pointer">
          <Maximize2 size={16} className="text-slate-400 group-hover:text-slate-600" />
        </button>
      </div>

      <div className="h-80 bg-[#FAFAFA] rounded-xl border border-slate-100 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="vasovaCrimsonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D31D24" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#D31D24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" hide />
            <YAxis 
              domain={[40, 160]} 
              ticks={[40, 60, 80, 100, 120, 140, 160]}
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              label={{ value: 'mmHg', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
            />
            <ReferenceLine y={120} stroke="#D31D24" strokeDasharray="4 4" opacity={0.4} />
            <ReferenceLine y={80} stroke="#0f766e" strokeDasharray="4 4" opacity={0.4} />
            
            <Area 
              type="monotone" 
              dataKey="pressure" 
              stroke="#D31D24" 
              strokeWidth={2.5}
              fill="url(#vasovaCrimsonGradient)"
              dot={false}
              isAnimationActive={false} // Crucial: forces direct, high-speed single-pass rastering
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs border-t border-slate-50 pt-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#D31D24] rounded-full shrink-0"></div>
            <span className="text-slate-500 font-medium">Systolic Threshold (<span className="font-bold text-slate-700">120 mmHg</span>)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-teal-600 rounded-full shrink-0"></div>
            <span className="text-slate-500 font-medium">Diastolic Baseline (<span className="font-bold text-slate-700">80 mmHg</span>)</span>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 border border-red-100/60 rounded-md self-start sm:self-center">
          <div className="w-1.5 h-1.5 bg-[#D31D24] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-[#D31D24] uppercase tracking-wider">Live Signal</span>
        </div>
      </div>
    </div>
  );
}