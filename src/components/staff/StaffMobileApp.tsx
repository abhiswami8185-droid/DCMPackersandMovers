import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  CheckCircle2,
  Camera,
  MapPin,
  Phone,
  Layers,
  Wrench,
  Clock,
  Wifi,
  WifiOff,
  User,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  Smartphone,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { MoveSpecification, MoveStageKey, UserRole } from '../../types';
import { backend } from '../../services/backend';

interface StaffMobileAppProps {
  onExitStaffApp: () => void;
}

export const StaffMobileApp: React.FC<StaffMobileAppProps> = ({ onExitStaffApp }) => {
  const [staffRole, setStaffRole] = useState<'packing_supervisor' | 'delivery_staff' | 'surveyor'>('packing_supervisor');
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueuedCount, setOfflineQueuedCount] = useState(0);

  const [bookings, setBookings] = useState<MoveSpecification[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<MoveSpecification | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [photoMode, setPhotoMode] = useState<'packing' | 'condition' | 'loading' | 'delivery'>('packing');

  // Digital POD State (Signature & Receiver)
  const [receiverName, setReceiverName] = useState('Rahul Swami');
  const [receiverPhone, setReceiverPhone] = useState('+91 98765 43210');
  const [receiverRelation, setReceiverRelation] = useState<'Self' | 'Family Member' | 'Colleague'>('Self');
  const [otpCode, setOtpCode] = useState('8021');
  const [signatureDone, setSignatureDone] = useState(false);
  const [showPodModal, setShowPodModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const loadData = async () => {
    const list = await backend.getBookings();
    setBookings(list);
    if (list.length > 0 && !selectedBooking) {
      setSelectedBooking(list[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdvanceTask = async (nextStage: MoveStageKey, taskLabel: string) => {
    if (!selectedBooking) return;

    if (isOffline) {
      setOfflineQueuedCount((prev) => prev + 1);
      // Optimistically update local booking stage
      setSelectedBooking({
        ...selectedBooking,
        currentStage: nextStage,
      });
      return;
    }

    const staffName = staffRole === 'packing_supervisor' ? 'Gurpreet Singh (Supervisor)' : 'Manoj Yadav (Delivery Lead)';
    await backend.updateMoveStage(selectedBooking.bookingId, nextStage, taskLabel, staffName);
    const updated = await backend.getBookingById(selectedBooking.bookingId);
    setSelectedBooking(updated);
    loadData();
  };

  const handleSimulatePhoto = () => {
    const sampleUrls = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    ];
    const picked = sampleUrls[capturedPhotos.length % sampleUrls.length];
    setCapturedPhotos((prev) => [...prev, picked]);
  };

  // Canvas drawing for POD signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0B3B8A';
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setSignatureDone(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDone(false);
  };

  const handleCompletePod = async () => {
    if (!selectedBooking) return;
    setIsSubmitting(true);

    const podData = {
      receiverName,
      receiverPhone,
      receiverRelation,
      otpCodeVerified: true,
      signatureDataUrl: 'data:image/svg+xml;utf8,<svg>Verified Signature</svg>',
      deliveryPhotos: capturedPhotos,
      itemConditionApproved: true,
      customerRemarks: 'All 48 boxes and furniture delivered and placed room-wise in sound condition.',
      completedAt: new Date().toISOString(),
      deliveryStaffName: 'Manoj Yadav (DCM Lead)',
    };

    await backend.completeDigitalPOD(selectedBooking.bookingId, podData);
    setIsSubmitting(false);
    setShowPodModal(false);
    const updated = await backend.getBookingById(selectedBooking.bookingId);
    setSelectedBooking(updated);
    loadData();
  };

  const syncOfflineQueue = () => {
    setOfflineQueuedCount(0);
    setIsOffline(false);
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6">
      
      {/* Top Mobile Simulation Controls Bar */}
      <div className="w-full max-w-md mb-4 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-orange-400" />
          <span className="font-bold text-white">Staff App (Flutter UI)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Offline simulator toggle (Section 57) */}
          <button
            onClick={() => {
              if (isOffline && offlineQueuedCount > 0) {
                syncOfflineQueue();
              } else {
                setIsOffline(!isOffline);
              }
            }}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
              isOffline
                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle offline mode simulation"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffline ? `Offline (${offlineQueuedCount} queued)` : 'Online'}</span>
          </button>

          <button
            onClick={onExitStaffApp}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white font-semibold"
          >
            Exit App
          </button>
        </div>
      </div>

      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md bg-slate-900 rounded-[36px] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[85vh] relative">
        
        {/* Mobile Header / Notch */}
        <div className="bg-slate-950 px-5 pt-3 pb-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center">
              DCM
            </div>
            <div>
              <div className="text-xs font-black text-white">Field Operations</div>
              <div className="text-[10px] text-slate-400 capitalize">
                {staffRole.replace('_', ' ')}
              </div>
            </div>
          </div>

          {/* Role switcher inside staff app */}
          <select
            value={staffRole}
            onChange={(e) => setStaffRole(e.target.value as any)}
            className="bg-slate-800 text-white rounded px-2 py-0.5 text-[10px] font-bold border border-slate-700 focus:outline-none"
          >
            <option value="packing_supervisor">Packing Supervisor (Gurpreet)</option>
            <option value="delivery_staff">Delivery Lead (Manoj)</option>
            <option value="surveyor">Surveyor (Amit)</option>
          </select>
        </div>

        {/* Offline Banner if Active (Section 57) */}
        {isOffline && (
          <div className="bg-amber-950/90 border-b border-amber-800 px-4 py-1.5 text-[11px] text-amber-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span>Offline Mode: Data saved locally</span>
            </span>
            {offlineQueuedCount > 0 && (
              <button
                onClick={syncOfflineQueue}
                className="text-[10px] font-bold uppercase underline text-amber-300"
              >
                Sync Now ({offlineQueuedCount})
              </button>
            )}
          </div>
        )}

        {/* Mobile Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {selectedBooking ? (
            <div className="space-y-4">
              
              {/* Job Summary Card (Section 54) */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded">
                      {selectedBooking.bookingId}
                    </span>
                    <h2 className="text-base font-extrabold text-white mt-1">
                      {selectedBooking.customerName}
                    </h2>
                  </div>
                  <a
                    href={`tel:${selectedBooking.customerPhone}`}
                    className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
                  <div className="text-slate-400">
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Origin Floor</span>
                    <span className="font-bold text-white">
                      {selectedBooking.origin.floorNumber === 0 ? 'Ground' : `${selectedBooking.origin.floorNumber}th Floor`} ({selectedBooking.origin.hasLift ? 'Lift' : 'Stairs'})
                    </span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-[10px] text-slate-500 block font-semibold uppercase">Dest. Floor</span>
                    <span className="font-bold text-white">
                      {selectedBooking.destination.floorNumber}th Floor ({selectedBooking.destination.hasLift ? 'Service Lift' : 'No Lift'})
                    </span>
                  </div>
                </div>

                {/* Who packs what? (Section 23) */}
                <div className="p-2.5 bg-slate-900 rounded-xl text-xs space-y-1">
                  <div className="text-[10px] text-orange-400 font-bold uppercase">Packing Specification:</div>
                  <div className="font-semibold text-slate-200">
                    {selectedBooking.packingPreference === 'dcm_full'
                      ? 'DCM Packs Everything (4-Layer Standard)'
                      : selectedBooking.packingPreference === 'partial'
                      ? 'DCM Packs Fragile/Electronics Only'
                      : 'Customer Packed Cartons'}
                  </div>
                </div>

                {/* Current Stage */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-500">Active Task:</span>
                  <span className="font-mono font-bold text-blue-400 uppercase text-[11px] bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                    {selectedBooking.currentStage.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* STEP-BY-STEP TASK WORKFLOW (Section 55) */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Task Execution Workflow</span>
                  <span className="text-orange-400 text-[10px]">Tap to Complete</span>
                </div>

                {staffRole === 'packing_supervisor' ? (
                  /* Pickup & Packing Sequence */
                  <div className="space-y-2">
                    {[
                      { stage: 'packing_in_progress', label: 'Arrived at Pickup & Start Packing' },
                      { stage: 'packing_completed', label: 'Packing Completed (All 48 Items Tagged)' },
                      { stage: 'dismantling_completed', label: 'Furniture Dismantling Completed' },
                      { stage: 'loading_in_progress', label: 'Container Loading In Progress' },
                      { stage: 'pickup_completed', label: 'Pickup Completed & Gate Pass Signed' },
                      { stage: 'dispatched', label: 'Dispatched from City Hub to Highway' },
                    ].map((step, idx) => {
                      const isPast = selectedBooking.stages.find((s) => s.stageKey === step.stage)?.status === 'completed';
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAdvanceTask(step.stage as MoveStageKey, step.label)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${
                            isPast
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
                              : 'bg-slate-900 text-slate-200 border border-slate-800 hover:border-orange-500'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              isPast ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isPast ? <Check className="w-3 h-3" /> : idx + 1}
                            </span>
                            <span>{step.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Delivery Sequence */
                  <div className="space-y-2">
                    {[
                      { stage: 'out_for_delivery', label: 'Out for Door Delivery to Destination' },
                      { stage: 'delivered', label: 'Arrived at Destination & Unloading' },
                      { stage: 'unpacking_reassembly', label: 'Unpacking & Furniture Reassembly' },
                    ].map((step, idx) => {
                      const isPast = selectedBooking.stages.find((s) => s.stageKey === step.stage)?.status === 'completed';
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAdvanceTask(step.stage as MoveStageKey, step.label)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${
                            isPast
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
                              : 'bg-slate-900 text-slate-200 border border-slate-800 hover:border-blue-500'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              isPast ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isPast ? <Check className="w-3 h-3" /> : idx + 1}
                            </span>
                            <span>{step.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      );
                    })}

                    {/* POD Button */}
                    <button
                      onClick={() => setShowPodModal(true)}
                      className="btn-3d-orange w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Execute Digital POD &amp; Sign</span>
                    </button>
                  </div>
                )}
              </div>

              {/* PHOTO CAPTURE SIMULATOR (Section 56) */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                    Field Photo Documentation
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {capturedPhotos.length} Captured
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {capturedPhotos.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700">
                      <img src={url} alt="Field capture" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center text-white font-mono">
                        # {idx + 1}
                      </span>
                    </div>
                  ))}
                  <button
                    onClick={handleSimulatePhoto}
                    className="aspect-square rounded-lg border-2 border-dashed border-slate-700 hover:border-orange-500 flex flex-col items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[9px] mt-1 font-bold">Snap</span>
                  </button>
                </div>
              </div>

              {/* Room-wise Placement Sheet for Delivery Crew (Section 28) */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-300 block uppercase">Room Placement Sheet</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                    <span className="font-bold text-orange-400">Master Bedroom:</span>
                    <span className="text-slate-300">King Bed, Wardrobes, Linens</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                    <span className="font-bold text-blue-400">Living Room:</span>
                    <span className="text-slate-300">6-Seater Sofa, 65&quot; OLED TV</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg flex justify-between">
                    <span className="font-bold text-emerald-400">Kitchen:</span>
                    <span className="text-slate-300">Refrigerator, Fine China Boxes</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              Loading active jobs assigned to your crew...
            </div>
          )}

        </div>
      </div>

      {/* MODAL: Digital Proof of Delivery (POD) (Section 47) */}
      {showPodModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-white">
            <h3 className="font-black text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Digital Proof of Delivery (POD)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Customer inspection confirmation for booking {selectedBooking.bookingId}.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Receiver Full Name</label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Delivery OTP Code</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono font-bold tracking-widest text-center"
                />
              </div>

              {/* Signature Canvas Pad */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 text-[11px] font-semibold">Customer Digital Signature</span>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-[10px] text-orange-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="border border-slate-700 rounded-xl overflow-hidden bg-white">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={110}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="cursor-crosshair w-full h-[110px]"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl text-[10px] text-slate-400 leading-tight">
                By signing, the receiver certifies that all items listed on the inventory sheet were inspected and safely placed in designated rooms.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPodModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting || !signatureDone}
                onClick={handleCompletePod}
                className="btn-3d-orange px-5 py-2 text-xs font-bold disabled:opacity-50"
              >
                {isSubmitting ? 'Signing...' : 'Sign & Complete Move'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
