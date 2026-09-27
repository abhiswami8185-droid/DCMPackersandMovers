import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminTheme } from './theme/AdminThemeContext';
import { AdminThemeSwitcher } from './theme/AdminThemeSwitcher';
import { UserRole } from '../../types';
import { notificationService, AppNotification } from '../../services/notificationService';

interface AdminTopBarProps {
  activeTabTitle: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentUserRole: UserRole;
  onExitAdmin: () => void;
  onOpenMobileSidebar: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  activeTabTitle,
  searchQuery,
  onSearchChange,
  currentUserRole,
  onExitAdmin,
  onOpenMobileSidebar,
}) => {
  const { isDark, tokens } = useAdminTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const notifications = notificationService.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header
      className={`h-20 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors ${
        tokens.headerBg
      } ${tokens.borderDefault} backdrop-blur-md`}
    >
      {/* Left: Mobile Toggle & Page Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <span>DCM ERP</span>
            <span>/</span>
            <span className="text-orange-600 font-semibold">Head Office</span>
          </div>
          <h1 className={`text-base sm:text-lg font-black tracking-tight leading-tight ${tokens.textHeading}`}>
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Center: Global Operational Search */}
      <div className="hidden lg:flex items-center max-w-xs xl:max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search booking ID, customer, driver, truck..."
            className={`w-full text-xs pl-9 pr-4 py-2 rounded-xl border transition-all ${
              tokens.inputBg
            } ${tokens.inputText} ${tokens.inputBorder} ${tokens.inputPlaceholder} ${tokens.inputFocusBorder} ${tokens.inputFocusRing}`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Toolbar: Theme Switcher, Notifications, Profile, Exit */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Switcher: Light | Dark | System */}
        <div className="shrink-0">
          <AdminThemeSwitcher />
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 rounded-xl border transition-colors relative cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:text-blue-950 hover:bg-slate-50'
            }`}
            title="Operational Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-600 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div
              className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border ${
                tokens.borderDefault
              } ${tokens.cardBg} ${tokens.shadowDropdown} z-50 p-4 space-y-3 animate-in fade-in-50 zoom-in-95 duration-150`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-blue-950 dark:text-white">
                    Operational Alerts
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                    {unreadCount} New
                  </span>
                </div>
                <button
                  onClick={() => {
                    notificationService.markAllAsRead();
                    setNotificationsOpen(false);
                  }}
                  className="text-[11px] font-bold text-orange-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border text-xs space-y-1 transition-colors ${
                        n.read
                          ? isDark
                            ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                            : 'bg-slate-50/70 border-slate-150 text-slate-500'
                          : isDark
                          ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                          : 'bg-amber-50/50 border-amber-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] leading-snug line-clamp-2">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No active operational alerts.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#0B3B8A] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold block leading-tight">Admin User</span>
              <span className="text-[10px] font-black uppercase text-orange-600 block leading-none">
                {currentUserRole.replace(/_/g, ' ')}
              </span>
            </div>
          </button>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-2 w-64 rounded-2xl border ${
                tokens.borderDefault
              } ${tokens.cardBg} ${tokens.shadowDropdown} z-50 p-4 space-y-3 animate-in fade-in-50 zoom-in-95 duration-150`}
            >
              <div className="pb-2 border-b border-slate-200/50">
                <span className="text-xs font-bold block text-blue-950 dark:text-white">
                  Head Office Terminal #1
                </span>
                <span className="text-[11px] text-slate-400 block">
                  admin.chandigarh@dcmpackersmovers.com
                </span>
                <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Role: {currentUserRole.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onExitAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit to Public Website</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Exit to Public Website Button */}
        <button
          onClick={onExitAdmin}
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
          }`}
          title="Return to Customer Website"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Public Site</span>
        </button>
      </div>
    </header>
  );
};
