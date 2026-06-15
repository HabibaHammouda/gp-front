import { Link } from 'react-router';
import { ArrowRight, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function IntroPage() {
  const ecgRef = useRef<SVGPathElement>(null);
  
    useEffect(() => {
      const path = ecgRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2.5s ease';
        path.style.strokeDashoffset = '0';
      }, 500);
    }, []);
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center overflow-hidden antialiased text-slate-800">
      
      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      
      {/* Soft, modern decorative light glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Logo - Perfectly Spaced */}
        <div className="flex justify-center -mb-2">
          <img
            src="/logo_2.png"
            alt="Vasova Logo"
            className="w-80 h-60 object-contain drop-shadow-[0_4px_12px_rgba(11,27,61,0.04)]"
          />
        </div>

        {/* Title / Primary Hook */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] tracking-tight leading-tight mt-0 mb-4">
          Because every <span className="text-[#D31D24]">heartbeat,</span>
          <span className="block mt-1 text-[#0B1B3D]">
            deserves a system that <span className="text-[#D31D24]">never sleeps!</span>
          </span>
        </h1>

        {/* Tagline - Refined into a high-tech micro-badge */}
        <div className="inline-flex items-center bg-#0B1B3D-50/50 border border-[#0B1B3D]/30 px-3 py-1 rounded-full mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D31D24] mr-2 animate-pulse" />
          <p className="text-[#D31D24] text-[10px] md:text-xs font-bold tracking-wider uppercase">
            AI-Powered ICU Blood Pressure Control
          </p>
        </div>

        {/* Animated ECG line */}
        <div className="relative w-full max-w-lg mx-auto">
          <div
            style={{
              position: 'absolute', top: '50%', right: '100%',
              transform: 'translateY(-50%)', marginRight: 12,
              width: 48, height: 1, background: 'rgba(240,244,255,0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute', top: '50%', left: '100%',
              transform: 'translateY(-50%)', marginLeft: 12,
              width: 48, height: 1, background: 'rgba(240,244,255,0.1)',
            }}
          />
          <svg viewBox="0 0 500 48" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 48, overflow: 'visible' }}>
            {/* Glow layer */}
            <path
              d="M0,24 L60,24 L75,24 L80,10 L88,38 L95,4 L103,44 L110,24 L125,24 L140,24 L155,24 L160,10 L168,38 L175,4 L183,44 L190,24 L205,24 L220,24 L235,24 L240,10 L248,38 L255,4 L263,44 L270,24 L285,24 L300,24 L315,24 L320,10 L328,38 L335,4 L343,44 L350,24 L365,24 L380,24 L395,24 L400,10 L408,38 L415,4 L423,44 L430,24 L500,24"
              fill="none"
              stroke="#D31D24"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.12, filter: 'blur(4px)' }}
            />
            {/* Main ECG line */}
            <path
              ref={ecgRef}
              d="M0,24 L60,24 L75,24 L80,10 L88,38 L95,4 L103,44 L110,24 L125,24 L140,24 L155,24 L160,10 L168,38 L175,4 L183,44 L190,24 L205,24 L220,24 L235,24 L240,10 L248,38 L255,4 L263,44 L270,24 L285,24 L300,24 L315,24 L320,10 L328,38 L335,4 L343,44 L350,24 L365,24 L380,24 L395,24 L400,10 L408,38 L415,4 L423,44 L430,24 L500,24"
              fill="none"
              stroke="#D31D24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.85 }}
            />
          </svg>
        </div>

        {/* Micro Pulse-Line Separator */}
        {/*<div className="flex items-center justify-center gap-1 w-full max-w-xs mx-auto mb-8 opacity-40">
          <div className="h-px bg-slate-300 w-full" />
          <svg className="w-8 h-4 text-[#D31D24] shrink-0" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 6h6l2-5 3 10 2-7 2 2h9" />
          </svg>
          <div className="h-px bg-slate-300 w-full" />
        </div>*/}

        {/* Description */}
        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-xl mx-auto mt-4">
          Managing blood pressure in the ICU requires constant, precise drug adjustment. Vasova
          automates this process using a digital twin of the patient, intelligent control
          algorithms, and real-time safety verification — reducing clinician workload while
          keeping patients in target range.
        </p>

        {/* CTAs - Branded Color System */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-16">
          <Link
            to="/dashboard"
            className="group inline-flex items-center justify-center gap-2 bg-[#0B1B3D] hover:bg-[#D31D24] text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all shadow-md shadow-[#0B1B3D]/10 hover:shadow-[#D31D24]/20 hover:-translate-y-0.5 duration-200"
          >
            Enter Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#0B1B3D] font-semibold text-sm px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm duration-200"
          >
            <Users size={18} className="text-slate-400" />
            Meet the Team
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-slate-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wider">
        Cairo University &middot; Faculty of Engineering &middot; Graduation Project 2026
      </footer>
    </div>
  );
}