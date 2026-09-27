import React, { useState, useEffect } from 'react';
import {
  FileText,
  Truck,
  CreditCard,
  LifeBuoy,
  ShieldAlert,
  Phone,
  MessageSquare,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  User,
  AlertCircle,
} from 'lucide-react';
import {
  DamageClaim,
  MoveSpecification,
  PaymentTransaction,
  Quotation,
  SupportTicket,
  UserProfile,
} from '../../types';
import { backend } from '../../services/backend';

interface CustomerPortalProps {
  onOpenTrackerForBooking: (bookingId: string) => void;
  onOpenQuoteWizard: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onOpenTrackerForBooking,
  onOpenQuoteWizard,
}) => {
  const [activeTab, setActiveTab] = useState<'moves' | 'quotes' | 'payments' | 'support' | 'claims'>('moves');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<MoveSpecification[]>([]);
  const [quotes, setQuotes] = useState<Quotation[]>([]);
  const [tickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [claims, setClaims] = useState<DamageClaim[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  // Support Ticket Form State
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket['category']>('Tracking');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');

  // Claim Form State
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [claimBookingId, setClaimBookingId] = useState('DCM-2026-000123');
  const [claimItemDesc, setClaimItemDesc] = useState('');
  const [claimAmount, setClaimAmount] = useState(1500);

  // Change Request Modal
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [selectedQuoteForChange, setSelectedQuoteForChange] = useState<Quotation | null>(null);
  const [changeNotes, setChangeNotes] = useState('');
  const [changeCost, setChangeCost] = useState(2500);

  // Payment Modal
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBookingForPay, setSelectedBookingForPay] = useState<MoveSpecification | null>(null);
  const [payAmount, setPayAmount] = useState(10000);
  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'net_banking' | 'razorpay'>('upi');

  const loadData = async () => {
    const user = await backend.getCurrentUser();
    setCurrentUser(user);
    const b = await backend.getBookings();
    setBookings(b);
    const q = await backend.getQuotes();
    setQuotes(q);
    const t = await backend.getSupportTickets();
    setSupportTickets(t);
    const c = await backend.getClaims();
    setClaims(c);
    if (b.length > 0) {
      const p = await backend.getPaymentsByBooking(b[0].bookingId);
      setPayments(p);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject || !newTicketMessage) return;

    await backend.createSupportTicket({
      bookingId: bookings[0]?.bookingId || 'DCM-2026-000123',
      customerName: currentUser?.name || 'Rahul Swami',
      customerEmail: currentUser?.email || 'rahul.swami8185@gmail.com',
      customerPhone: currentUser?.phone || '+91 98765 43210',
      category: newTicketCategory,
      subject: newTicketSubject,
      priority: 'medium',
      status: 'open',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          senderName: currentUser?.name || 'Customer',
          text: newTicketMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    setNewTicketSubject('');
    setNewTicketMessage('');
    setShowNewTicketModal(false);
    loadData();
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimItemDesc) return;

    await backend.submitDamageClaim({
      bookingId: claimBookingId,
      customerName: currentUser?.name || 'Rahul Swami',
      customerPhone: currentUser?.phone || '+91 98765 43210',
      itemDescription: claimItemDesc,
      estimatedClaimAmount: Number(claimAmount),
      photos: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'],
    });

    setClaimItemDesc('');
    setShowNewClaimModal(false);
    loadData();
  };

  const handleProcessPayment = async () => {
    if (!selectedBookingForPay) return;

    await backend.recordPayment({
      bookingId: selectedBookingForPay.bookingId,
      receiptNumber: `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: Number(payAmount),
      type: 'milestone',
      method: payMethod,
      status: 'paid',
      transactionRef: `RZP_LIVE_${Date.now()}`,
      notes: 'Customer portal online payment',
    });

    setShowPayModal(false);
    loadData();
  };

  const handleApproveQuote = async (quoteId: string) => {
    await backend.updateQuoteStatus(quoteId, 'accepted');
    loadData();
  };

  const handleSubmitChangeRequest = async () => {
    if (!selectedQuoteForChange || !changeNotes) return;
    await backend.createChangeRequest(selectedQuoteForChange.id, changeNotes, Number(changeCost));
    setShowChangeRequestModal(false);
    setChangeNotes('');
    loadData();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Customer Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-900 to-blue-800 text-white font-black text-xl flex items-center justify-center shadow-md">
              {currentUser?.name?.charAt(0) || 'R'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-blue-950">
                  {currentUser?.name || 'Customer Account'}
                </h1>
                <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Customer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser?.email} · {currentUser?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuoteWizard}
              className="btn-3d-orange text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Move</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'moves', label: 'My Bookings & Active Moves', icon: Truck },
            { id: 'quotes', label: 'My Quotations', icon: FileText },
            { id: 'payments', label: 'Payments & Receipts', icon: CreditCard },
            { id: 'support', label: 'Support Tickets', icon: LifeBuoy },
            { id: 'claims', label: 'Damage & Missing Claims', icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: My Bookings & Active Moves */}
        {activeTab === 'moves' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3">
                <Truck className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700">No active moves found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Ready to move? Generate an instant quotation with item-level accuracy.
                </p>
                <button onClick={onOpenQuoteWizard} className="btn-3d-orange text-xs px-5 py-2">
                  Get Move Estimate
                </button>
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded">
                          {b.bookingId}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Moving Date: {b.movingDate}
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-blue-950 mt-1">
                        {b.origin.city} → {b.destination.city} ({b.moveType.toUpperCase()})
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenTrackerForBooking(b.bookingId)}
                        className="btn-3d-navy text-xs px-4 py-2 flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-orange-400" />
                        <span>Open Live Tracker</span>
                      </button>
                      {b.pricing.balanceAmount > 0 && (
                        <button
                          onClick={() => {
                            setSelectedBookingForPay(b);
                            setPayAmount(Math.min(b.pricing.balanceAmount, 10000));
                            setShowPayModal(true);
                          }}
                          className="btn-3d-orange text-xs px-4 py-2"
                        >
                          Pay Due (₹{b.pricing.balanceAmount.toLocaleString()})
                        </button>
                      )}
                    </div>
                  </div>

                  {b.customerActionRequired && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{b.customerActionRequired}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Current Phase</span>
                      <span className="font-bold text-blue-900 capitalize">{b.currentStage.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Total Cost</span>
                      <span className="font-bold text-slate-900 font-mono">₹{b.pricing.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Paid Amount</span>
                      <span className="font-bold text-emerald-600 font-mono">₹{b.pricing.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block font-semibold">Move Manager</span>
                      <span className="font-bold text-slate-900">{b.assignedStaff.moveManagerName?.split(' ')[0] || 'Vikram'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: My Quotations (Sections 34, 35) */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                        {q.quoteNumber}
                      </span>
                      {q.isChangeRequest && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          Change Request Revision #{q.revisionNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="font-black text-slate-900 text-base mt-1">
                      {q.originCity} → {q.destinationCity} (Moving Date: {q.movingDate})
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                      q.status === 'booked' || q.status === 'accepted'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : q.status === 'change_requested'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {q.status.replace('_', ' ')}
                    </span>

                    {q.status === 'sent' && (
                      <>
                        <button
                          onClick={() => handleApproveQuote(q.id)}
                          className="btn-3d-orange text-xs px-3.5 py-1.5"
                        >
                          Accept Quote
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuoteForChange(q);
                            setShowChangeRequestModal(true);
                          }}
                          className="btn-3d-navy text-xs px-3.5 py-1.5"
                        >
                          Request Change
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {q.changeRequestNotes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <span className="font-bold">Requested Modification:</span> {q.changeRequestNotes}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Fixed Price</span>
                    <span className="font-bold text-orange-600 font-mono text-sm">₹{q.pricing.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">Included GST (18%)</span>
                    <span className="font-bold text-slate-800 font-mono">₹{q.pricing.gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">Advance Token (20%)</span>
                    <span className="font-bold text-slate-800 font-mono">₹{q.paymentSchedule.advanceDue.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block font-semibold">Quote Validity</span>
                    <span className="font-bold text-slate-800">{q.validityDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Payments & Receipts (Section 45) */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-blue-950">Payment Transactions &amp; Receipts</h3>
                <p className="text-xs text-slate-500">Every advance, milestone and delivery payment recorded with receipt.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-2 px-3">Receipt #</th>
                    <th className="py-2 px-3">Booking ID</th>
                    <th className="py-2 px-3">Payment Type</th>
                    <th className="py-2 px-3">Method / Gateway</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-blue-950">{p.receiptNumber}</td>
                      <td className="py-3 px-3 font-mono text-orange-600 font-semibold">{p.bookingId}</td>
                      <td className="py-3 px-3 capitalize">{p.type}</td>
                      <td className="py-3 px-3 uppercase text-slate-500">{p.method}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">₹{p.amount.toLocaleString()}</td>
                      <td className="py-3 px-3 text-slate-500">{new Date(p.paidAt).toLocaleDateString()}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          PAID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Support Tickets (Section 49) */}
        {activeTab === 'support' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-base text-blue-950">Customer Support Tickets</h3>
                <p className="text-xs text-slate-500">Fast assistance from your move coordinator and support staff.</p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="btn-3d-orange text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Open New Ticket</span>
              </button>
            </div>

            {tickets.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-blue-50 text-blue-900 px-2 py-0.5 rounded">
                      {t.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{t.subject}</h4>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                    t.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {t.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2">
                  {t.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl text-xs max-w-lg ${
                        m.sender === 'customer'
                          ? 'bg-slate-100 text-slate-800 ml-auto'
                          : 'bg-blue-50 text-blue-900 border border-blue-200 mr-auto'
                      }`}
                    >
                      <div className="font-bold text-[10px] text-slate-500 mb-0.5">
                        {m.senderName} · {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <p>{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Damage Claims (Section 48) */}
        {activeTab === 'claims' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-base text-blue-950">Transit Damage &amp; Missing Item Claims</h3>
                <p className="text-xs text-slate-500">
                  DCM Comprehensive Transit Protection. Submit claim with photos for surveyor investigation.
                </p>
              </div>
              <button
                onClick={() => setShowNewClaimModal(true)}
                className="btn-3d-orange text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Damage Claim</span>
              </button>
            </div>

            {claims.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {c.claimNumber}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">Booking: {c.bookingId}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase border border-amber-200">
                    {c.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  <span className="font-bold">Description: </span>
                  {c.itemDescription}
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Estimated Claim: ₹{c.estimatedClaimAmount.toLocaleString()}</span>
                  {c.approvedSettlementAmount && (
                    <span className="font-bold text-emerald-600">
                      Approved Settlement: ₹{c.approvedSettlementAmount.toLocaleString()}
                    </span>
                  )}
                </div>

                {c.adminDecisionNotes && (
                  <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                    <span className="font-bold text-slate-800">Review Notes: </span>
                    {c.adminDecisionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL: New Support Ticket */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-blue-950">Open Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={newTicketCategory}
                  onChange={(e) => setNewTicketCategory(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                >
                  <option value="Booking">Booking &amp; Scheduling</option>
                  <option value="Tracking">Move Tracking</option>
                  <option value="Delivery">Delivery &amp; Placement</option>
                  <option value="Payment">Payment &amp; Invoices</option>
                  <option value="Packing">Packing Materials</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
                <input
                  type="text"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="Brief summary of request"
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Message Details</label>
                <textarea
                  rows={4}
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Explain your inquiry in detail..."
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-3d-orange px-4 py-2 text-xs">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Submit Damage Claim */}
      {showNewClaimModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-blue-950">File Transit Damage / Missing Claim</h3>
            <form onSubmit={handleSubmitClaim} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Booking Reference</label>
                <input
                  type="text"
                  value={claimBookingId}
                  onChange={(e) => setClaimBookingId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Item Description &amp; Defect</label>
                <textarea
                  rows={3}
                  value={claimItemDesc}
                  onChange={(e) => setClaimItemDesc(e.target.value)}
                  placeholder="e.g. Scratched mirror on master bedroom dressing table during unloading..."
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated Claim / Repair (₹)</label>
                <input
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
                  required
                />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
                <Upload className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Damage photos will be saved to secure Firebase Storage with booking timestamp.</span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewClaimModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-3d-orange px-4 py-2 text-xs">
                  Register Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Pay Milestone / Advance */}
      {showPayModal && selectedBookingForPay && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-blue-950">Pay Move Due Amount</h3>
            <p className="text-xs text-slate-500">
              Instant Indian Payment Gateway (Razorpay UPI / Cards / NetBanking).
            </p>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-blue-950">{selectedBookingForPay.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Outstanding Balance:</span>
                <span className="font-bold text-orange-600 font-mono">
                  ₹{selectedBookingForPay.pricing.balanceAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full text-sm font-bold p-2.5 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['upi', 'card', 'net_banking', 'razorpay'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayMethod(method as any)}
                    className={`p-2 rounded-lg border uppercase font-bold text-center ${
                      payMethod === method ? 'bg-blue-900 text-white border-blue-900' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {method.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessPayment}
                className="btn-3d-orange px-5 py-2 text-xs"
              >
                Pay ₹{payAmount.toLocaleString()} Securely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Quote Change Request (Section 35) */}
      {showChangeRequestModal && selectedQuoteForChange && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-blue-950">Request Quotation Revision</h3>
            <p className="text-xs text-slate-500">
              Add or remove items. A revised quote version will be generated without silently altering original numbers.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Additional Items / Scope Change</label>
              <textarea
                rows={3}
                value={changeNotes}
                onChange={(e) => setChangeNotes(e.target.value)}
                placeholder="e.g. Added 1 extra wardrobe and 4 book cartons..."
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Estimated Additional Cost (₹)</label>
              <input
                type="number"
                value={changeCost}
                onChange={(e) => setChangeCost(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowChangeRequestModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitChangeRequest}
                className="btn-3d-navy px-4 py-2 text-xs"
              >
                Submit Change Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
