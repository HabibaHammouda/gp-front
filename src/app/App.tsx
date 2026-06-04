import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router';
import { Sidebar } from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import MAPTrendsPage from './pages/MAPTrendsPage';
import ControllerSettingsPage from './pages/ControllerSettingsPage';
import SafetyAlertsPage from './pages/SafetyAlertsPage';
import { PatientProvider } from './context/PatientContext';

function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activePath={location.pathname} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">ICU Digital-Twin Blood Pressure Control</h1>
              <p className="text-slate-500 text-sm mt-1">Real-time Hemodynamic Monitoring & Control System</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">System Active</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trends" element={<MAPTrendsPage />} />
            <Route path="/settings" element={<ControllerSettingsPage />} />
            <Route path="/alerts" element={<SafetyAlertsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PatientProvider>
        <MainLayout />
      </PatientProvider>
    </BrowserRouter>
  );
}
