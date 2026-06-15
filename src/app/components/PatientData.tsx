import { User, Calendar, Weight, Ruler } from 'lucide-react';
import { usePatientContext } from '../context/PatientContext';

export function PatientData() {
  const { patient, loading, error } = usePatientContext();

  if (loading) return <div className="p-4 text-slate-400 font-bold text-sm uppercase tracking-wider">Loading patient data...</div>;
  if (error || !patient) return <div className="p-4 text-[#D31D24] font-bold text-sm uppercase tracking-wider">Error: {error}</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 antialiased text-slate-800">
      
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-[#0B1B3D] to-[#254175] rounded-xl flex items-center justify-center shadow-sm">
          <User size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-[#0B1B3D] font-bold text-base md:text-lg tracking-tight">Patient Clinical Dossier</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Location ID: Bed {patient.bedId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        
        {/* Demographics Column */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-1.5">Demographics</h4>
          <div className="space-y-2.5 text-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Identification</p>
              <p className="text-[#0B1B3D] font-bold mt-0.5">{patient.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age / Biological Sex</p>
              <p className="text-[#0B1B3D] font-bold mt-0.5">{patient.age} years / {patient.sex}</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Calendar size={13} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admission Timestamp</p>
                <p className="text-slate-700 font-semibold mt-0.5 text-xs">{patient.admissionDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Metrics Column */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-1.5">Biometrics & Physical</h4>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <Weight size={13} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Weight</p>
                <p className="text-[#0B1B3D] font-bold mt-0.5">{patient.weight} kg</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Ruler size={13} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Height</p>
                <p className="text-[#0B1B3D] font-bold mt-0.5">{patient.height} cm</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calculated BMI</p>
              <p className="text-[#0B1B3D] font-black mt-0.5">{patient.bmi}</p>
            </div>
          </div>
        </div>

        {/* Diagnosis Column */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-1.5">Primary Diagnostic Profiles</h4>
          <div className="space-y-2">
            {patient.diagnoses.map((dx, index) => {
              const colors = [
                'bg-red-50/50 border-[#D31D24]/30 text-[#D31D24]',
                'bg-slate-50 border-slate-200/60 text-slate-700',
                'bg-teal-50/50 border-teal-100 text-teal-800'
              ];
              const colorClass = colors[index % colors.length];
              return (
                <div key={index} className={`px-3 py-1.5 border-2 rounded-xl transition-colors duration-150 font-bold text-xs ${colorClass}`}>
                  <p className="tracking-tight leading-snug">{dx}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medications Column */}
        <div className="space-y-3.5">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-1.5">Active Pharmacotherapy</h4>
          <div className="space-y-2 text-xs font-semibold">
            {patient.medications.map((med, index) => (
              <div key={index} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-none">
                <span className="text-slate-500">{med.name}</span>
                <span className="text-[#0B1B3D] font-bold bg-slate-50 border border-slate-200/40 px-2 py-0.5 rounded-md tabular-nums">{med.dose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Values Panel Footnote */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3.5">Recent Laboratory Biomarkers</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {patient.labValues.map((lab, index) => (
            <div key={index} className="px-3 py-2 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lab.name}</p>
              <p className="text-[#0B1B3D] font-black mt-0.5 tracking-tight tabular-nums">{lab.value} <span className="text-[10px] font-bold text-slate-400">{lab.unit}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}