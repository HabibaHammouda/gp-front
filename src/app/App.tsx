import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { User, TrendingUp, Settings, AlertTriangle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import MAPTrendsPage from './pages/MAPTrendsPage';
import ControllerSettingsPage from './pages/ControllerSettingsPage';
import SafetyAlertsPage from './pages/SafetyAlertsPage';
import IntroPage from './pages/IntroPage';
import AboutPage from './pages/AboutPage';
import { PatientProvider } from './context/PatientContext';

function MobileNav({ activePath }: { activePath: string }) {
  const tabs = [
    { path: '/dashboard', label: 'Patient', icon: User },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020617] border-t border-slate-800 flex z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activePath.startsWith(tab.path);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
              isActive ? 'text-teal-400' : 'text-slate-500'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#071428]">
      <Sidebar activePath={location.pathname} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#0F172A] border-b border-slate-700/50 px-4 md:px-8 py-3 md:py-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-slate-100 text-sm md:text-base truncate font-semibold">
                ICU Digital-Twin Blood Pressure Control
              </h1>
              <p className="text-slate-500 text-xs mt-0.5 hidden sm:block">
                Real-time Hemodynamic Monitoring & Control System
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-slate-400 whitespace-nowrap">System Active</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-3 md:p-6 pb-20 md:pb-6 bg-[#071428]">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/trends" element={<MAPTrendsPage />} />
            <Route path="/settings" element={<ControllerSettingsPage />} />
            <Route path="/alerts" element={<SafetyAlertsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      <MobileNav activePath={location.pathname} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PatientProvider>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
        <Toaster position="top-right" />
      </PatientProvider>
    </BrowserRouter>
  );
}
