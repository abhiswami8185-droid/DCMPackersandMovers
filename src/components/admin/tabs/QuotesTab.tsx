import React, { useState } from 'react';
import { FileText, Search, Download, CheckCircle, Clock, Eye, X } from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { Quotation } from '../../../types';

interface QuotesTabProps {
  quotes: Quotation[];
}

export const QuotesTab: React.FC<QuotesTabProps> = ({ quotes }) => {
  const { isDark, tokens } = useAdminTheme();
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [search, setSearch] = useState('');

  const filtered = quotes.filter((q) => {
    if (search) {
      const s = search.toLowerCase();
      return (
        q.quoteNumber.toLowerCase().includes(s) ||
        q.customerName.toLowerCase().includes(s) ||
        q.originCity.toLowerCase().includes(s) ||
        q.destinationCity.toLowerCase().includes(s)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Quotations &amp; Pricing Engine
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Generated move estimates, margin calculations, GST itemization, and validity schedules.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotations..."
            className={`w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border ${
              tokens.inputBg
            } ${tokens.inputText} ${tokens.inputBorder}`}
          />
        </div>
      </div>

      {/* Quotes Table */}
      <div className={`rounded-2xl border ${tokens.cardBg} ${tokens.borderDefault} ${tokens.shadowCard} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[11px] font-extrabold tracking-wider ${tokens.tableHeaderBg} ${tokens.textSecondary} border-b ${tokens.borderSubtle}`}>
              <tr>
                <th className="py-3 px-4">Quote Number</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Route (Km)</th>
                <th className="py-3 px-4">Move Date</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Fixed Amount</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${tokens.borderSubtle}`}>
              {filtered.map((q) => (
                <tr key={q.id} className={`transition-colors ${tokens.tableRowHoverBg}`}>
                  <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                    {q.quoteNumber}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${tokens.textPrimary}`}>
                    <div>{q.customerName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{q.customerPhone}</span>
                  </td>
                  <td className={`py-3.5 px-4 ${tokens.textSecondary}`}>
                    <span className="font-medium">{q.originCity} → {q.destinationCity}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{q.approxDistanceKm} km</div>
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textSecondary}`}>{q.movingDate}</td>
                  <td className={`py-3.5 px-4 font-mono ${tokens.textSecondary}`}>{q.estimatedVolumeCft} CFT</td>
                  <td className={`py-3.5 px-4 font-mono font-bold ${tokens.textHeading}`}>
                    ₹{q.pricing.totalAmount.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${tokens.textSecondary}`}>{q.validityDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border font-mono ${
                        q.status === 'accepted' || q.status === 'booked'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : q.status === 'sent'
                          ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {q.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedQuote(q)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Breakdown</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Breakdown Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`max-w-lg w-full p-6 rounded-2xl border ${tokens.modalBg} ${tokens.borderDefault} ${tokens.shadowModal} space-y-4`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-orange-600">{selectedQuote.quoteNumber}</span>
                <h3 className={`text-base font-extrabold ${tokens.textHeading}`}>Itemized Price Specification</h3>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>Base Dedicated Container Transportation</span>
                <span className="font-mono font-bold">₹{selectedQuote.pricing.baseTransportation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>4-Layer Professional Packing Charges</span>
                <span className="font-mono font-bold">₹{selectedQuote.pricing.packingCharges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>Loading &amp; Unloading Teams</span>
                <span className="font-mono font-bold">₹{(selectedQuote.pricing.loadingCharges + selectedQuote.pricing.unloadingCharges).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>Furniture Dismantling &amp; Reassembly</span>
                <span className="font-mono font-bold">₹{(selectedQuote.pricing.dismantlingCharges + selectedQuote.pricing.reassemblyCharges).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>All-Risk Transit Insurance Coverage</span>
                <span className="font-mono font-bold">₹{selectedQuote.pricing.transitInsurance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className={tokens.textSecondary}>Applicable GST (18% Logistics Standard)</span>
                <span className="font-mono font-bold">₹{selectedQuote.pricing.gstAmount.toLocaleString()}</span>
              </div>
              <div className={`flex justify-between pt-2 text-sm font-black ${tokens.textHeading}`}>
                <span>Total Guaranteed Fixed Pricing</span>
                <span className="font-mono text-orange-600">₹{selectedQuote.pricing.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedQuote(null)}
                className="btn-3d-orange px-4 py-2 text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
