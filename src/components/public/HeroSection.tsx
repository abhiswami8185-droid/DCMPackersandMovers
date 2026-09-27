import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Search,
  Award,
  Sparkles,
  Lock,
} from 'lucide-react';
import { MoveType } from '../../types';
import { DCM_CONTACT } from '../../config/dcmConfig';
import heroBannerImg from '../../assets/images/dcm_hero_banner_1790384452261.jpg';

interface HeroSectionProps {
  onStartEstimate: (initialData: {
    fromCity: string;
    toCity: string;
    movingDate: string;
    moveType: MoveType;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }) => void;
  onOpenTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartEstimate,
  onOpenTracker,
}) => {
  // Quick Quote Form State
  const [customerName, setCustomerName] = useState('Rahul Swami');
  const [customerPhone, setCustomerPhone] = useState('+91 9779593495');
  const [customerEmail, setCustomerEmail] = useState('rahul.swami8185@gmail.com');
  const [fromCity, setFromCity] = useState('Mohali');
  const [toCity, setToCity] = useState('New Delhi');
  const [movingDate, setMovingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [moveType, setMoveType] = useState<MoveType>('home');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartEstimate({
      fromCity,
      toCity,
      movingDate,
      moveType,
      customerName,
      customerPhone,
      customerEmail,
    });
  };

  return (
    <section id="hero" className="relative bg-[#FFFDF5] border-b border-amber-200/60 pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
      {/* Warm Ambient Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#FDE047_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-25 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Warm Headline & Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-slate-800">
            
            {/* Top Verified Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-slate-800 text-xs font-bold shadow-2xs">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Serving Chandigarh, Mohali, Panchkula &amp; All India Since 2010</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-blue-950 leading-[1.15]">
              MOVE WITH CONFIDENCE.{' '}
              <br />
              <span className="text-orange-600">
                WE HANDLE THE JOURNEY.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              Professional packing, transportation and relocation solutions for homes, offices, and vehicles. Dedicated weather-proof container trucks, certified 4-layer packing, and guaranteed fixed pricing.
            </p>

            {/* DCM Hero Visual Banner (Exact Uploaded Brand Asset) */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-200/90 shadow-md bg-white group">
              <img
                src={heroBannerImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}dcm-hero-banner.jpg`;
                }}
                alt="DCM Packers & Movers — Safe Move, Happy You. Your Trusted Partner in Packing & Moving"
                className="w-full h-auto aspect-[1376/768] object-cover sm:object-contain bg-slate-50 transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* 3 Core Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  <span>Zero Hidden Charges</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Transparent itemized quote locked before moving day.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Weather-Proof Trucks</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Closed steel containers protected against rain and dust.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Trained DCM Crew</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  No casual daily-labour. Certified permanent packing team.
                </p>
              </div>
            </div>

            {/* Secondary Direct Action Link */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
              <button
                onClick={onOpenTracker}
                className="inline-flex items-center gap-1.5 text-blue-900 hover:text-orange-600 underline font-bold"
              >
                <Search className="w-3.5 h-3.5 text-orange-500" />
                <span>Have an existing booking? Track with Booking ID</span>
              </button>
              <span>·</span>
              <a
                href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-900"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>Call {DCM_CONTACT.primaryPhone}</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: PROMINENT QUICK QUOTE FORM (Clean, Real Business Form) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md border-2 border-amber-300 text-slate-900 relative">
              
              {/* Form Title */}
              <div className="pb-3 border-b border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                    Free Moving Consultation
                  </span>
                  <h2 className="text-xl font-black text-blue-950">
                    Get Your Moving Estimate
                  </h2>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                  ₹0
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile (+91)</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9779593495"
                      required
                      className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    required
                    className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Moving From & Moving To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Moving From (Origin)</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 absolute left-2.5 top-3" />
                      <input
                        type="text"
                        value={fromCity}
                        onChange={(e) => setFromCity(e.target.value)}
                        placeholder="e.g. Mohali, Chandigarh"
                        required
                        className="w-full pl-8 pr-2.5 py-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Moving To (Destination)</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-3" />
                      <input
                        type="text"
                        value={toCity}
                        onChange={(e) => setToCity(e.target.value)}
                        placeholder="e.g. New Delhi, Bangalore"
                        required
                        className="w-full pl-8 pr-2.5 py-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Move Type & Moving Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Relocation Type</label>
                    <select
                      value={moveType}
                      onChange={(e) => setMoveType(e.target.value as MoveType)}
                      className="w-full p-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="home">Household Shifting (1/2/3/4 BHK)</option>
                      <option value="office">Office / Corporate Shifting</option>
                      <option value="vehicle">Car &amp; Bike Carrier</option>
                      <option value="storage">Warehousing &amp; Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                      <input
                        type="date"
                        value={movingDate}
                        onChange={(e) => setMovingDate(e.target.value)}
                        required
                        className="w-full pl-8 pr-2.5 py-2.5 rounded-lg bg-amber-50/40 border border-slate-300 text-xs font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-3d-orange w-full h-12 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>GET MY FREE QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Reassurance text */}
                <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    No obligation
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-blue-600" />
                    100% Privacy Protected
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Fast Response
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
