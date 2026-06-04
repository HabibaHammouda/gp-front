import { createContext, useContext, type ReactNode } from 'react';
import { usePatient } from '../hooks/usePatient';
import type { PatientInfo } from '../services/types';

interface PatientContextValue {
  patient: PatientInfo | null;
  loading: boolean;
  error: string | null;
}

const PatientContext = createContext<PatientContextValue>({
  patient: null,
  loading: true,
  error: null,
});

export function PatientProvider({ children }: { children: ReactNode }) {
  const { patient, loading, error } = usePatient();

  return (
    <PatientContext.Provider value={{ patient, loading, error }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  return useContext(PatientContext);
}
