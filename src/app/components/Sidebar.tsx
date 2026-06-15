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
    <div className="hidden md:flex md:w-72 bg-white text-slate-800 p-6 flex-col shadow-[4px_0_24px_rgba(11,27,61,0.02)] border-r border-slate-200/80 antialiased">
      
      {/* Brand Header Group */}
      <Link to="/" className="mb-8 flex items-center gap-2 hover:opacity-90 transition-opacity">
        <img
          src="/logo_2.png"
          alt="Vasova"
          className="w-14 h-10 object-contain drop-shadow-[0_2px_8px_rgba(11,27,61,0.02)]"
        />
        <div>
          <h2 className="text-[#0B1B3D] font-black text-base tracking-tight leading-none">Vasova</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">ICU Control System</p>
        </div>
      </Link>

      {/* Navigation Links Layer */}
      <nav className="space-y-1.5 flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePath.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-200 ${
                isActive
                  ? 'bg-red-50 text-[#D31D24] shadow-sm border border-red-100/50'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-[#0B1B3D]'
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#D31D24]' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Telemetry Status Box */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest space-y-1.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex justify-between">
            <span>Bed Location:</span>
            <span className="text-[#0B1B3D] font-black">ICU-203</span>
          </div>
          <div className="flex justify-between">
            <span>Uptime Session:</span>
            <span className="text-slate-500 font-medium tracking-normal">02:45:32</span>
          </div>
        </div>
        
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-[#0B1B3D] font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <Info size={14} />
          About Vasova
        </Link>
      </div>
    </div>
  );
}