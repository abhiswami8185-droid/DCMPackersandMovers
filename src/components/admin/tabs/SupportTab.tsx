import React from 'react';
import { LifeBuoy, AlertCircle, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { SupportTicket } from '../../../types';

interface SupportTabProps {
  tickets: SupportTicket[];
}

export const SupportTab: React.FC<SupportTabProps> = ({ tickets }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Customer Support &amp; Escalation Desk
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Direct client queries, packaging inquiries, delivery time adjustments, and SLA resolution tracking.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {tickets.map((t) => (
                <tr key={t.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                    {t.id.toUpperCase()}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{t.customerName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{t.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold">{t.category}</span>
                  </td>
                  <td className={`py-3.5 px-4 font-medium ${tokens.textPrimary}`}>
                    {t.subject}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        t.priority === 'urgent'
                          ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : t.priority === 'high'
                          ? 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                          : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${tokens.textSecondary}`}>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        t.status === 'resolved' || t.status === 'closed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : t.status === 'in_progress'
                          ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {t.status.replace('_', ' ')}
                    </span>
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
