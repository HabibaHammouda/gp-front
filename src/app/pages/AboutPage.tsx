import { Link } from 'react-router';
import { ArrowLeft, Linkedin, Mail, LayoutDashboard, HeartPulse, ShieldCheck, Droplets, FlaskConical } from 'lucide-react';

const teamMembers = [
  {
    name: 'Mohamed Ibrahim Alhussini',
    email: 'Mohamed.Alhussini03@eng-st.cu.edu.eg',
    linkedin: 'https://www.linkedin.com/in/mohamed-alhussini/',
    initials: 'MI',
    gradient: 'from-[#0B1B3D] to-[#254175]',
    image: '/Mohamed.png',
    fallbackIcon: HeartPulse,
  },
  {
    name: 'Habiba Walid Hammouda',
    email: 'enghabibahammouda@gmail.com',
    linkedin: 'https://www.linkedin.com/in/habiba-hammouda-10ba60272/',
    initials: 'HW',
    gradient: 'from-[#0B1B3D] to-slate-700',
    image: '/Habiba.png',
    fallbackIcon: ShieldCheck,
  },
  {
    name: 'Salsabil Mostafa Alkitkat',
    email: 'salsabilalkitkat@gmail.com',
    linkedin: 'https://www.linkedin.com/in/salsabil-mostafa-576698267/',
    initials: 'SM',
    gradient: 'from-slate-800 to-[#0B1B3D]',
    image: '/Salsabil.png',
    fallbackIcon: Droplets,
  },
  {
    name: 'Mehrati Sameh Milad',
    email: 'mehratisameh03@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mehrati-sameh-932979277/',
    initials: 'MS',
    gradient: 'from-[#D31D24] to-[#0B1B3D]',
    image: '/Mehrati2.jpeg',
    fallbackIcon: FlaskConical,
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] flex flex-col justify-between overflow-hidden antialiased text-slate-800">
      
      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      
      {/* Soft, modern decorative light glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/60 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-500 hover:text-[#0B1B3D] font-semibold transition-colors text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back to Home
        </Link>
        
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-slate-500 hover:text-[#0B1B3D] font-semibold transition-colors text-xs uppercase tracking-wider"
        >
          <LayoutDashboard size={14} />
          Dashboard
        </Link>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 py-12 my-auto flex flex-col gap-12">
        
        {/* Project Section */}
        <section className="text-center flex flex-col items-center gap-4">
          <div className="flex justify-center -mb-4">
            <img
              src="/logo_2.png"
              alt="Vasova Logo"
              className="w-48 h-32 object-contain drop-shadow-[0_4px_12px_rgba(11,27,61,0.02)]"
            />
          </div>
          
          {/*<h1 className="text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight mt-0">
            About Vasova
          </h1>*/}
          
          <div className="inline-flex items-center bg-red-50/50 border-2 border-[#D31D24]/40 px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D31D24] mr-2 animate-pulse" />
            <p className="text-[#D31D24] text-[10px] md:text-xs font-bold tracking-wider uppercase">
              AI-Powered ICU Blood Pressure Control System
            </p>
          </div>

          {/* Core Features Horizontal Row */}
          <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-12 my-6">
            
            {/* Feature 1: Real-time monitoring */}
            <div className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
              <div className="w-12 h-12 border-2 border-[#D31D24] rounded-xl flex items-center justify-center text-[#D31D24] shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <path d="M3.22 12H7l2-5 3 10 2-7 1.5 4h5.28" />
                </svg>
              </div>
              <span className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight text-left whitespace-nowrap">
                Real-time monitoring
              </span>
            </div>

            {/* Feature 2: Intelligent drug control */}
            <div className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
              <div className="w-12 h-12 border-2 border-[#D31D24] rounded-xl flex items-center justify-center text-[#D31D24] shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12v4H6z" />
                  <path d="M12 7v7" />
                  <path d="M9 14h6v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5Z" />
                  <path d="M12 21a2 2 0 0 0 2-2v-5" />
                </svg>
              </div>
              <span className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight text-left whitespace-nowrap">
                Intelligent drug control
              </span>
            </div>

            {/* Feature 3: Patient safety */}
            <div className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
              <div className="w-12 h-12 border-2 border-[#D31D24] rounded-xl flex items-center justify-center text-[#D31D24] shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.51 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l7-2a1 1 0 0 1 .48 0l7 2c.46.13.76.56.76 1.03v7Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="text-[#0B1B3D] font-bold text-sm md:text-base tracking-tight text-left whitespace-nowrap">
                Patient safety
              </span>
            </div>

          </div>
        </section>

        {/* Team Section */}
        <section className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Meet the Team</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">The engineers behind Vasova</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-[#D31D24]/40 transition-all hover:-translate-y-1 group duration-200"
              >
                {/* Avatar Circle Container */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden relative`}
                >
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Fallback Icon - Sits beautifully behind the image layer */}
                  <member.fallbackIcon className="w-6 h-6 text-white z-0" />
                </div>

                <h3 className="text-[#0B1B3D] font-bold text-sm leading-snug tracking-tight mb-5 min-h-[40px] flex items-center justify-center">
                  {member.name}
                </h3>

                {/* Contact Actions */}
                <div className="mt-auto space-y-2.5 w-full border-t border-slate-100 pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-start gap-2 text-slate-400 hover:text-[#D31D24] transition-colors text-xs text-left"
                  >
                    <Mail size={13} className="shrink-0 mt-0.5 opacity-70" />
                    <span className="break-all font-medium text-[11px]">{member.email}</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-[#0B1B3D] font-bold transition-colors text-[11px]"
                  >
                    <Linkedin size={13} className="shrink-0 opacity-70" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center border-t border-slate-200/60 pt-6 text-slate-400 font-bold text-[10px] md:text-[11px] uppercase tracking-wider z-10 -mt-4 mb-4">
        Cairo University &middot; Faculty of Engineering &middot; Graduation Project 2026
      </footer>
    </div>
  );
}