import React from 'react';
import { CreditCard, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { PaymentTransaction } from '../../../types';

interface PaymentsTabProps {
  payments: PaymentTransaction[];
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({ payments }) => {
  const { isDark, tokens } = useAdminTheme();

  const totalCaptured = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Payments &amp; Milestone Billing Ledger
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Token advance deposits, pre-transit loading milestones, and digital POD balance collections.
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${tokens.cardBg} ${tokens.borderDefault}`}>
          <span className="text-xs text-slate-400">Total Captured:</span>
          <span className={`text-sm font-black font-mono ${tokens.textHeading}`}>
            ₹{totalCaptured.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Receipt Ref</th>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Milestone Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method / Gateway</th>
                <th className="py-3 px-4">Gateway Txn Ref</th>
                <th className="py-3 px-4">Paid Timestamp</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {payments.map((p) => (
                <tr key={p.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                    {p.receiptNumber}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-medium ${tokens.textPrimary}`}>
                    {p.bookingId}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold capitalize">{p.type.replace('_', ' ')}</span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-black ${tokens.textHeading}`}>
                    ₹{p.amount.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 uppercase font-bold text-[11px] ${tokens.textSecondary}`}>
                    {p.method.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {p.transactionRef}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${tokens.textSecondary}`}>
                    {new Date(p.paidAt).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        p.status === 'paid'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {p.status === 'paid' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      <span>{p.status}</span>
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
