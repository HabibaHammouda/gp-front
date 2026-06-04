import { AlertTriangle, AlertCircle, CheckCircle, Info, Bell, BellOff } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
import type { AlertType } from '../services/types';

export function SafetyAlerts() {
  const { activeAlerts, resolvedAlerts, loading, error, acknowledgeAlert } = useAlerts();

  if (loading) return <div className="p-6 text-slate-500">Loading safety alerts...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-orange-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Bell className="text-slate-500" size={20} />;
    }
  };

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-orange-200 bg-orange-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-slate-200 bg-slate-50';
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const criticalCount = activeAlerts.filter(a => a.type === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.type === 'warning').length;
  const infoCount = activeAlerts.filter(a => a.type === 'info').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-slate-900">Safety Alerts & Notifications</h3>
              <p className="text-sm text-slate-500">Real-time system monitoring and warnings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
              <BellOff size={16} />
              <span>Mute All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Critical Alerts</span>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <p className="text-slate-900 text-3xl">{criticalCount}</p>
          <p className="text-xs text-slate-500 mt-2">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Warnings</span>
            <AlertCircle size={16} className="text-orange-500" />
          </div>
          <p className="text-slate-900 text-3xl">{warningCount}</p>
          <p className="text-xs text-slate-500 mt-2">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Info Messages</span>
            <Info size={16} className="text-blue-500" />
          </div>
          <p className="text-slate-900 text-3xl">{infoCount}</p>
          <p className="text-xs text-slate-500 mt-2">Active now</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Resolved</span>
            <CheckCircle size={16} className="text-green-500" />
          </div>
          <p className="text-slate-900 text-3xl">{resolvedAlerts.length}</p>
          <p className="text-xs text-slate-500 mt-2">Within 24 hours</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-4">Active Alerts</h4>
        
        {activeAlerts.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <p className="text-slate-600">No active alerts</p>
            <p className="text-sm text-slate-500 mt-1">All systems operating normally</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border-2 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-900">{alert.title}</p>
                        <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-slate-500 mt-2">{formatTime(alert.timestamp)}</p>
                      </div>
                      <button 
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
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

      {/* Alert History */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-4">Recently Resolved</h4>
        
        {resolvedAlerts.length === 0 ? (
          <p className="text-slate-500 text-sm">No recently resolved alerts.</p>
        ) : (
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 opacity-75"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-700">{alert.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{alert.message}</p>
                        <p className="text-xs text-slate-400 mt-2">{formatTime(alert.timestamp)} • Resolved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Rules */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h4 className="text-slate-900 mb-4">Active Safety Rules</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-900">MAP Range Monitor</span>
            </div>
            <p className="text-xs text-green-700">Alert if MAP {'<'} 65 or {'>'} 100 mmHg for {'>'} 2 minutes</p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-900">Infusion Rate Limiter</span>
            </div>
            <p className="text-xs text-green-700">Maximum rate change: 2 μg/min per adjustment</p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-900">Sensor Quality Check</span>
            </div>
            <p className="text-xs text-green-700">Verify arterial line waveform every 5 minutes</p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-green-900">Model Confidence</span>
            </div>
            <p className="text-xs text-green-700">Alert if prediction confidence {'<'} 70%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
