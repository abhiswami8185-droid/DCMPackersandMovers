import React from 'react';
import { Truck, MapPin, Phone, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { Vehicle } from '../../../types';

interface FleetTabProps {
  vehicles: Vehicle[];
}

export const FleetTab: React.FC<FleetTabProps> = ({ vehicles }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Fleet Management &amp; GPS Telemetry
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Sealed metal container trucks, enclosed hydraulic car trailers, driver allocations, and maintenance cycles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className={`p-5 rounded-2xl border transition-all ${
              tokens.cardBg
            } ${tokens.borderDefault} ${tokens.shadowCard} space-y-4`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-800">
                  {v.vehicleNumber}
                </span>
                <h4 className={`text-sm font-extrabold mt-1.5 ${tokens.textHeading}`}>
                  {v.type}
                </h4>
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  v.status === 'on_trip'
                    ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : v.status === 'available'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {v.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className={tokens.textSecondary}>Payload Capacity:</span>
                <span className={`font-mono font-bold ${tokens.textPrimary}`}>{v.capacityTons} Metric Tons</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={tokens.textSecondary}>Assigned Driver:</span>
                <span className={`font-bold ${tokens.textPrimary}`}>{v.driverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={tokens.textSecondary}>Driver Contact:</span>
                <a href={`tel:${v.driverPhone}`} className="font-mono text-orange-600 hover:underline">
                  {v.driverPhone}
                </a>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>Live GPS Location:</span>
                <span className="font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{v.currentLocationCity}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
