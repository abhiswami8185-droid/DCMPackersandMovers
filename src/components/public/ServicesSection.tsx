import React, { useState } from 'react';
import {
  Home,
  Building2,
  Truck,
  Warehouse,
  Box,
  ShieldCheck,
  ArrowRight,
  Check,
  Layers,
  MapPin,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'residential' | 'business' | 'vehicle' | 'storage'>('residential');

  const categories = [
    { id: 'residential', label: 'Residential Moving' },
    { id: 'business', label: 'Business & Office Shifting' },
    { id: 'vehicle', label: 'Vehicle Transportation' },
    { id: 'storage', label: 'Storage & Specialized Logistics' },
  ];

  const serviceData = {
    residential: [
      {
        title: 'Household Shifting (1, 2, 3, 4 BHK & Villas)',
        desc: 'Complete domestic relocation with 4-layer packing (bubble, thermocol, corrugated board, stretch film). Furniture dismantling and reassembly included.',
        price: 'From ₹4,499',
        features: ['Personal DCM supervisor', 'Dedicated container vehicle', 'Pre-move condition checklist', 'Zero damage guarantee'],
        areas: 'Mohali, Chandigarh, Panchkula, Zirakpur & Pan India',
      },
      {
        title: 'Local Shifting in Mohali & Tri-City',
        desc: 'Same-day express shifting within Mohali (Phase 1 to 11, Aerocity, IT City), Chandigarh sectors, and Panchkula with fast loading and unpacking.',
        price: 'From ₹2,999',
        features: ['2-hour rapid pickup', 'Local society gate pass handling', 'Lift & stair carry team', 'Furniture placement'],
        areas: 'Same-day express service',
      },
      {
        title: 'Interstate Domestic Relocation',
        desc: 'Direct highway container transit between Punjab/Chandigarh and Delhi NCR, Bangalore, Mumbai, Pune, Hyderabad, and Kolkata with zero transshipment.',
        price: 'From ₹9,999',
        features: ['DCM Trucking Cube option', 'Transit risk insurance', 'Milestone SMS & WhatsApp alerts', 'Direct doorstep delivery'],
        areas: 'All 28 Indian States & UTs',
      },
      {
        title: 'Expert Packing & Unpacking Services',
        desc: 'Standalone professional packing for precious chinaware, glass dinner sets, books, designer wardrobes, and high-value fragile electronics.',
        price: 'From ₹1,999',
        features: ['High GSM 5-ply cartons', 'Bubble wrap & foam edges', 'Color-coded room stickers', 'Debris removal after move'],
        areas: 'On-demand packing crews',
      },
    ],
    business: [
      {
        title: 'Corporate Office Relocation',
        desc: 'Planned weekend and overnight corporate shifting designed to minimize company downtime. Workstation disassembly, partition packing, and floor plan staging.',
        price: 'Custom Corporate Plan',
        features: ['Weekend execution', 'IT server rack crates', 'Employee cubicle labeling', 'Post-move setup assistance'],
        areas: 'Commercial hubs & IT Parks',
      },
      {
        title: 'IT Hardware, Server & Lab Relocation',
        desc: 'Anti-static bubble wrap, climate-controlled transport vehicles, and shock-isolated packaging for servers, network racks, and delicate lab electronics.',
        price: 'Specialized Tariff',
        features: ['Anti-static packing film', 'Padded road suspension', 'Serial number audit sheet', 'Engineer assistance'],
        areas: 'Mohali IT Park & Delhi NCR',
      },
      {
        title: 'Commercial Supply Chain & Distribution',
        desc: 'B2B scheduled freight, warehouse intake, retail replenishment, and express logistics dispatch across Northern and Central India.',
        price: 'Contract Rates',
        features: ['Fleet contract leasing', 'Daily GPS highway dispatch', 'E-Way bill compliance', 'POD document return'],
        areas: 'Pan-India industrial corridors',
      },
    ],
    vehicle: [
      {
        title: 'Enclosed Car Carrier Transportation',
        desc: 'Dedicated double-decker hydraulic car carriers. Your car is secured with 4-wheel safety clamps to avoid highway stone chips, dust, and odometer wear.',
        price: 'From ₹6,499',
        features: ['Zero kilometer drive guarantee', 'Detailed dent/scratch sheet', 'Hydraulic ramp loading', 'Full transit insurance'],
        areas: 'Doorstep pickup in Mohali/Chandigarh',
      },
      {
        title: 'Motorbike & Two-Wheeler Transportation',
        desc: 'Custom wooden crating and fixed upright stands for sports bikes, Royal Enfields, and scooters with fuel drainage and mirror foam cushions.',
        price: 'From ₹2,499',
        features: ['Special upright bike stand', 'Handlebar & tank foam pad', 'Zero tilt or scratch risk', 'Express interstate carrier'],
        areas: 'Direct delivery across India',
      },
    ],
    storage: [
      {
        title: 'Secure Warehousing & Household Storage',
        desc: 'Short-term and long-term storage in DCM-owned warehouses in Mohali, Delhi NCR, and Bangalore. 24x7 CCTV, climate-managed, and pest-free pallet storage.',
        price: 'From ₹45 / day',
        features: ['24x7 biometric security', 'Raised pallet storage vaults', 'Daily & monthly billing', 'Flexible delivery anytime'],
        areas: 'Mohali, Delhi NCR & Bangalore',
      },
      {
        title: 'Fine Arts, Sculptures & Antique Moving',
        desc: 'On-site tailored wooden crating with foam cutouts for oil paintings, stone sculptures, antique grandfather clocks, and fragile chandeliers.',
        price: 'From ₹2,999',
        features: ['Custom on-site carpentry', 'Shock absorption layers', 'Senior supervisor custody', 'Special value insurance'],
        areas: 'Museums, galleries & residences',
      },
      {
        title: 'Loading, Unloading & Crane Assistance',
        desc: 'Trained heavy-machinery handling, piano moving, hydraulic crane hoisting for high-rise balconies, and heavy safe relocation.',
        price: 'From ₹1,499',
        features: ['Heavy hydraulic trolleys', 'Balcony hoisting ropes', 'High-rise experienced crew', 'Safety compliant gear'],
        areas: 'Apartments & multi-story villas',
      },
    ],
  };

  return (
    <section id="services" className="py-20 bg-[#FFFDF5] border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
            DCM Relocation Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
            Intelligent Moving Solutions For Every Requirement
          </h2>
          <p className="text-sm text-slate-600">
            Sourced from 15+ years of verified relocation expertise in Mohali, Chandigarh, and Pan India. Select your moving category to view tailored services and inclusions.
          </p>
        </div>

        {/* Category Tabs (Segmented Control per Frontend Design guidelines) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 bg-amber-100/80 rounded-xl border border-amber-200/80 max-w-full overflow-x-auto gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-950 hover:bg-white/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid for Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceData[activeCategory].map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-amber-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold text-blue-950 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <span className="font-mono text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-md shrink-0">
                    {service.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.desc}
                </p>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  <span>{service.areas}</span>
                </span>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="btn-3d-orange h-9 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
