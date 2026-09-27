import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Truck,
  FileText,
  UserCheck,
  CreditCard,
  Building,
  ShieldCheck,
  Smartphone,
  Eye,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';

interface LifecycleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToView: (view: 'public' | 'admin' | 'staff', subView?: string) => void;
}

const LIFECYCLE_STEPS = [
  {
    step: 1,
    title: 'Customer Website & Move Estimate',
    actor: 'Customer (Rahul Swami)',
    platform: 'Public Website',
    desc: 'Customer enters origin (Chandigarh Sector 35), destination (Delhi Vasant Vihar), date, and property details (floor, lift, carry distance).',
    actionLabel: 'View Booking Wizard',
    targetView: 'public' as const,
    subView: 'home',
  },
  {
    step: 2,
    title: 'Lead Captured & Assigned to Sales',
    actor: 'Sales Manager (Priya Mehra)',
    platform: 'Admin Command Center (CRM)',
    desc: 'The website inquiry automatically generates Lead #lead-101 in the CRM. Sales rep reviews volume and schedules a pre-move survey.',
    actionLabel: 'View CRM Leads',
    targetView: 'admin' as const,
    subView: 'leads',
  },
  {
    step: 3,
    title: 'Pre-Move Survey & Inventory Assessment',
    actor: 'Surveyor (Amit Verma)',
    platform: 'Staff Mobile App (Survey Mode)',
    desc: 'Surveyor visits customer residence, documents 48 items totaling 420 CFT volume, checks staircase clearance for King bed, and flags TV for special wooden crate.',
    actionLabel: 'View Staff App',
    targetView: 'staff' as const,
  },
  {
    step: 4,
    title: 'Authoritative Quotation Generation',
    actor: 'Quotation Engine',
    platform: 'Quotation Service (Backend)',
    desc: 'Authoritative backend pricing engine calculates transport, 4-layer packing, loading, floor surcharges, GST (18%), and 5% festive discount. Quote QTE-DCM-8021 issued for ₹39,482.',
    actionLabel: 'View Quotes in Admin',
    targetView: 'admin' as const,
    subView: 'quotes',
  },
  {
    step: 5,
    title: 'Customer Quote Approval & Change Request',
    actor: 'Customer',
    platform: 'Customer Portal',
    desc: 'Customer reviews line-item breakdown, accepts included services, and optionally requests revisions for extra items without breaking original records.',
    actionLabel: 'View Customer Portal',
    targetView: 'public' as const,
    subView: 'portal',
  },
  {
    step: 6,
    title: 'Advance Payment & Booking Confirmation',
    actor: 'Customer / Razorpay Gateway',
    platform: 'Payment Layer',
    desc: 'Customer pays 20% booking token advance (₹7,896) via UPI/Razorpay. System generates permanent Booking ID DCM-2026-000123 with official agreement PDF.',
    actionLabel: 'View Payment Receipts',
    targetView: 'public' as const,
    subView: 'portal',
  },
  {
    step: 7,
    title: 'Crew & Fleet Assignment',
    actor: 'Operations Manager (Rajesh Kumar)',
    platform: 'Admin Command Center',
    desc: 'Operations assigns Weather-Proof Container DL-01-AX-9912, Packing Supervisor Gurpreet Singh, and Delivery Lead Manoj Yadav. Tasks push directly to staff devices.',
    actionLabel: 'View Move Specification',
    targetView: 'admin' as const,
    subView: 'moves',
  },
  {
    step: 8,
    title: 'Move Day Packing & Condition Photography',
    actor: 'Packing Supervisor (Gurpreet Singh)',
    platform: 'Staff Mobile App',
    desc: 'Crew applies 4-layer packing (bubble + foam + corrugated + film). Existing scratches photographed and uploaded with booking metadata. Furniture dismantled.',
    actionLabel: 'View Staff App Execution',
    targetView: 'staff' as const,
  },
  {
    step: 9,
    title: 'Highway Container Transit & Milestone Updates',
    actor: 'Logistics Dispatcher',
    platform: 'Operational Tracker',
    desc: 'Container truck departs Chandigarh hub via NH-44 Grand Trunk Highway. Milestone "In Transit" logged with checkpoint notes. Customer alerted via WhatsApp & SMS.',
    actionLabel: 'View Live Move Tracker',
    targetView: 'public' as const,
    subView: 'tracker',
  },
  {
    step: 10,
    title: 'Door Delivery, Reassembly & Room Placement',
    actor: 'Delivery Lead (Manoj Yadav)',
    platform: 'Staff Mobile App (Delivery)',
    desc: 'Truck arrives at Vasant Vihar destination. Crew references the digital Room Placement Sheet: King Bed to Master Bedroom, OLED TV to Living Room, fine china to Kitchen.',
    actionLabel: 'View Delivery Day Mode',
    targetView: 'public' as const,
    subView: 'tracker',
  },
  {
    step: 11,
    title: 'Customer Inspection & Digital POD Signature',
    actor: 'Customer & Delivery Lead',
    platform: 'Staff Mobile App (POD Pad)',
    desc: 'Customer inspects goods, verifies OTP code, signs directly on the Staff App signature canvas, and completes Digital Proof of Delivery (POD).',
    actionLabel: 'View POD Screen',
    targetView: 'staff' as const,
  },
  {
    step: 12,
    title: 'Payment Closure, Review & Archiving',
    actor: 'Accounts & Customer Support',
    platform: 'Admin & Customer Portal',
    desc: 'Final balance verified, GST tax invoice issued, customer submits 5-star review, and the complete move specification is safely archived in the audit log.',
    actionLabel: 'View Completed Move',
    targetView: 'admin' as const,
    subView: 'moves',
  },
];

export const LifecycleTourModal: React.FC<LifecycleTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToView,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const current = LIFECYCLE_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < LIFECYCLE_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleJump = () => {
    onJumpToView(current.targetView, current.subView);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full text-white shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-black flex items-center justify-center">
              {current.step}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-900">
                Phase 14 &amp; 103 Verification Gate
              </span>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Complete DCM Relocation Lifecycle Tour
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="bg-slate-950 px-6 py-2.5 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
          {LIFECYCLE_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIdx(idx)}
              className={`w-6 h-6 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                idx === currentStepIdx
                  ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                  : idx < currentStepIdx
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              {current.platform}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Role: <strong className="text-slate-200">{current.actor}</strong>
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {current.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {current.desc}
          </p>

          <div className="pt-2">
            <button
              onClick={handleJump}
              className="btn-3d-orange text-xs px-5 py-2.5 inline-flex items-center gap-2"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentStepIdx + 1} of {LIFECYCLE_STEPS.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStepIdx === LIFECYCLE_STEPS.length - 1}
            className="btn-3d-navy text-xs px-5 py-2 inline-flex items-center gap-1.5 disabled:opacity-30"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
