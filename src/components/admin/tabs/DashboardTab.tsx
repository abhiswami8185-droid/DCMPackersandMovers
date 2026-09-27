import React from 'react';
import {
  Truck,
  DollarSign,
  CreditCard,
  Users,
  TrendingUp,
  Warehouse as WarehouseIcon,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Layers,
  MapPin,
} from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { MoveSpecification, Lead } from '../../../types';
import { AdminTabKey } from '../AdminSidebar';

interface DashboardTabProps {
  bookings: MoveSpecification[];
  leads: Lead[];
  onSelectMove: (booking: MoveSpecification) => void;
  onNavigateTab: (tab: AdminTabKey) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  bookings,
  leads,
  onSelectMove,
  onNavigateTab,
}) => {
  const { isDark, tokens } = useAdminTheme();

  // Financial & Operational Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricing?.paidAmount || 0), 0);
  const pendingPayments = bookings.reduce((sum, b) => sum + (b.pricing?.balanceAmount || 0), 0);
  const activeMoves = bookings.filter((b) => b.currentStage !== 'move_completed');
  const delayedMoves = bookings.filter((b) => b.isDelayed);

  const kpis = [
    {
      label: 'Active Relocations',
      value: activeMoves.length.toString(),
      subtext: delayedMoves.length > 0 ? `${delayedMoves.length} flagged for delay` : '100% on schedule',
      trendPositive: delayedMoves.length === 0,
      icon: Truck,
      iconColor: 'text-blue-500',
      iconBg: isDark ? 'bg-blue-950/60' : 'bg-blue-50',
    },
    {
      label: 'Collected Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      subtext: 'Verified via Gateway & UPI',
      trendPositive: true,
      icon: DollarSign,
      iconColor: 'text-emerald-500',
      iconBg: isDark ? 'bg-emerald-950/60' : 'bg-emerald-50',
    },
    {
      label: 'Pending Receivables',
      value: `₹${pendingPayments.toLocaleString()}`,
      subtext: 'Milestone due on delivery',
      trendPositive: false,
      icon: CreditCard,
      iconColor: 'text-orange-500',
      iconBg: isDark ? 'bg-orange-950/60' : 'bg-orange-50',
    },
    {
      label: 'CRM Leads Pipeline',
      value: leads.length.toString(),
      subtext: 'Inquiry to Survey conversion',
      trendPositive: true,
      icon: Users,
      iconColor: 'text-amber-500',
      iconBg: isDark ? 'bg-amber-950/60' : 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Operational KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                tokens.cardBg
              } ${tokens.borderDefault} ${tokens.shadowCard}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${tokens.textSecondary}`}>
                  {kpi.label}
                </span>
                <div className={`w-8 h-8 rounded-xl ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-2xl font-black mt-2 font-mono ${tokens.textHeading}`}>
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold">
                {kpi.trendPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                )}
                <span className={kpi.trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}>
                  {kpi.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Active Consignment Radar Table */}
      <div
        className={`rounded-2xl border ${
          tokens.cardBg
        } ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}
      >
        <div className={`p-5 border-b ${tokens.borderSubtle} flex flex-wrap items-center justify-between gap-3`}>
          <div>
            <h3 className={`text-sm font-extrabold flex items-center gap-2 ${tokens.textHeading}`}>
              <Truck className="w-4 h-4 text-orange-600" />
              <span>Active Consignment Radar</span>
            </h3>
            <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
              Live container trucks, inter-state transit, and scheduled deliveries.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('moves')}
            className={`text-xs font-bold flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline`}
          >
            <span>View All Operations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Origin → Destination</th>
                <th className="py-3 px-4">Move Date</th>
                <th className="py-3 px-4">Milestone Stage</th>
                <th className="py-3 px-4">Total Fixed</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className={`transition-colors ${tokens.tableRowHoverBg}`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-orange-600">
                    {b.bookingId}
                  </td>
                  <td className={`py-3 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{b.customerName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {b.moveType.toUpperCase()} · {b.customerPhone}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${tokens.textSecondary}`}>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span>{b.origin.city}</span>
                      <span className="text-slate-400">→</span>
                      <span>{b.destination.city}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${tokens.textSecondary} font-mono`}>
                    {b.movingDate}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                        b.isDelayed
                          ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-300'
                          : isDark
                          ? 'bg-blue-950/80 border-blue-800 text-blue-300'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}
                    >
                      {b.isDelayed && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                      <span>{b.currentStage.replace(/_/g, ' ')}</span>
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold ${tokens.textPrimary}`}>
                    ₹{b.pricing.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectMove(b)}
                      className="btn-3d-orange h-7 px-3 text-[11px] font-bold"
                    >
                      Manage Move
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Quick Action Operational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('leads')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-orange-500/50 ${
            tokens.cardBg
          } ${tokens.borderDefault} ${tokens.shadowCard}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${tokens.textHeading}`}>CRM Lead Conversions</h4>
              <p className={`text-[11px] mt-0.5 ${tokens.textSecondary}`}>
                {leads.length} incoming quote inquiries pending followup.
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('fleet')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-blue-500/50 ${
            tokens.cardBg
          } ${tokens.borderDefault} ${tokens.shadowCard}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${tokens.textHeading}`}>Fleet Dispatch Status</h4>
              <p className={`text-[11px] mt-0.5 ${tokens.textSecondary}`}>
                GPS tracking &amp; sealed container verification.
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('claims')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-amber-500/50 ${
            tokens.cardBg
          } ${tokens.borderDefault} ${tokens.shadowCard}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${tokens.textHeading}`}>Transit Insurance Desk</h4>
              <p className={`text-[11px] mt-0.5 ${tokens.textSecondary}`}>
                Digital POD verification and damage claim review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
