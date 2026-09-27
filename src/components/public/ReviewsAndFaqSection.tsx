import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';

export const ReviewsAndFaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const reviews = [
    {
      name: 'Col. Rajesh Bakshi (Retd.)',
      route: 'Sector 35-C, Chandigarh → Vasant Kunj, New Delhi',
      rating: 5,
      date: 'September 2026',
      text: 'Having moved 8 times across India during my defence service, DCM Packers and Movers are the most disciplined relocation team I have hired. Gurpreet Singh and his 4-member crew treated our vintage teak dining set and brass heirlooms with extreme care. The Trucking Cube with personal padlock gave us complete peace of mind.',
    },
    {
      name: 'Dr. Shalini Aggarwal',
      route: 'Phase 7, Mohali → Whitefield, Bangalore',
      rating: 5,
      date: 'August 2026',
      text: 'Relocating inter-state from Mohali to Bangalore with sensitive clinical equipment and a 3BHK household was smooth. The quotation provided at Manimajra headquarters was 100% fixed with zero surprise loading or toll demands on delivery day. Both our double beds were reassembled immediately.',
    },
    {
      name: 'Siddharth Nair',
      route: 'Sector 4, Panchkula → Hinjewadi, Pune',
      rating: 5,
      date: 'July 2026',
      text: 'Transported my Hyundai Creta along with full household goods. The car condition inspection sheet created before loading in Panchkula matched the vehicle delivered in Pune completely scratch-free. Excellent milestone alerts on WhatsApp throughout the journey.',
    },
  ];

  const faqs = [
    {
      q: 'How does DCM calculate relocation charges? Are there any hidden fees?',
      a: 'DCM employs an authoritative volume-and-distance pricing system. Your quotation accounts for cubic feet (CFT) volume, floor levels, lift access, carry distance, and packing material tiers. Once a quote is approved, the price is guaranteed fixed with zero sudden moving-day demands.',
    },
    {
      q: 'What is the DCM Trucking Cube solution?',
      a: 'The DCM Trucking Cube is an exclusive private modular container assigned exclusively to your consignment. You apply your own personal padlock at your pickup residence, keep the key, and unlock it upon arrival at destination. This eliminates any transshipment or mixing of goods with other consignments.',
    },
    {
      q: 'Do you provide local shifting services within Mohali, Chandigarh, and Panchkula?',
      a: 'Yes. We operate daily dedicated local shifting teams across all phases of Mohali (Phase 1 to 11, Aerocity, IT City, Sector 70–82), Chandigarh sectors, Panchkula, Zirakpur, and Kharar with express same-day pickup, loading, and setup.',
    },
    {
      q: 'Can DCM dismantle and reassemble heavy furniture like hydraulic beds and modular wardrobes?',
      a: 'Yes. Our trained carpentry crew specializes in dismantling and reassembling hydraulic king/queen storage beds, 3-door/4-door modular wardrobes, dining tables, and study workstations. Screws and brackets are sealed into labeled pouches for zero loss.',
    },
    {
      q: 'How are cars and two-wheelers transported safely?',
      a: 'Automobiles are transported in specialized enclosed car carrier trailers secured with 4-wheel safety clamps, avoiding highway stone chips and wear. Two-wheelers are drained of fuel, fitted onto specialized upright hydraulic stands, and packed with mirror foam guards.',
    },
    {
      q: 'What items are restricted from being loaded for safety?',
      a: 'For legal and fire safety compliance, DCM does not transport liquid fuel, gas cylinders, explosive items, cash, high-value jewelry, legal deeds, or perishable foodstuffs. We recommend keeping jewelry, keys, and personal identification in your personal travel luggage.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Customer Reviews Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950">
            Verified Experiences From Discerning Clients
          </h2>
          <p className="text-sm text-slate-600">
            Read authentic feedback from families, corporate executives, and defence personnel who moved with DCM from Mohali, Chandigarh, and across India.
          </p>
        </div>

        {/* Reviews Grid (Warm Card Aesthetics) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-amber-200/80 bg-[#FFFDF5] flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-amber-300" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200/60">
                <div className="font-extrabold text-sm text-blue-950">{r.name}</div>
                <div className="text-[11px] text-orange-600 font-semibold">{r.route}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{r.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions Header */}
        <div className="pt-8 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Clear &amp; Transparent Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-amber-200/80 bg-[#FFFDF5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-blue-950 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-amber-100 pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
