import { VitalCards } from '../components/VitalCards';
import { BloodPressureWaveform } from '../components/BloodPressureWaveform';
import { InfusionControl } from '../components/InfusionControl';
import { PatientData } from '../components/PatientData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Vital Signs Cards */}
      <VitalCards />

      {/* Blood Pressure Waveform and Infusion Control */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <BloodPressureWaveform />
        </div>
        <div>
          <InfusionControl />
        </div>
      </div>

      {/* Patient Details */}
      <PatientData />
    </div>
  );
}
