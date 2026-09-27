import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  UserPlus,
} from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { Lead } from '../../../types';

interface LeadsTabProps {
  leads: Lead[];
  onConvertLead?: (lead: Lead) => void;
}

export const LeadsTab: React.FC<LeadsTabProps> = ({ leads, onConvertLead }) => {
  const { isDark, tokens } = useAdminTheme();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const filtered = leads.filter((l) => {
    if (stageFilter !== 'all' && l.stage !== stageFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.originCity.toLowerCase().includes(q) ||
        l.destinationCity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            CRM Leads &amp; Inquiry Pipeline
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Incoming inquiries from website quote calculator, direct WhatsApp, and phone hotlines.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border ${
                tokens.inputBg
              } ${tokens.inputText} ${tokens.inputBorder}`}
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className={`text-xs py-1.5 px-3 rounded-xl border font-semibold ${
              tokens.inputBg
            } ${tokens.inputText} ${tokens.inputBorder}`}
          >
            <option value="all">All Stages</option>
            <option value="new">New Inquiries</option>
            <option value="contacted">Contacted</option>
            <option value="survey_scheduled">Survey Scheduled</option>
            <option value="quote_sent">Quote Sent</option>
            <option value="confirmed">Confirmed</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Phone &amp; Email</th>
                <th className="py-3 px-4">Moving Route</th>
                <th className="py-3 px-4">Move Date</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4">Assigned Sales</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {filtered.map((l) => (
                <tr key={l.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{l.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      {l.moveType.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-700 dark:text-slate-300 font-medium">{l.phone}</div>
                    <div className="text-[10px] text-slate-400">{l.email}</div>
                  </td>
                  <td className={`py-3.5 px-4 ${tokens.textSecondary}`}>
                    <span className="font-medium">{l.originCity}</span>
                    <span className="text-slate-400 mx-1">→</span>
                    <span className="font-medium">{l.destinationCity}</span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textSecondary}`}>
                    {l.movingDate}
                  </td>
                  <td className={`py-3.5 px-4 ${tokens.textSecondary}`}>
                    {l.approxVolume}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        l.stage === 'confirmed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : l.stage === 'new'
                          ? 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                          : isDark
                          ? 'bg-blue-950 border-blue-800 text-blue-300'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}
                    >
                      {l.stage.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-medium ${tokens.textPrimary}`}>
                    {l.assignedTo || 'Priya Mehra (Sales)'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`tel:${l.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline mr-2"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
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
