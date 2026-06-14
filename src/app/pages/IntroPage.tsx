import { Link } from 'react-router';
import { ArrowRight, Users } from 'lucide-react';

export default function IntroPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/logo.jpeg"
            alt="Vasova Logo"
            className="w-28 h-28 rounded-2xl object-cover shadow-2xl shadow-teal-500/20 ring-1 ring-teal-500/20"
          />
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-3 tracking-tight">
          Vasova
        </h1>

        {/* Tagline */}
        <p className="text-teal-400 text-lg md:text-xl font-medium mb-8">
          AI-Powered ICU Blood Pressure Control
        </p>

        <div className="w-16 h-px bg-teal-500/40 mx-auto mb-8" />

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Managing blood pressure in the ICU requires constant, precise drug adjustment. Vasova
          automates this process using a digital twin of the patient, intelligent control
          algorithms, and real-time safety verification — reducing clinician workload while
          keeping patients in target range.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-400/35 hover:-translate-y-0.5"
          >
            Enter Dashboard
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-teal-500/50 text-slate-400 hover:text-teal-400 font-semibold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
          >
            <Users size={20} />
            Meet the Team
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-8 text-slate-600 text-sm">
        Cairo University · Faculty of Engineering · Graduation Project 2026
      </p>
    </div>
  );
}
