import { AlertTriangle, AlertCircle, CheckCircle, Info, Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAlerts } from '../hooks/useAlerts';
import type { AlertType } from '../services/types';

export function SafetyAlerts() {
  const { activeAlerts, resolvedAlerts, loading, error, acknowledgeAlert } = useAlerts();

  if (loading) return <div className="p-6 text-slate-400 font-bold text-sm uppercase tracking-wider">Loading safety alerts...</div>;
  if (error) return <div className="p-6 text-[#D31D24] font-bold text-sm uppercase tracking-wider">Error: {error}</div>;

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="text-[#D31D24]" size={18} strokeWidth={2.5} />;
      case 'warning':
        return <AlertCircle className="text-amber-600" size={18} strokeWidth={2.5} />;
      case 'info':
        return <Info className="text-slate-500" size={18} strokeWidth={2.5} />;
      default:
        return <Bell className="text-slate-400" size={18} strokeWidth={2} />;
    }
  };

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return 'border-[#D31D24]/30 bg-red-50/40 text-[#D31D24]';
      case 'warning':
        return 'border-amber-200 bg-amber-50/40 text-amber-900';
      case 'info':
        return 'border-slate-200 bg-slate-50/60 text-slate-700';
      default:
        return 'border-slate-100 bg-white text-slate-600';
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const criticalCount = activeAlerts.filter(a => a.type === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.type === 'warning').length;
  const infoCount = activeAlerts.filter(a => a.type === 'info').length;

  return (
    <div className="space-y-6 antialiased text-slate-800">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0B1B3D] to-[#254175] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#0B1B3D] font-bold text-base md:text-lg tracking-tight">Safety Alerts & Notifications</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Real-time system monitoring and warnings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer">
              <BellOff size={14} />
              <span>Mute All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#D31D24]/20">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Critical Alerts</span>
            <AlertTriangle size={14} className="text-[#D31D24]" strokeWidth={2.5} />
          </div>
          <p className="text-[#D31D24] text-3xl font-black tracking-tight">{criticalCount}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Warnings</span>
            <AlertCircle size={14} className="text-amber-500" strokeWidth={2.5} />
          </div>
          <p className="text-[#0B1B3D] text-3xl font-black tracking-tight">{warningCount}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Info Messages</span>
            <Info size={14} className="text-slate-400" strokeWidth={2.5} />
          </div>
          <p className="text-[#0B1B3D] text-3xl font-black tracking-tight">{infoCount}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolved</span>
            <CheckCircle size={14} className="text-teal-600" strokeWidth={2.5} />
          </div>
          <p className="text-[#0B1B3D] text-3xl font-black tracking-tight">{resolvedAlerts.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Within 24 hours</p>
        </div>
      </div>

      {/* Active Alerts Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">Active Monitor Stream</h4>
        
        {activeAlerts.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={22} className="text-teal-600" strokeWidth={2.5} />
            </div>
            <p className="text-slate-700 font-bold text-sm">No active alerts</p>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">All digital-twin control models operating normally</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-sm tracking-tight text-slate-900">{alert.title}</p>
                        <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                        <span className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-black/5 px-1.5 py-0.5 rounded mt-2.5">
                          Detected at: {formatTime(alert.timestamp)}
                        </span>
                      </div>
                      <button
                        onClick={async () => {
                          await acknowledgeAlert(alert.id);
                          toast.success('Alert acknowledged');
                        }}
                        className="px-4 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm self-start sm:self-center cursor-pointer"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert History Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">Recently Resolved Logs</h4>
        
        {resolvedAlerts.length === 0 ? (
          <p className="text-slate-400 font-medium text-xs">No recently resolved entries found in the logs database.</p>
        ) : (
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 opacity-80"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-700 tracking-tight">{alert.title}</p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">{alert.message}</p>
                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mt-2 bg-teal-50 border border-teal-100/40 inline-block px-1.5 py-0.5 rounded">
                      {formatTime(alert.timestamp)} &bull; Resolved Safely
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Rules Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <h4 className="text-[#0B1B3D] font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">Active Co-Simulation Verification Guards</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50/80 border border-slate-200/40 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle size={14} className="text-teal-600" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide">MAP Tracking Boundaries</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Interrupt control loop if calculated digital-twin MAP outputs drift beyond limits (<span className="font-bold">65-100 mmHg</span>) for more than 120 seconds.</p>
          </div>

          <div className="p-4 bg-slate-50/80 border border-slate-200/40 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle size={14} className="text-teal-600" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide">Infusion Step-Rate Slew Limiter</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Imposes absolute math bounds restricting rapid changes. System change is bounded to a maximum step of <span className="font-bold">2 μg/min</span> per calculation horizon iteration.</p>
          </div>

          <div className="p-4 bg-slate-50/80 border border-slate-200/40 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle size={14} className="text-teal-600" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide">Arterial Waveform Disconnect Quality</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Continuously analyzes signal pulse geometry and dicrotic notch presence every 5 minutes to detect arterial catheter dampening or decoupling.</p>
          </div>

          <div className="p-4 bg-slate-50/80 border border-slate-200/40 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle size={14} className="text-teal-600" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wide">LSTM Controller Variance Guard</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Drops autonomous state to physician alert mode if neural prediction covariance confidence bounds fall lower than <span className="font-bold">70%</span> accuracy metrics.</p>
          </div>
        </div>
      </div>

    </div>
  );
}