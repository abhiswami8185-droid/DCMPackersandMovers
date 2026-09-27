import React from 'react';
import { History, Shield, Clock, FileText, User } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { AuditLog } from '../../../types';

interface AuditTabProps {
  auditLogs: AuditLog[];
}

export const AuditTab: React.FC<AuditTabProps> = ({ auditLogs }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Immutable Security Audit Trail
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Append-only verification ledger recording move milestone transitions, pricing revisions, delay notices, and staff permission alterations.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Timestamp (UTC/IST)</th>
                <th className="py-3 px-4">Authorized Actor</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Entity ID</th>
                <th className="py-3 px-4">Operational Details &amp; Change Notes</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {auditLogs.map((log) => (
                <tr key={log.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className={`py-3.5 px-4 font-mono text-[11px] whitespace-nowrap ${tokens.textSecondary}`}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{log.actorName}</div>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      ({log.actorRole.replace(/_/g, ' ')})
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-orange-600 font-bold uppercase text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    {log.entityId}
                  </td>
                  <td className={`py-3.5 px-4 ${tokens.textSecondary} text-xs`}>
                    {log.details}
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
