import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Phone,
  ShieldCheck,
  ChevronRight,
  Download,
  AlertCircle,
  Truck,
  PackageCheck,
  Home,
  Check,
} from 'lucide-react';
import { MoveSpecification, MoveStageRecord } from '../../types';
import { backend } from '../../services/backend';

interface TrackMoveViewProps {
  initialBookingId?: string;
  onClose?: () => void;
  onOpenCustomerPortal?: () => void;
}

export const TrackMoveView: React.FC<TrackMoveViewProps> = ({
  initialBookingId = 'DCM-2026-000123',
  onClose,
  onOpenCustomerPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialBookingId);
  const [booking, setBooking] = useState<MoveSpecification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'moveday' | 'inventory' | 'documents'>('timeline');

  const loadBooking = async (id: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await backend.getBookingById(id.trim());
      if (data) {
        setBooking(data);
      } else {
        setErrorMessage(`No move consignment found for booking reference "${id}". Please verify and try again.`);
        setBooking(null);
      }
    } catch (err) {
      setErrorMessage('Unable to retrieve tracking record at this time. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialBookingId) {
      loadBooking(initialBookingId);
    }
  }, [initialBookingId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadBooking(searchQuery);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Search Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              Track My Move Lifecycle
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Transparent, milestone-by-milestone consignment status. No continuous GPS anxiety — authoritative operational updates from your DCM moving team.
            </p>

            <form onSubmit={handleSearch} className="pt-3 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Booking ID (e.g. DCM-2026-000123)"
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-3d-orange text-xs sm:text-sm px-5 py-2.5 whitespace-nowrap"
              >
                {isLoading ? 'Searching...' : 'Track Move'}
              </button>
            </form>

            <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span>Try sample bookings:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('DCM-2026-000123');
                  loadBooking('DCM-2026-000123');
                }}
                className="text-orange-600 hover:underline font-mono font-bold"
              >
                DCM-2026-000123
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('DCM-2026-000124');
                  loadBooking('DCM-2026-000124');
                }}
                className="text-blue-600 hover:underline font-mono font-bold"
              >
                DCM-2026-000124
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Live Booking Record */}
        {booking && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header Card: Move Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                      {booking.bookingId}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                    {booking.origin.city} → {booking.destination.city}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Current Status</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      {booking.currentStage.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* CRITICAL: Section 39 Customer Action Required Banner */}
              {booking.customerActionRequired && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3 text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-bold text-xs uppercase tracking-wider text-amber-800">
                      Customer Action Required (Pending)
                    </div>
                    <p className="text-xs sm:text-sm mt-0.5 text-amber-900 font-medium">
                      {booking.customerActionRequired}
                    </p>
                  </div>
                </div>
              )}

              {/* Delayed Alert Banner (Section 38) */}
              {booking.isDelayed && (
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-start gap-3 text-red-900">
                  <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider text-red-700">
                      Consignment Temporarily Delayed
                    </div>
                    <p className="text-xs sm:text-sm mt-0.5 text-red-900 font-medium">
                      Reason: {booking.delayReason || 'Inclement highway weather / Traffic checkpost congestion'}
                    </p>
                  </div>
                </div>
              )}

              {/* Dedicated Move Manager Info (Section 50) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Dedicated Move Manager</div>
                    <div className="font-bold text-slate-900 text-xs">{booking.assignedStaff.moveManagerName || 'Vikram Joshi (Senior Coordinator)'}</div>
                    <a href="tel:+919888877777" className="text-orange-600 font-bold hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{booking.assignedStaff.moveManagerPhone || '+91 98888 77777'}</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-900 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Assigned Fleet Container</div>
                    <div className="font-bold text-slate-900 text-xs">{booking.assignedStaff.vehicleNumber || 'DL-01-AX-9912 (19ft Container)'}</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">Weather-Proof Air Sealed</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Payment Status</div>
                    <div className="font-bold text-slate-900 text-xs">
                      Paid: ₹{booking.pricing.paidAmount.toLocaleString()} / ₹{booking.pricing.totalAmount.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Balance Due: ₹{booking.pricing.balanceAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                18-Milestone Move Lifecycle
              </button>
              <button
                onClick={() => setActiveTab('moveday')}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'moveday'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Move Day &amp; Delivery Instructions
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Inventory &amp; Room Placement ({booking.inventory.length} items)
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'documents'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Consignment Documents &amp; POD
              </button>
            </div>

            {/* TAB 1: 18-Milestone Move Lifecycle */}
            {activeTab === 'timeline' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-blue-950">Shipment Milestone Timeline</h3>
                  <p className="text-xs text-slate-500">Every operational phase timestamped and verified by DCM personnel.</p>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                  {booking.stages.map((stage, idx) => {
                    const isCompleted = stage.status === 'completed';
                    const isCurrent = stage.status === 'current';
                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-xs transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 ring-4 ring-emerald-50'
                              : isCurrent
                              ? 'bg-orange-500 ring-4 ring-orange-100 animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        >
                          {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        {/* Content */}
                        <div className={`p-4 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-orange-50/40 border-orange-300 shadow-xs'
                            : isCompleted
                            ? 'bg-white border-slate-200'
                            : 'bg-slate-50/50 border-slate-100 opacity-60'
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className={`text-sm font-bold ${isCurrent ? 'text-orange-950' : 'text-slate-900'}`}>
                              {stage.label}
                            </h4>
                            {stage.completedAt && (
                              <span className="text-[11px] font-mono text-slate-500">
                                {new Date(stage.completedAt).toLocaleString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 mt-1">{stage.description}</p>

                          {stage.location && (
                            <div className="mt-2 text-[11px] font-semibold text-blue-900 flex items-center gap-1">
                              <Truck className="w-3 h-3 text-orange-500" />
                              <span>Checkpoint: {stage.location}</span>
                            </div>
                          )}

                          {stage.completedBy && (
                            <div className="mt-1 text-[10px] text-slate-400">
                              Verified by: {stage.completedBy}
                            </div>
                          )}

                          {isCurrent && stage.nextExpectedStep && (
                            <div className="mt-2 pt-2 border-t border-orange-200/60 text-xs font-semibold text-orange-700 flex items-center gap-1.5">
                              <span>Next Expected Step:</span>
                              <span className="text-slate-700 font-normal">{stage.nextExpectedStep}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Move Day & Delivery Day Mode (Sections 40, 41) */}
            {activeTab === 'moveday' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Move Day Mode (Pickup) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <h3 className="font-extrabold text-blue-950 text-base">Move Day (Pickup at Origin)</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Scheduled Date:</span>
                      <span className="font-bold text-slate-900">{booking.movingDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Pickup Address:</span>
                      <span className="font-bold text-slate-900 text-right max-w-xs">{booking.origin.address}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Floor &amp; Lift:</span>
                      <span className="font-bold text-slate-900">
                        {booking.origin.floorNumber === 0 ? 'Ground' : `${booking.origin.floorNumber} Floor`} ({booking.origin.hasLift ? 'Lift Available' : 'Stairs Only'})
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Packing Responsibility:</span>
                      <span className="font-bold text-orange-600 uppercase">{booking.packingPreference.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Supervisor on Site:</span>
                      <span className="font-bold text-slate-900">{booking.assignedStaff.packingSupervisorName || 'Gurpreet Singh'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 space-y-1">
                    <span className="font-bold block">Important Reminder for Customer:</span>
                    <span>Please keep jewelry, passports, cash, and laptop chargers with your personal luggage. Our crew does not transport negotiable instruments.</span>
                  </div>
                </div>

                {/* Delivery Day Mode (Destination) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <h3 className="font-extrabold text-blue-950 text-base">Delivery Day Mode (Destination)</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Destination Address:</span>
                      <span className="font-bold text-slate-900 text-right max-w-xs">{booking.destination.address}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Delivery Floor &amp; Lift:</span>
                      <span className="font-bold text-slate-900">
                        {booking.destination.floorNumber}th Floor ({booking.destination.hasLift ? 'Service Lift' : 'Stairs'})
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Setup Scope:</span>
                      <span className="font-bold text-blue-900 uppercase">{booking.destinationSetup.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Delivery Lead:</span>
                      <span className="font-bold text-slate-900">{booking.assignedStaff.deliveryLeadName || 'Manoj Yadav'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Society Gate NOC:</span>
                      <span className="font-bold text-amber-600">
                        {booking.destination.societyPermissionRequired ? 'Permission Required' : 'Open Entry'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-xl text-[11px] text-orange-950 space-y-1">
                    <span className="font-bold block">Room-Wise Placement:</span>
                    <span>Our delivery crew is instructed with room tags (Bedroom, Living Room, Kitchen). Items will be placed directly in designated rooms.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Inventory & Room Placement (Section 28) */}
            {activeTab === 'inventory' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-blue-950">Move Inventory Sheet</h3>
                    <p className="text-xs text-slate-500">Verified items with lifecycle status and room placement.</p>
                  </div>
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                    Total: {booking.inventory.length} items
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-semibold uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Room Tag</th>
                        <th className="py-2.5 px-3 text-center">Qty</th>
                        <th className="py-2.5 px-3">Current Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {booking.inventory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {item.name}
                            {item.isFragile && (
                              <span className="ml-2 text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                                Fragile
                              </span>
                            )}
                            {item.specialHandlingNotes && (
                              <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                                Note: {item.specialHandlingNotes}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-500">{item.category}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                              {item.roomPlacement}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                          <td className="py-3 px-3">
                            <span className="capitalize font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                              {item.lifecycleStatus.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Consignment Documents & POD (Sections 46, 47) */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
                <div>
                  <h3 className="text-base font-bold text-blue-950">Official Consignment Documentation</h3>
                  <p className="text-xs text-slate-500">Official digital records stored securely for your move.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Booking Confirmation & Agreement', type: 'PDF Document', date: booking.createdAt, size: '240 KB' },
                    { title: 'Approved Quotation Breakdown', type: 'PDF Document', date: booking.createdAt, size: '180 KB' },
                    { title: 'Packing Inventory Checklist', type: 'PDF Document', date: '2026-09-24', size: '310 KB' },
                    { title: 'Payment Advance Receipt #891', type: 'Payment Receipt', date: '2026-09-21', size: '120 KB' },
                    { title: 'Milestone Loading Receipt #904', type: 'Payment Receipt', date: '2026-09-24', size: '125 KB' },
                  ].map((doc, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{doc.title}</div>
                          <div className="text-[10px] text-slate-500">{doc.type} · {doc.size}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading verified copy of: ${doc.title}`)}
                        className="p-2 text-slate-600 hover:text-blue-900 rounded-lg hover:bg-slate-200/60"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* POD Section */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Digital Proof of Delivery (POD)</span>
                    <span className="text-[10px] text-slate-500">Generated upon destination inspection</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {booking.proofOfDelivery
                      ? `Signed by ${booking.proofOfDelivery.receiverName} on ${new Date(booking.proofOfDelivery.completedAt).toLocaleString()}`
                      : 'Proof of Delivery will be digitally signed on the DCM Staff App upon your inspection at the destination residence.'}
                  </p>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
