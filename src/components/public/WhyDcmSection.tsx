import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  FileCheck2,
  BadgeCheck,
  Building,
  Target,
  Eye,
  MapPin,
} from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

export const WhyDcmSection: React.FC = () => {
  const pillars = [
    {
      title: 'Trained Permanent Manpower',
      desc: 'No random daily-wage workers. DCM packing crews undergo strict background verification and 80+ hours of physical relocation training.',
      icon: Users,
    },
    {
      title: 'Zero Hidden Surcharges',
      desc: 'Transparent quotations locked in advance before moving day. What we quote is what you pay — no surprise stair or toll demands.',
      icon: BadgeCheck,
    },
    {
      title: 'Pre-Move Condition Log',
      desc: 'Our staff photographs existing scratches on furniture and electronics before packing, ensuring total mutual transparency.',
      icon: FileCheck2,
    },
    {
      title: 'Weather-Proof Steel Fleet',
      desc: 'Zero open-tarpaulin trucks. All long-distance domestic cargo travels in sealed, watertight metal containers or personal Trucking Cubes.',
      icon: ShieldCheck,
    },
    {
      title: 'Dedicated Move Coordinator',
      desc: 'A single senior coordinator personally oversees your move from initial survey to final room placement. Direct WhatsApp & phone assistance.',
      icon: Award,
    },
    {
      title: 'Digital Proof of Delivery (POD)',
      desc: 'You inspect room placement and item conditions before digitally signing off on the DCM Staff App. 100% accountability.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. WHY CHOOSE DCM SECTION */}
      <section id="why-dcm" className="py-20 bg-[#FFFDF5] border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
              The DCM Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
              Why Customers Across India Choose DCM
            </h2>
            <p className="text-sm text-slate-600">
              Traditional packers lack organization, punctuality, and accountability. DCM was built to fix that with trained manpower, specialized packing materials, and transparent digital communication.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-amber-200/80 hover:border-orange-400 hover:shadow-md transition-all shadow-2xs space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-blue-950 text-base group-hover:text-orange-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Verified Statistics Bar (Sourced directly from official DCM documentation) */}
          <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-2xs flex flex-wrap items-center justify-around gap-6 text-center text-xs">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-blue-950 block font-mono">15+</span>
              <span className="text-slate-600 font-semibold">Years of Trust (Since 2010)</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-amber-200"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-orange-600 block font-mono">15,000+</span>
              <span className="text-slate-600 font-semibold">Satisfied Relocations</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-amber-200"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-blue-950 block font-mono">1,200+</span>
              <span className="text-slate-600 font-semibold">Service Locations Across India</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-amber-200"></div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 block font-mono">80+</span>
              <span className="text-slate-600 font-semibold">Regional Branch Depots</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DEDICATED ABOUT DCM SECTION (Section 18 of user prompt) */}
      <section id="about" className="py-20 bg-white border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                About DCM Packers &amp; Movers
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
                Safe Move • Happy You
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                DCM Packers and Movers was established in 2010 in Chandigarh with a single mission: to transform the stressful process of household and corporate relocation into a safe, predictable, and digitally organized experience.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Headquartered in Manimajra, Chandigarh, with primary operations throughout Mohali, Panchkula, Zirakpur, Delhi NCR, Bangalore, and all major Indian cities, DCM operates an extensive fleet of weather-proof container vehicles, specialized car carriers, and modern warehousing facilities.
              </p>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-[#FFFDF5] rounded-xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-950 font-bold text-xs">
                    <Target className="w-4 h-4 text-orange-600" />
                    <span>Our Mission</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    Deliver seamless, zero-damage door-to-door relocation through trained staff, innovative packaging, and complete price transparency.
                  </p>
                </div>

                <div className="p-4 bg-[#FFFDF5] rounded-xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-950 font-bold text-xs">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Our Vision</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    To remain India’s most trusted, consumer-friendly relocation partner by setting higher operational benchmarks in safe logistics.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Key Hubs Callout */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-5">
                <h3 className="font-black text-blue-950 text-base pb-3 border-b border-amber-200/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Verified Operational Network</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-amber-100">
                    <span className="font-bold text-blue-950">Chandigarh Tri-City Headquarters</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">Shop No. 2254/H, 2nd Floor, Pipliwala Town, Near Fouji Dhaba, Manimajra, Chandigarh - 160101</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-100">
                    <span className="font-bold text-blue-950">Mohali Operational Hub</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">Phase 7 &amp; Industrial Area Phase 8 &amp; 9, Mohali, Punjab - 160062</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-100">
                    <span className="font-bold text-blue-950">Panchkula Branch</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">Sector 4 Commercial Complex, Panchkula, Haryana - 134112</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-100">
                    <span className="font-bold text-blue-950">Delhi NCR Logistics Terminal</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">Khasra 42/1, Kapashera Border, South Delhi - 110037</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  Direct inquiries: <a href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`} className="text-orange-600 font-bold">{DCM_CONTACT.primaryPhone}</a> · Email: <a href={`mailto:${DCM_CONTACT.email}`} className="text-blue-900 font-semibold">{DCM_CONTACT.email}</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
