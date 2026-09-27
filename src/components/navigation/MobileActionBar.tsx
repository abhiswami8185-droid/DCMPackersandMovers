import React from 'react';
import { Phone, MessageSquare, Mail, FileText } from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

interface MobileActionBarProps {
  onOpenQuoteWizard: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenQuoteWizard }) => {
  return (
    <aside aria-label="Mobile quick contact bar" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 shadow-lg px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {/* 1. WhatsApp */}
        <a
          href={DCM_CONTACT.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-0.5">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold leading-none">WhatsApp</span>
        </a>

        {/* 2. Call Now */}
        <a
          href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-blue-950 hover:bg-blue-50 active:bg-blue-100 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mb-0.5">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold leading-none">Call Now</span>
        </a>

        {/* 3. Email */}
        <a
          href={`mailto:${DCM_CONTACT.email}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-0.5">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold leading-none">Email</span>
        </a>

        {/* 4. Enquiry / Quote CTA */}
        <button
          onClick={onOpenQuoteWizard}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-orange-600 active:bg-orange-700 text-white shadow-2xs transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mb-0.5">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold leading-none">Enquiry</span>
        </button>
      </div>
    </aside>
  );
};
