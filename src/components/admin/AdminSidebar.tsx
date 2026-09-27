import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Truck,
  ClipboardList,
  ShieldCheck,
  CreditCard,
  LifeBuoy,
  ShieldAlert,
  Warehouse as WarehouseIcon,
  History,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DcmLogo } from '../brand/DcmLogo';
import { useAdminTheme } from './theme/AdminThemeContext';
import { UserRole } from '../../types';

export type AdminTabKey =
  | 'dashboard'
  | 'moves'
  | 'leads'
  | 'quotes'
  | 'surveys'
  | 'payments'
  | 'fleet'
  | 'warehouses'
  | 'support'
  | 'claims'
  | 'staff'
  | 'audit';

interface AdminSidebarProps {
  activeTab: AdminTabKey;
  onSelectTab: (tab: AdminTabKey) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  counts: {
    moves: number;
    leads: number;
    quotes: number;
    surveys: number;
    fleet: number;
    warehouses: number;
    support: number;
    claims: number;
    staff: number;
    audit: number;
  };
  currentUserRole: UserRole;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  counts,
  currentUserRole,
  mobileOpen,
  onCloseMobile,
}) => {
  const { isDark, tokens } = useAdminTheme();

  const navGroups = [
    {
      group: 'OPERATIONS',
      items: [
        { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
        { id: 'moves', label: 'Move Lifecycle Ops', icon: Truck, count: counts.moves },
        { id: 'fleet', label: 'Fleet & GPS Radar', icon: Layers, count: counts.fleet },
        { id: 'warehouses', label: 'Warehousing & Vaults', icon: WarehouseIcon, count: counts.warehouses },
      ],
    },
    {
      group: 'SALES & CUSTOMER',
      items: [
        { id: 'leads', label: 'Leads & CRM Pipeline', icon: Users, count: counts.leads },
        { id: 'quotes', label: 'Quotations & Pricing', icon: FileText, count: counts.quotes },
        { id: 'surveys', label: 'Pre-Move Surveys', icon: ClipboardList, count: counts.surveys },
        { id: 'payments', label: 'Payments & Invoicing', icon: CreditCard },
      ],
    },
    {
      group: 'GOVERNANCE & TRUST',
      items: [
        { id: 'support', label: 'Support Desk Tickets', icon: LifeBuoy, count: counts.support },
        { id: 'claims', label: 'Damage Claims & POD', icon: ShieldAlert, count: counts.claims },
        { id: 'staff', label: 'Staff & Roles (RBAC)', icon: ShieldCheck, count: counts.staff },
        { id: 'audit', label: 'Security Audit Trail', icon: History, count: counts.audit },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen transition-all duration-200 border-r flex flex-col shrink-0 ${
          tokens.sidebarBg
        } ${tokens.borderDefault} ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'left-0' : '-left-full md:left-0'
        }`}
      >
        {/* Logo & Header Section */}
        <div
          className={`h-20 flex items-center px-4 border-b ${tokens.borderSubtle} justify-between shrink-0`}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2 overflow-hidden py-1">
              <DcmLogo size="sm" className="shrink-0" />
              <div className="min-w-0 pl-1">
                <span className="text-[10px] font-black tracking-wider uppercase text-orange-600 block leading-none">
                  ERP Control
                </span>
                <span className={`text-[11px] font-bold truncate block mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Operations Hub
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto py-1">
              <div className="w-8 h-8 rounded-lg bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                D
              </div>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className={`hidden md:flex p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((grp, grpIdx) => (
            <div key={grpIdx} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                  {grp.group}
                </div>
              )}
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id as AdminTabKey);
                      onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                      isActive
                        ? isDark
                          ? 'bg-blue-600 text-white shadow-xs font-bold'
                          : 'bg-[#0B3B8A] text-white shadow-xs font-bold'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-950'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    {!collapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.count !== undefined && item.count > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold leading-tight ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : isDark
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Current Role Indicator & System Status */}
        <div className={`p-3 border-t ${tokens.borderSubtle} shrink-0`}>
          {!collapsed ? (
            <div
              className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-amber-50/70 border-amber-200/80'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-orange-600 block leading-tight">
                  {currentUserRole.replace(/_/g, ' ')}
                </span>
                <span className={`text-[11px] truncate block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Authorized Terminal
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Live"></span>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Live"></span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
