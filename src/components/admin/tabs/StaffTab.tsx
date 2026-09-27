import React from 'react';
import { ShieldCheck, User, Phone, Mail, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { UserProfile } from '../../../types';

interface StaffTabProps {
  staffUsers: UserProfile[];
  onToggleActive: (userId: string, currentActive: boolean) => Promise<void>;
}

export const StaffTab: React.FC<StaffTabProps> = ({ staffUsers, onToggleActive }) => {
  const { isDark, tokens } = useAdminTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Staff Directory &amp; Role-Based Access Control (RBAC)
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Operational role permissions: Super Admin, Operations Manager, Surveyors, Packing Supervisors, and Accounts.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Staff Name</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Service Area Hub</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {staffUsers.map((u) => (
                <tr key={u.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#0B3B8A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        u.role === 'super_admin' || u.role === 'admin'
                          ? 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                          : isDark
                          ? 'bg-blue-950 border-blue-800 text-blue-300'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}
                    >
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-medium ${tokens.textSecondary}`}>
                    {u.serviceArea || 'Chandigarh & Mohali Hubs'}
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textSecondary}`}>
                    {u.phone}
                  </td>
                  <td className={`py-3.5 px-4 ${tokens.textSecondary}`}>
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        u.isActive
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      <span>{u.isActive ? 'ACTIVE' : 'INACTIVE'}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onToggleActive(u.id, u.isActive)}
                      className={`text-xs font-bold underline cursor-pointer ${
                        u.isActive
                          ? 'text-slate-500 hover:text-rose-600'
                          : 'text-emerald-600 hover:text-emerald-700'
                      }`}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
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
