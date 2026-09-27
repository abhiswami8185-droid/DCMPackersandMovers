import React from 'react';
import { DcmLogo } from '../brand/DcmLogo';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Clock,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

interface FooterProps {
  onOpenQuoteWizard: () => void;
  onOpenTracker: () => void;
  onOpenCustomerPortal: () => void;
  onOpenAdminPortal: () => void;
  onOpenStaffApp: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuoteWizard,
  onOpenTracker,
  onOpenCustomerPortal,
  onOpenAdminPortal,
  onOpenStaffApp,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top CTA Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              15+ Years of Safe Relocations
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready For A Safe &amp; Organized Move?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an instant itemized quote with zero hidden charges or speak directly with our Mohali/Chandigarh moving coordinator.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteWizard}
              className="btn-3d-orange h-11 px-6 text-xs sm:text-sm font-bold"
            >
              Get Free Moving Quote
            </button>
            <a
              href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
              className="btn-3d-white h-11 px-5 text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{DCM_CONTACT.primaryPhone}</span>
            </a>
          </div>
        </div>

        {/* 5-Column Navigation Grid as specified in Section 21 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: DCM Logo & Company Description */}
          <div className="space-y-4">
            <DcmLogo size="sm" inverted className="brightness-110" />
            <p className="text-slate-400 text-xs leading-relaxed">
              DCM Packers &amp; Movers was established in 2010. We are an ISO certified Indian relocation company providing household shifting, office relocation, vehicle carrier, and safe warehousing services nationwide.
            </p>
            <div className="text-[11px] text-orange-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Move • Happy You</span>
            </div>
          </div>

          {/* Column 2: About Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
              About DCM
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-white transition-colors">
                  About Us (Since 2010)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-white transition-colors">
                  Vision &amp; Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-white transition-colors">
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('special-solutions')} className="hover:text-white transition-colors">
                  DCM Special Handling
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomerPortal} className="hover:text-white transition-colors">
                  Customer Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Relocation Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-white transition-colors">
                  Household Shifting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-white transition-colors">
                  Local Shifting (Mohali/Tri-City)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-white transition-colors">
                  Office &amp; Corporate Shifting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('vehicles')} className="hover:text-white transition-colors">
                  Car Carrier Transportation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('vehicles')} className="hover:text-white transition-colors">
                  Bike Transportation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('warehousing')} className="hover:text-white transition-colors">
                  Warehousing &amp; Storage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-white transition-colors">
                  Packing &amp; Unpacking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Directory */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
              Contact Directory
            </h4>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>{DCM_CONTACT.headOffice.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`} className="text-white hover:text-orange-400 font-bold">
                  {DCM_CONTACT.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${DCM_CONTACT.alternatePhone.replace(/\s+/g, '')}`} className="hover:text-orange-400">
                  {DCM_CONTACT.alternatePhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${DCM_CONTACT.email}`} className="text-white hover:underline">
                  {DCM_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Follow Us (Verified Clickable Social Links) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1.5">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-2 text-slate-400">
              <a
                href={DCM_CONTACT.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="DCM Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={DCM_CONTACT.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="DCM Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={DCM_CONTACT.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="DCM Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={DCM_CONTACT.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="DCM YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={DCM_CONTACT.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="DCM LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>Operating Hours: 8:00 AM – 9:00 PM</div>
              <div>24x7 Emergency Move Support</div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdminPortal}
                className="text-[10px] text-slate-500 hover:text-slate-300 underline"
              >
                Admin Command Center Login
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} DCM Packers and Movers Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Consignment Conditions</span>
            <span>·</span>
            <span>Transit Protection</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
