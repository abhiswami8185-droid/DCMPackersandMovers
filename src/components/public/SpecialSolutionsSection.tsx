import React from 'react';
import { Box, Tv, Shield, Truck, Package, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

export const SpecialSolutionsSection: React.FC<{ onOpenQuoteWizard: () => void }> = ({
  onOpenQuoteWizard,
}) => {
  const icons = [Truck, Tv, Box, Shield, Package, Heart];

  return (
    <section id="special-solutions" className="py-20 bg-white border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Proprietary Innovations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
            DCM Special Handling Solutions
          </h2>
          <p className="text-sm text-slate-600">
            Standard movers use recycled grocery cartons. DCM equips your relocation with proprietary specialized containers, screen guards, and custom fixtures engineered for zero transit loss.
          </p>
        </div>

        {/* 6 Special Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DCM_CONTACT.specialSolutions.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.id}
                className="bg-[#FFFDF5] rounded-2xl p-6 border border-amber-200/80 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-blue-900 group-hover:bg-orange-500 group-hover:text-white transition-colors flex items-center justify-center shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-blue-950 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-blue-900">
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Available on request
                  </span>
                  <button
                    onClick={onOpenQuoteWizard}
                    className="hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Add to Move</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
