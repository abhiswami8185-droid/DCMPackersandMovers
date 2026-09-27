import React, { useState } from 'react';
import { Shield, Smartphone, Globe, Bell, Compass, X } from 'lucide-react';
import { UserRole } from '../../types';
import { notificationService } from '../../services/notificationService';

interface EcosystemBarProps {
  currentView: 'public' | 'admin' | 'staff';
  onViewChange: (view: 'public' | 'admin' | 'staff') => void;
  currentUserRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  onOpenTour: () => void;
}

export const EcosystemBar: React.FC<EcosystemBarProps> = ({
  currentView,
  onViewChange,
  currentUserRole: _currentUserRole,
  onRoleChange: _onRoleChange,
  onOpenTour,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = notificationService.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside aria-label="Platform view switcher" className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* View Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="font-semibold text-slate-400 mr-1 hidden sm:inline">Platform:</span>
          
          <button
            onClick={() => onViewChange('public')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              currentView === 'public'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </button>

          <button
            onClick={() => onViewChange('admin')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              currentView === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Command Center</span>
          </button>

          <button
            onClick={() => onViewChange('staff')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              currentView === 'staff'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Staff Mobile App (iOS / Android)</span>
          </button>

          {/* End-to-End Tour Button */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 ml-1 transition-all"
            title="Step-by-step interactive walk-through of the entire 18-step move lifecycle"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>18-Step Lifecycle Tour</span>
          </button>
        </div>

        {/* Notifications Tray */}
        <div className="flex items-center gap-2.5 ml-auto relative">
          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Notification Center (Push / WhatsApp / SMS)"
          >
            <Bell className="w-4 h-4 text-orange-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {notificationsOpen && (
            <div className="absolute top-8 right-0 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 text-white space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-extrabold text-xs text-white">Live Dispatched Alerts</span>
                <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-orange-400">{n.title}</span>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">{n.channels.join(', ')}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>
                    <span className="text-[9px] text-slate-500 block">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

