import React, { useState } from 'react';
import {
  Truck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  MapPin,
  Building,
  User,
  Shield,
  CreditCard,
  Package,
  Layers,
  FileText,
  Search,
  Filter,
  Check,
  X,
} from 'lucide-react';
import { useAdminTheme } from '../theme/AdminThemeContext';
import { MoveSpecification, MoveStageKey } from '../../../types';

interface MovesTabProps {
  bookings: MoveSpecification[];
  selectedBooking: MoveSpecification | null;
  onSelectBooking: (b: MoveSpecification) => void;
  onUpdateStage: (bookingId: string, stage: MoveStageKey, notes: string) => Promise<void>;
  onToggleDelay: (bookingId: string, isDelayed: boolean, reason?: string, nextUpdate?: string) => Promise<void>;
}

export const MovesTab: React.FC<MovesTabProps> = ({
  bookings,
  selectedBooking,
  onSelectBooking,
  onUpdateStage,
  onToggleDelay,
}) => {
  const { isDark, tokens } = useAdminTheme();

  // Modal States
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<MoveStageKey>('destination_city_reached');
  const [stageNotes, setStageNotes] = useState('');
  const [isSubmittingStage, setIsSubmittingStage] = useState(false);

  const [delayModalOpen, setDelayModalOpen] = useState(false);
  const [delayReason, setDelayReason] = useState('Heavy monsoon rain causing waterlogging on highway NH-44');
  const [nextUpdate, setNextUpdate] = useState('Today at 6:00 PM');
  const [isSubmittingDelay, setIsSubmittingDelay] = useState(false);

  // Local filter
  const [filterStage, setFilterStage] = useState<'all' | 'active' | 'delayed' | 'completed'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (filterStage === 'active' && b.currentStage === 'move_completed') return false;
    if (filterStage === 'delayed' && !b.isDelayed) return false;
    if (filterStage === 'completed' && b.currentStage !== 'move_completed') return false;

    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        b.bookingId.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.origin.city.toLowerCase().includes(q) ||
        b.destination.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setIsSubmittingStage(true);
    await onUpdateStage(selectedBooking.bookingId, selectedStage, stageNotes);
    setIsSubmittingStage(false);
    setStageModalOpen(false);
    setStageNotes('');
  };

  const handleDelaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setIsSubmittingDelay(true);
    await onToggleDelay(selectedBooking.bookingId, true, delayReason, nextUpdate);
    setIsSubmittingDelay(false);
    setDelayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <h2 className={`text-lg font-black tracking-tight ${tokens.textHeading}`}>
            Move Specifications &amp; Lifecycle Operations
          </h2>
          <p className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
            Authoritative consignment records, GPS milestone tracking, fleet supervision, and delay alerts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-xs">
          {(['all', 'active', 'delayed', 'completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStage(st)}
              className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                filterStage === st
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Bookings List with Search */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by ID, name or city..."
              className={`w-full text-xs pl-8 pr-3 py-2 rounded-xl border ${
                tokens.inputBg
              } ${tokens.inputText} ${tokens.inputBorder}`}
            />
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredBookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => onSelectBooking(b)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? isDark
                        ? 'bg-blue-950/70 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                        : 'bg-blue-50/80 border-[#0B3B8A] shadow-md ring-1 ring-[#0B3B8A]/30'
                      : `${tokens.cardBg} ${tokens.borderDefault} hover:border-slate-400 dark:hover:border-slate-700`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-orange-600">
                        {b.bookingId}
                      </span>
                      <h4 className={`text-sm font-extrabold mt-1 ${tokens.textHeading}`}>
                        {b.customerName}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {b.movingDate}
                    </span>
                  </div>

                  <div className={`text-xs mt-2 font-medium ${tokens.textSecondary}`}>
                    {b.origin.city} → {b.destination.city}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span
                      className={`text-[10px] font-extrabold uppercase font-mono px-2 py-0.5 rounded ${
                        b.isDelayed
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : isDark
                          ? 'bg-blue-950 text-blue-300'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {b.currentStage.replace(/_/g, ' ')}
                    </span>
                    <span className={`font-mono font-bold ${tokens.textPrimary}`}>
                      ₹{b.pricing.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Authoritative Move Specification Detail */}
        <div className="lg:col-span-7">
          {selectedBooking ? (
            <div
              className={`p-6 rounded-2xl border space-y-6 ${
                tokens.cardBg
              } ${tokens.borderDefault} ${tokens.shadowCard}`}
            >
              {/* Header Info & Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-600 bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded">
                      {selectedBooking.bookingId}
                    </span>
                    <span className="text-xs uppercase font-extrabold text-blue-900 dark:text-blue-300">
                      {selectedBooking.moveType} Relocation
                    </span>
                  </div>
                  <h3 className={`text-xl font-black mt-1 ${tokens.textHeading}`}>
                    {selectedBooking.customerName}
                  </h3>
                  <div className={`text-xs mt-0.5 ${tokens.textSecondary}`}>
                    Phone: {selectedBooking.customerPhone} · Email: {selectedBooking.customerEmail}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedStage('destination_city_reached');
                      setStageModalOpen(true);
                    }}
                    className="btn-3d-orange h-9 px-4 text-xs font-bold cursor-pointer"
                  >
                    Advance Milestone
                  </button>

                  <button
                    onClick={() => {
                      if (selectedBooking.isDelayed) {
                        onToggleDelay(selectedBooking.bookingId, false);
                      } else {
                        setDelayModalOpen(true);
                      }
                    }}
                    className={`h-9 px-3.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      selectedBooking.isDelayed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {selectedBooking.isDelayed ? 'Clear Delay Flag' : 'Flag Delay'}
                  </button>
                </div>
              </div>

              {/* Active Milestone Status Card */}
              <div
                className={`p-4 rounded-xl border ${
                  selectedBooking.isDelayed
                    ? 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Consignment Milestone
                  </span>
                  <span className="font-mono text-orange-600">Move Date: {selectedBooking.movingDate}</span>
                </div>
                <div className={`text-lg font-black uppercase mt-1 ${isDark ? 'text-amber-300' : 'text-blue-950'}`}>
                  {selectedBooking.currentStage.replace(/_/g, ' ')}
                </div>
                {selectedBooking.isDelayed && (
                  <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 mt-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Delay Notice: {selectedBooking.delayReason}</span>
                  </div>
                )}
              </div>

              {/* Origin & Destination Physical Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className={`p-4 rounded-xl border ${tokens.cardBgSubtle} ${tokens.borderSubtle} space-y-1.5`}>
                  <div className="flex items-center gap-1.5 font-bold text-orange-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Pickup Address &amp; Access</span>
                  </div>
                  <p className={`font-semibold ${tokens.textPrimary}`}>
                    {selectedBooking.origin.address}, {selectedBooking.origin.city}
                  </p>
                  <div className={`text-[11px] space-y-0.5 ${tokens.textSecondary}`}>
                    <div>Floor: {selectedBooking.origin.floorNumber} ({selectedBooking.origin.hasLift ? 'Lift Available' : 'No Lift, Stair Carry'})</div>
                    <div>Truck Distance: {selectedBooking.origin.parkingDistanceMeters}m from gate</div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${tokens.cardBgSubtle} ${tokens.borderSubtle} space-y-1.5`}>
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                    <Building className="w-3.5 h-3.5" />
                    <span>Destination Access</span>
                  </div>
                  <p className={`font-semibold ${tokens.textPrimary}`}>
                    {selectedBooking.destination.address}, {selectedBooking.destination.city}
                  </p>
                  <div className={`text-[11px] space-y-0.5 ${tokens.textSecondary}`}>
                    <div>Floor: {selectedBooking.destination.floorNumber} ({selectedBooking.destination.hasLift ? 'Service Elevator' : 'Stairs'})</div>
                    <div>Society NOC: {selectedBooking.destination.societyPermissionRequired ? 'Required by RWA' : 'Direct Entry'}</div>
                  </div>
                </div>
              </div>

              {/* Assigned Staff & Fleet */}
              <div className={`p-4 rounded-xl border ${tokens.cardBgSubtle} ${tokens.borderSubtle} space-y-2`}>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Operational Logistics Assignments
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Move Manager</span>
                    <span className={`font-bold ${tokens.textPrimary}`}>
                      {selectedBooking.assignedStaff.moveManagerName || 'Vikram Joshi (HQ Lead)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Assigned Truck</span>
                    <span className={`font-bold font-mono text-orange-600`}>
                      {selectedBooking.assignedStaff.vehicleNumber || 'DL-01-AX-9912 (17ft Closed Container)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Packing Supervisor</span>
                    <span className={`font-bold ${tokens.textPrimary}`}>
                      {selectedBooking.assignedStaff.packingSupervisorName || 'Gurpreet Singh'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Status Summary */}
              <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${tokens.cardBgSubtle} ${tokens.borderSubtle}`}>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Total Agreed Fixed Amount</span>
                  <span className={`text-base font-black font-mono ${tokens.textHeading}`}>
                    ₹{selectedBooking.pricing.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Amount Received</span>
                  <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{selectedBooking.pricing.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Balance Due at Delivery</span>
                  <span className="text-base font-black font-mono text-orange-600">
                    ₹{selectedBooking.pricing.balanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-12 rounded-2xl border text-center text-slate-400 ${tokens.cardBg} ${tokens.borderDefault}`}>
              Select a booking from the list to view its authoritative move specification.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Transition Milestone */}
      {stageModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border ${tokens.modalBg} ${tokens.borderDefault} ${tokens.shadowModal} space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-extrabold ${tokens.textHeading}`}>
                Transition Move Milestone
              </h3>
              <button onClick={() => setStageModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-xs ${tokens.textSecondary}`}>
              Advance consignment <strong className="font-mono text-orange-600">{selectedBooking.bookingId}</strong> to the next operational phase.
            </p>

            <form onSubmit={handleStageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Select Milestone Stage</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value as any)}
                  className={`w-full text-xs p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                >
                  <option value="destination_city_reached">Destination City Reached</option>
                  <option value="destination_facility_received">Destination Hub Facility Received</option>
                  <option value="delivery_scheduled">Delivery Slot Scheduled</option>
                  <option value="out_for_delivery">Out For Door Delivery</option>
                  <option value="delivered">Delivered at Residence</option>
                  <option value="unpacking_reassembly">Unpacking &amp; Reassembly</option>
                  <option value="pod_completed">POD Signed &amp; Completed</option>
                  <option value="move_completed">Move Successfully Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Supervisor Milestone Log / Notes</label>
                <textarea
                  rows={3}
                  value={stageNotes}
                  onChange={(e) => setStageNotes(e.target.value)}
                  placeholder="e.g. Arrived at New Delhi South Hub. Container seal verified intact by Gurpreet Singh."
                  className={`w-full text-xs p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStageModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingStage}
                  className="btn-3d-orange px-5 py-2 text-xs font-bold"
                >
                  {isSubmittingStage ? 'Updating...' : 'Confirm Transition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Flag Delay */}
      {delayModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border ${tokens.modalBg} ${tokens.borderDefault} ${tokens.shadowModal} space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-rose-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Flag Consignment Delay</span>
              </h3>
              <button onClick={() => setDelayModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-xs ${tokens.textSecondary}`}>
              Broadcast transparent, accurate delay reason to the customer tracker without creating panic.
            </p>

            <form onSubmit={handleDelaySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Operational Reason for Delay</label>
                <input
                  type="text"
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Next Expected Update Time</label>
                <input
                  type="text"
                  value={nextUpdate}
                  onChange={(e) => setNextUpdate(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border ${tokens.inputBg} ${tokens.inputText} ${tokens.inputBorder}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDelayModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDelay}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
                >
                  {isSubmittingDelay ? 'Publishing...' : 'Publish Delay Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
