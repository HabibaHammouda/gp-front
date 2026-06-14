import { User, TrendingUp, Settings, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router';

interface SidebarProps {
  activePath: string;
}

export function Sidebar({ activePath }: SidebarProps) {
  const tabs = [
    { path: '/dashboard', label: 'Patient Data', icon: User },
    { path: '/trends', label: 'MAP Trends', icon: TrendingUp },
    { path: '/settings', label: 'Controller Settings', icon: Settings },
    { path: '/alerts', label: 'Safety Alerts', icon: AlertTriangle },
  ];

  return (
    <div className="hidden md:flex md:w-72 bg-gradient-to-b from-[#020617] to-[#0F172A] text-white p-6 flex-col shadow-2xl border-r border-slate-800/50">
      <Link to="/" className="mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img
          src="/logo.jpeg"
          alt="Vasova"
          className="w-12 h-12 rounded-xl object-cover shadow-lg shadow-teal-500/20"
        />
        <div>
          <h2 className="text-white font-bold text-lg leading-none">Vasova</h2>
          <p className="text-slate-400 text-xs mt-1">ICU Control System</p>
        </div>
      </Link>

      <nav className="space-y-2 flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePath.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-600 to-teal-400 text-white shadow-lg shadow-teal-500/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="text-sm text-slate-400 mb-4">
          <p>Bed: ICU-203</p>
          <p className="mt-1">Connected: 02:45:32</p>
        </div>
        <Link
          to="/about"
          className="flex items-center gap-2 text-slate-500 hover:text-teal-400 text-sm transition-colors"
        >
          <Info size={15} />
          About Vasova
        </Link>
      </div>
    </div>
  );
}
