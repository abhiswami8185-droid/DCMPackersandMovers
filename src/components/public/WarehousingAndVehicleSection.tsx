import React from 'react';
import {
  Warehouse,
  ShieldCheck,
  Clock,
  Truck,
  Shield,
  CheckCircle2,
  ArrowRight,
  Lock,
  Layers,
  MapPin,
} from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

export const WarehousingAndVehicleSection: React.FC<{ onOpenQuoteWizard: () => void }> = ({
  onOpenQuoteWizard,
}) => {
  return (
    <div className="space-y-0">
      
      {/* 1. DEDICATED WAREHOUSING & STORAGE SECTION (Light & Warm Background per Section 16) */}
      <section id="warehousing" className="py-20 bg-[#FFFDF5] border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                Safe Storage Facilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
                Secure Warehousing &amp; Household Goods Storage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Relocating between home possession dates, travelling abroad, or renovating? DCM provides secure, pest-controlled, and 24x7 CCTV monitored warehousing facilities in Mohali, Chandigarh, Delhi NCR, and Bangalore.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-semibold text-slate-800">
                <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">24x7 CCTV &amp; Guarded</span>
                    <span className="text-slate-500 font-normal">Continuous digital video surveillance and perimeter security.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <Warehouse className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">Raised Wooden Pallets</span>
                    <span className="text-slate-500 font-normal">Moisture, dampness, and termite protected floor clearance.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">Daily &amp; Monthly Plans</span>
                    <span className="text-slate-500 font-normal">Pay strictly for the days and cubic volume you utilize.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs">
                  <Lock className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-900">Private Lock Vaults</span>
                    <span className="text-slate-500 font-normal">Goods packed into personal DCM Cubes with client padlock.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteWizard}
                  className="btn-3d-navy h-11 px-6 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Warehouse Storage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Warehouse Facilities Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-black text-blue-950 text-base">
                    DCM Operational Storage Hubs
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active Capacity Available
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-[#FFFDF5] rounded-xl border border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-950">Mohali &amp; Chandigarh Central Depot</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Phase 9 Industrial Area, Mohali (Tri-City HQ)</p>
                    </div>
                    <span className="font-mono text-orange-600 font-bold">85,000 CFT</span>
                  </div>

                  <div className="p-3.5 bg-[#FFFDF5] rounded-xl border border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-950">Delhi NCR South Logistics Terminal</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kapashera Border, South Delhi Interstate Depot</p>
                    </div>
                    <span className="font-mono text-orange-600 font-bold">140,000 CFT</span>
                  </div>

                  <div className="p-3.5 bg-[#FFFDF5] rounded-xl border border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-950">Bangalore Regional Facility</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Whitefield Industrial Area, Bangalore</p>
                    </div>
                    <span className="font-mono text-orange-600 font-bold">95,000 CFT</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-blue-950 block">Barcoded Storage Inventory:</span>
                  <span>Every stored carton is labeled with a serialized barcode and photographed during intake so no carton is misplaced.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEDICATED CAR & BIKE CARRIER SECTION (Light & Clean Theme per Section 17) */}
      <section id="vehicles" className="py-20 bg-white border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Visual Highlight */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-blue-950">Enclosed Automobile Carrier</h3>
                    <p className="text-xs text-slate-500">Zero-kilometer drive guarantee across all Indian highway routes.</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Enclosed Double-Deck Car Carriers</span>
                      <span className="text-slate-600">Shields your vehicle against highway stone chips, dust, and rain.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Detailed Pre-Loading Inspection Sheet</span>
                      <span className="text-slate-600">Odometer reading, fuel gauge, and body condition recorded before carrier loading.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Special Two-Wheeler Upright Stand</span>
                      <span className="text-slate-600">Custom hydraulic bike wheel stands and wooden outer crates ensuring zero tilt.</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenQuoteWizard}
                  className="btn-3d-orange w-full h-11 text-xs font-bold"
                >
                  Get Car &amp; Bike Carrier Rates
                </button>
              </div>
            </div>

            {/* Right Column: Information */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Automobile Carrier Service
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
                Safe Car &amp; Two-Wheeler Transportation Across India
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Driving your personal vehicle across 1,000+ kilometers risks highway wear, driver fatigue, and accidental damage. DCM operates specialized hydraulic car trailers and padded bike carrier cages for direct inter-city transport.
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>Doorstep Pickup in Mohali &amp; Tri-City:</strong> Vehicle inspected and loaded right at your doorstep.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>Comprehensive Transit Policy:</strong> Full insurance coverage against road hazards.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                  <span><strong>All Vehicles Handled:</strong> Sedans, Hatchbacks, Luxury SUVs, Sports Bikes, and Scooters.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
