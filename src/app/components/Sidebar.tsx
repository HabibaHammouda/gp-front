import { User, TrendingUp, Settings, AlertTriangle } from 'lucide-react';
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
    <div className="hidden md:flex md:w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex-col shadow-2xl">
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl mb-4 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded-full"></div>
        </div>
        <h2 className="text-white">ICU Control</h2>
        <p className="text-slate-400 text-sm mt-1">v2.4.1</p>
      </div>

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
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-700">
        <div className="text-sm text-slate-400">
          <p>Bed: ICU-203</p>
          <p className="mt-1">Connected: 02:45:32</p>
        </div>
      </div>
    </div>
  );
}
