import React from 'react';
import {
  FileText,
  ClipboardCheck,
  Package,
  Truck,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const MoveProcessSection: React.FC<{ onOpenQuoteWizard: () => void }> = ({
  onOpenQuoteWizard,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Tell Us About Your Move',
      desc: 'Submit your origin, destination, moving date, and major items via our quick form or call +91 9779593495.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Free Survey & Fixed Quote',
      desc: 'Our estimator conducts an on-site or video survey to calculate exact CFT volume and locks a guaranteed transparent price.',
      icon: ClipboardCheck,
    },
    {
      num: '03',
      title: 'Certified 4-Layer Packing',
      desc: 'Permanent DCM crew applies bubble film, foam corner protectors, corrugated boards, and waterproof stretch wraps.',
      icon: Package,
    },
    {
      num: '04',
      title: 'Safe Weather-Proof Transit',
      desc: 'Transported exclusively in closed steel containers or personal Trucking Cubes with your own padlock.',
      icon: Truck,
    },
    {
      num: '05',
      title: 'Door Delivery & Unpacking',
      desc: 'Goods placed room-wise in your new residence. Furniture dismantled at origin is carefully reassembled.',
      icon: Building,
    },
  ];

  return (
    <section id="process" className="py-20 bg-white border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            How DCM Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
            5 Simple Steps To A Smooth Relocation
          </h2>
          <p className="text-sm text-slate-600">
            From the initial estimate in Mohali or Chandigarh to the final room placement at your destination anywhere in India, every phase is organized for your peace of mind.
          </p>
        </div>

        {/* Clean Process Steps Grid (Desktop Horizontal, Mobile Vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#FFFDF5] p-5 rounded-2xl border border-amber-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-amber-500 group-hover:text-orange-600 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-blue-900 group-hover:bg-orange-500 group-hover:text-white transition-colors flex items-center justify-center shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-extrabold text-blue-950 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-200/50 flex items-center text-[11px] font-bold text-slate-500">
                  <span>Step {idx + 1} of 5</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DCM Certified 4-Layer Packing Formula (Warm, Light Background as Requested) */}
        <div className="bg-[#FFFBEB] rounded-3xl p-6 sm:p-8 border-2 border-amber-300 text-slate-900 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
                Quality Assurance
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-blue-950 mt-0.5">
                Our Certified 4-Layer Packaging Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Every delicate appliance, fine china box, and polished furniture surface undergoes our rigorous multi-stage physical protection protocol.
              </p>
            </div>

            <button
              onClick={onOpenQuoteWizard}
              className="btn-3d-orange h-11 px-5 text-xs font-bold shrink-0"
            >
              Get Free Moving Quote
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
              <span className="font-bold text-orange-600 block">Layer 1: Air Bubble Cushion</span>
              <p className="text-slate-600 text-[11px]">Heavy-duty shock absorption wrapping around fragile glass and electronics.</p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
              <span className="font-bold text-orange-600 block">Layer 2: Foam Corner Guards</span>
              <p className="text-slate-600 text-[11px]">Specially contoured high-density foam securing bed, table, and wardrobe edges.</p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
              <span className="font-bold text-orange-600 block">Layer 3: 5-Ply Corrugated Rolls</span>
              <p className="text-slate-600 text-[11px]">Hardened corrugated board protecting surfaces against pressure and impact.</p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
              <span className="font-bold text-orange-600 block">Layer 4: Stretch Film Seal</span>
              <p className="text-slate-600 text-[11px]">Waterproof, dustproof shrink-film tightly sealed with moisture-resistant tape.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
