import { Link } from 'react-router';
import { ArrowLeft, Linkedin, Mail, LayoutDashboard } from 'lucide-react';

const teamMembers = [
  {
    name: 'Mohamed Ibrahim Alhussini',
    email: 'Mohamed.Alhussini03@eng-st.cu.edu.eg',
    linkedin: 'https://www.linkedin.com/in/mohamed-alhussini/',
    initials: 'MI',
    gradient: 'from-teal-500 to-cyan-700',
  },
  {
    name: 'Habiba Walid Hammouda',
    email: 'enghabibahammouda@gmail.com',
    linkedin: 'https://www.linkedin.com/in/habiba-hammouda-10ba60272/',
    initials: 'HW',
    gradient: 'from-teal-600 to-teal-900',
  },
  {
    name: 'Salsabil Mostafa Alkitkat',
    email: 'salsabilalkitkat@gmail.com',
    linkedin: 'https://www.linkedin.com/in/salsabil-mostafa-576698267/',
    initials: 'SM',
    gradient: 'from-cyan-500 to-teal-800',
  },
  {
    name: 'Mehrati Sameh Milad',
    email: 'mehratisameh03@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mehrati-sameh-932979277/',
    initials: 'MS',
    gradient: 'from-teal-400 to-cyan-800',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <Link to="/">
          <img src="/logo.jpeg" alt="Vasova" className="w-8 h-8 rounded-lg object-cover" />
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Project section */}
        <section className="mb-24 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.jpeg"
              alt="Vasova Logo"
              className="w-20 h-20 rounded-2xl object-cover shadow-xl shadow-teal-500/20 ring-1 ring-teal-500/20"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Vasova</h1>
          <p className="text-teal-400 text-lg font-medium mb-8">
            AI-Powered ICU Blood Pressure Control System
          </p>
          <div className="w-12 h-px bg-teal-500/40 mx-auto mb-8" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Managing blood pressure in the ICU requires constant, precise drug adjustment. Vasova
            automates this process using a digital twin of the patient, intelligent control
            algorithms, and real-time safety verification — reducing clinician workload while
            keeping patients in target range.
          </p>
        </section>

        {/* Team section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-2">Meet the Team</h2>
          <p className="text-slate-500 text-center mb-12">The engineers behind Vasova</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center hover:border-teal-500/40 transition-all hover:-translate-y-1 group"
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-lg font-bold text-white mb-4 shadow-lg group-hover:shadow-teal-500/20 transition-shadow`}
                >
                  {member.initials}
                </div>

                <h3 className="text-white font-semibold text-sm leading-snug mb-5">
                  {member.name}
                </h3>

                <div className="mt-auto space-y-3 w-full">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-start gap-2 text-slate-500 hover:text-teal-400 transition-colors text-xs text-left"
                  >
                    <Mail size={13} className="shrink-0 mt-0.5" />
                    <span className="break-all">{member.email}</span>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors text-xs"
                  >
                    <Linkedin size={13} className="shrink-0" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-20 text-slate-600 text-sm">
          Cairo University · Faculty of Engineering · Graduation Project 2025
        </div>
      </main>
    </div>
  );
}
