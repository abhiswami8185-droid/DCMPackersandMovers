import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Clock, AlertTriangle, FileText, X } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { DamageClaim } from '../../../types';

interface ClaimsTabProps {
  claims: DamageClaim[];
  onUpdateClaim: (claimId: string, status: DamageClaim['status'], notes: string, amount: number) => Promise<void>;
}

export const ClaimsTab: React.FC<ClaimsTabProps> = ({ claims, onUpdateClaim }) => {
  const { isDark, tokens } = useAdminTheme();
  const [selectedClaim, setSelectedClaim] = useState<DamageClaim | null>(null);
  const [decisionStatus, setDecisionStatus] = useState<DamageClaim['status']>('settled');
  const [settlementAmount, setSettlementAmount] = useState<number>(1500);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenDecision = (c: DamageClaim) => {
    setSelectedClaim(c);
    setSettlementAmount(c.approvedSettlementAmount || c.estimatedClaimAmount);
    setDecisionNotes(c.adminDecisionNotes || 'Claim assessed against pre-move survey photos. Approved transit insurance settlement.');
  };

  const handleSubmitDecision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaim) return;
    setIsSubmitting(true);
    await onUpdateClaim(selectedClaim.id, decisionStatus, decisionNotes, settlementAmount);
    setIsSubmitting(false);
    setSelectedClaim(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Goods Transit Insurance &amp; Damage Claims
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Customer claim submissions, photographic inspection verification, pre-move survey comparisons, and settlement disbursements.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Claim Ref</th>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Damaged Item Description</th>
                <th className="py-3 px-4">Claimed Value</th>
                <th className="py-3 px-4">Settlement</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {claims.map((c) => (
                <tr key={c.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                    {c.claimNumber}
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textPrimary}`}>
                    {c.bookingId}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{c.customerName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{c.customerPhone}</span>
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs ${tokens.textSecondary}`}>
                    <p className="line-clamp-2">{c.itemDescription}</p>
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-bold ${tokens.textHeading}`}>
                    ₹{c.estimatedClaimAmount.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400`}>
                    {c.approvedSettlementAmount ? `₹${c.approvedSettlementAmount.toLocaleString()}` : 'Under Review'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        c.status === 'settled'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : c.status === 'rejected'
                          ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenDecision(c)}
                      className="btn-3d-orange h-7 px-3 text-[11px] font-bold"
                    >
                      Review &amp; Settle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border ${tokens.modalBg} ${tokens.borderDefault} ${tokens.shadowModal} space-y-4`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-orange-600">{selectedClaim.claimNumber}</span>
                <h3 className={`text-base font-extrabold ${tokens.textHeading}`}>Transit Claim Decision</h3>
              </div>
              <button onClick={() => setSelectedClaim(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-3 rounded-xl text-xs space-y-1 ${tokens.cardBgSubtle} border ${tokens.borderSubtle}`}>
              <div className="font-bold text-slate-700 dark:text-slate-300">Customer: {selectedClaim.customerName}</div>
              <div className="text-slate-500">Item: {selectedClaim.itemDescription}</div>
              <div className="font-mono font-bold text-orange-600">Claimed: ₹{selectedClaim.estimatedClaimAmount.toLocaleString()}</div>
            </div>

            <form onSubmit={handleSubmitDecision} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Decision Status</label>
                <select
                  value={decisionStatus}
                  onChange={(e) => setDecisionStatus(e.target.value as any)}
                  className={`w-full p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                >
                  <option value="settled">Approve Settlement</option>
                  <option value="investigation">Require Surveyor Re-Inspection</option>
                  <option value="rejected">Reject Claim</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Settlement Compensation Amount (₹)</label>
                <input
                  type="number"
                  value={settlementAmount}
                  onChange={(e) => setSettlementAmount(Number(e.target.value))}
                  className={`w-full p-2.5 rounded-xl border font-mono font-bold ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Assessment Notes</label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedClaim(null)}
                  className="px-4 py-2 font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-3d-orange px-5 py-2 font-bold"
                >
                  {isSubmitting ? 'Recording...' : 'Publish Decision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
