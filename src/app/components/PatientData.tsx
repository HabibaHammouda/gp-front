import { User, Calendar, Weight, Ruler } from 'lucide-react';
import { usePatientContext } from '../context/PatientContext';

export function PatientData() {
  const { patient, loading, error } = usePatientContext();

  if (loading) return <div className="p-4 text-slate-500">Loading patient data...</div>;
  if (error || !patient) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-slate-900">Patient Information</h3>
          <p className="text-sm text-slate-500">Bed {patient.bedId}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Demographics */}
        <div className="space-y-4">
          <h4 className="text-slate-700">Demographics</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500">Patient ID</p>
              <p className="text-slate-900">{patient.id}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Age / Sex</p>
              <p className="text-slate-900">{patient.age} years / {patient.sex}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Admission</p>
                <p className="text-slate-900 text-sm">{patient.admissionDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="space-y-4">
          <h4 className="text-slate-700">Physical</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Weight size={14} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Weight</p>
                <p className="text-slate-900">{patient.weight} kg</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Ruler size={14} className="text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Height</p>
                <p className="text-slate-900">{patient.height} cm</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500">BMI</p>
              <p className="text-slate-900">{patient.bmi}</p>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="space-y-4">
          <h4 className="text-slate-700">Primary Diagnosis</h4>
          <div className="space-y-3">
            {patient.diagnoses.map((dx, index) => {
              const colors = [
                'bg-red-50 border-red-200 text-red-700',
                'bg-orange-50 border-orange-200 text-orange-700',
                'bg-yellow-50 border-yellow-200 text-yellow-700'
              ];
              const colorClass = colors[index % colors.length];
              return (
                <div key={index} className={`px-3 py-2 border rounded-lg ${colorClass}`}>
                  <p className="text-xs">{dx}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <h4 className="text-slate-700">Active Medications</h4>
          <div className="space-y-2 text-sm">
            {patient.medications.map((med, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-slate-600">{med.name}</span>
                <span className="text-slate-900">{med.dose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Values */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-slate-700 mb-4">Recent Lab Values</h4>
        <div className="grid grid-cols-6 gap-4 text-sm">
          {patient.labValues.map((lab, index) => (
            <div key={index} className="px-3 py-2 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">{lab.name}</p>
              <p className="text-slate-900">{lab.value} {lab.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
