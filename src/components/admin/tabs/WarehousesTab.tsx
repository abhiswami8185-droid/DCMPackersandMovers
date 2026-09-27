import React from 'react';
import { Warehouse as WarehouseIcon, ShieldCheck, Thermometer, MapPin, User, CheckCircle2 } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { Warehouse } from '../../../types';

interface WarehousesTabProps {
  warehouses: Warehouse[];
}

export const WarehousesTab: React.FC<WarehousesTabProps> = ({ warehouses }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Warehousing Facilities &amp; Storage Vaults
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Palletized bays, climate-controlled household vaults, CCTV perimeter security, and occupancy rates across DCM hubs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((w) => {
          const occupancyRate = Math.round((w.occupiedCft / w.capacityCft) * 100);
          return (
            <div
              key={w.id}
              className={`p-6 rounded-2xl border transition-all ${
                tokens.cardBg
              } ${tokens.borderDefault} ${tokens.shadowCard} space-y-4`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 block">
                    {w.city} Facility Hub
                  </span>
                  <h3 className={`text-base font-extrabold mt-0.5 ${tokens.textHeading}`}>
                    {w.name}
                  </h3>
                  <p className={`text-xs mt-1 ${tokens.textSecondary}`}>
                    {w.address}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <WarehouseIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={tokens.textSecondary}>Occupancy Load:</span>
                  <span className="font-mono font-bold text-orange-600">{occupancyRate}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Occupied: {w.occupiedCft.toLocaleString()} CFT</span>
                  <span>Total: {w.capacityCft.toLocaleString()} CFT</span>
                </div>
              </div>

              {/* Security & Climate Badges */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Security &amp; Climate Safeguards
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {w.climateControlled && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                      <Thermometer className="w-3 h-3 text-blue-500" />
                      <span>Climate Controlled</span>
                    </span>
                  )}
                  {w.securityFeatures.map((sec, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>{sec}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Facility Manager */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className={tokens.textSecondary}>Facility Supervisor:</span>
                <span className={`font-bold ${tokens.textPrimary}`}>{w.managerName} ({w.managerPhone})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
