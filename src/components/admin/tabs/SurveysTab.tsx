import React from 'react';
import { ClipboardList, Video, MapPin, Calendar, Clock, CheckCircle2, User } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { Survey } from '../../../types';

interface SurveysTabProps {
  surveys: Survey[];
}

export const SurveysTab: React.FC<SurveysTabProps> = ({ surveys }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Pre-Move Surveys &amp; Access Assessments
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            On-site physical visits and video call surveys to determine exact item count, CFT volume, and floor stair-carry logistics.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Survey Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Mode / Type</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Assigned Surveyor</th>
                <th className="py-3 px-4">Assessed Volume</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {surveys.map((s) => (
                <tr key={s.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                    {s.id.toUpperCase()}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{s.customerName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{s.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-blue-900 dark:text-blue-300">
                      {s.type === 'video' ? <Video className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-orange-500" />}
                      <span className="capitalize">{s.type.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textSecondary}`}>
                    <div>{s.scheduledDate}</div>
                    <span className="text-[10px] text-slate-400">{s.scheduledTimeSlot}</span>
                  </td>
                  <td className={`py-3.5 px-4 font-medium ${tokens.textPrimary}`}>
                    {s.surveyorName || 'Amit Verma (Chief Surveyor)'}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-bold ${tokens.textHeading}`}>
                    {s.estimatedVolumeCft ? `${s.estimatedVolumeCft} CFT` : 'Pending Assessment'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        s.status === 'completed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : s.status === 'scheduled'
                          ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 text-right ${tokens.textSecondary} text-[11px]`}>
                    {s.assessmentNotes || '3BHK complete household shifting assessment'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
