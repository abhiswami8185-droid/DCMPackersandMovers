import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

interface WhatsAppWidgetProps {
  defaultOpen?: boolean;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [customMessage, setCustomMessage] = useState('');

  const quickTopics = [
    {
      icon: '🚚',
      title: 'Get Free Moving Estimate',
      desc: 'Instant pricing for home or office relocation',
      prefill: 'Hello DCM Packers & Movers, I would like to get a free estimate for shifting my goods.',
    },
    {
      icon: '📍',
      title: 'Track My Consignment',
      desc: 'Get live milestone status from dispatch',
      prefill: 'Hello DCM Team, I want to track the status of my consignment/booking.',
    },
    {
      icon: '🚗',
      title: 'Car & Bike Carrier Quote',
      desc: 'Enclosed hydraulic vehicle transport',
      prefill: 'Hello, I need pricing and transit schedule for transporting my car / two-wheeler.',
    },
    {
      icon: '🏢',
      title: 'Warehousing & Safe Storage',
      desc: 'Moisture-controlled household/office storage',
      prefill: 'Hello DCM, I am looking for clean and secure warehouse storage facilities.',
    },
    {
      icon: '📞',
      title: 'Request Priority Callback',
      desc: 'Speak directly with a senior relocation manager',
      prefill: 'Hello DCM Support, please arrange a quick callback regarding my upcoming relocation.',
    },
  ];

  const handleLaunchWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text.trim() || 'Hello DCM Packers & Movers, I need relocation assistance.');
    const targetPhone = '919779593495'; // DCM Official Verified WhatsApp Phone
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleLaunchWhatsApp(customMessage);
    setCustomMessage('');
  };

  return (
    <div className="fixed bottom-18 md:bottom-6 right-4 sm:right-6 z-45 flex flex-col items-end">
      {/* 1. EXPANDED POPUP DIALOG */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F4E34] to-[#128C7E] text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#128C7E] font-extrabold text-base shadow-sm ring-2 ring-emerald-300">
                  DCM
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm leading-snug">
                  <span>DCM Packers &amp; Movers</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-emerald-500/20" />
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Official Business Account • Online</span>
                </div>
              </div>
            </div>

            <p className="mt-2.5 text-[11px] text-emerald-100/90 leading-relaxed bg-black/10 px-2.5 py-1.5 rounded-lg border border-white/10">
              ⚡ Typical response time: <span className="text-white font-semibold">Under 2 minutes</span>. Direct connection with Mohali &amp; Chandigarh dispatch.
            </p>
          </div>

          {/* Body */}
          <div className="p-3.5 bg-[#FAF6EE] max-h-[380px] overflow-y-auto space-y-3">
            {/* Automated Greetings Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs text-xs text-slate-700 space-y-1.5 border border-amber-100">
              <p className="font-semibold text-slate-900">
                Namaste! 🙏 Welcome to DCM Packers &amp; Movers.
              </p>
              <p className="text-slate-600 leading-relaxed text-[11.5px]">
                How can our relocation consultants assist you today? Select a topic below to chat instantly on WhatsApp:
              </p>
              <span className="block text-[10px] text-slate-400 text-right">Just now</span>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 block px-1">
                Frequently Requested:
              </span>
              {quickTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLaunchWhatsApp(topic.prefill)}
                  className="w-full text-left bg-white hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 p-2.5 rounded-xl transition-all flex items-start gap-2.5 group shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <span className="text-lg shrink-0 mt-0.5">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 flex items-center justify-between">
                      <span>{topic.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{topic.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Direct Call Prompt */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <div>
                  <span className="text-[11px] block text-slate-500">Urgent move enquiry?</span>
                  <span className="font-bold text-blue-950">{DCM_CONTACT.primaryPhone}</span>
                </div>
              </div>
              <a
                href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
                className="bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <form onSubmit={handleCustomSubmit} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your relocation question..."
              className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={!customMessage.trim()}
              className="bg-[#25D366] hover:bg-[#20ba5a] disabled:opacity-40 text-white p-2 rounded-xl transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed shrink-0"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 hover:bg-white text-slate-800 font-bold text-xs py-2 px-3 rounded-full shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all hover:scale-102 cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Chat on WhatsApp</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
              Fast Reply
            </span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp conversation"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-emerald-500/20"
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <>
              {/* WhatsApp custom vector icon */}
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-black text-white">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
