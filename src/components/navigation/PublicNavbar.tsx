import React, { useState, useRef, useEffect } from 'react';
import { DcmLogo } from '../brand/DcmLogo';
import {
  Phone,
  Search,
  Menu,
  X,
  ArrowRight,
  User,
  ChevronDown,
  Truck,
  Package,
  Layers,
  ShieldCheck,
  Building2,
  Home,
  Globe,
  Car,
  Warehouse,
  Boxes,
  Container,
  Sparkles,
} from 'lucide-react';
import { DCM_CONTACT } from '../../config/dcmConfig';

interface PublicNavbarProps {
  activeSection: string;
  onOpenQuoteWizard: () => void;
  onOpenTracker: () => void;
  onOpenCustomerPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  targetSection: string;
  externalUrl: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceGroup {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  services: ServiceItem[];
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  activeSection,
  onOpenQuoteWizard,
  onOpenTracker,
  onOpenCustomerPortal,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setServicesMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 180);
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const handleServiceSelect = (service: ServiceItem) => {
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    onNavigateSection(service.targetSection);
  };

  // Structured DCM Services logically grouped as strictly required by prompt
  const serviceGroups: ServiceGroup[] = [
    {
      category: 'MOVING & RELOCATION',
      icon: Home,
      services: [
        {
          id: 'household-shifting',
          name: 'Household Shifting',
          desc: '1-4 BHK & villa residential packing & moving',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/household-shifting/',
          icon: Home,
        },
        {
          id: 'office-shifting',
          name: 'Office Shifting',
          desc: 'Corporate workstations, IT racks & weekend moves',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/office-shifting/',
          icon: Building2,
        },
        {
          id: 'domestic-moving-services',
          name: 'Domestic Moving Services',
          desc: 'Interstate container moves across 28 Indian States',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/domestic-moving-services/',
          icon: Truck,
        },
        {
          id: 'international-moving',
          name: 'International Moving',
          desc: 'Overseas relocation, customs clearance & air/sea cargo',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/international-moving/',
          icon: Globe,
        },
      ],
    },
    {
      category: 'PACKING & HANDLING',
      icon: Package,
      services: [
        {
          id: 'packing-unpacking',
          name: 'Packing & Unpacking',
          desc: '4-layer protective materials & organized unpacking',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/packing-unpacking/',
          icon: Package,
        },
        {
          id: 'loading-unloading',
          name: 'Loading & Unloading',
          desc: 'Hydraulic lifters, stair-carry teams & safety ramps',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/loading-unloading/',
          icon: Layers,
        },
        {
          id: 'special-handling',
          name: 'Special Handling',
          desc: 'Trucking Cubes, LED boxes & antique crating',
          targetSection: 'special-solutions',
          externalUrl: 'https://dcmpackersmovers.com/',
          badge: 'Exclusive',
          icon: Sparkles,
        },
        {
          id: 'goods-insurance',
          name: 'Goods Insurance',
          desc: 'Comprehensive 100% door-to-door transit coverage',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/goods-insurance/',
          icon: ShieldCheck,
        },
      ],
    },
    {
      category: 'TRANSPORTATION & VEHICLES',
      icon: Truck,
      services: [
        {
          id: 'transportation',
          name: 'Transportation',
          desc: 'Sealed metal GPS-tracked container transport fleet',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/transportation/',
          icon: Truck,
        },
        {
          id: 'car-bike-carrier',
          name: 'Car & Bike Carrier',
          desc: 'Enclosed hydraulic car trailers & upright bike crates',
          targetSection: 'vehicles',
          externalUrl: 'https://dcmpackersmovers.com/car-bike-carrier/',
          badge: 'Enclosed',
          icon: Car,
        },
      ],
    },
    {
      category: 'LOGISTICS & STORAGE',
      icon: Warehouse,
      services: [
        {
          id: 'warehouse-storage-services',
          name: 'Warehouse & Storage Services',
          desc: 'CCTV-monitored palletized short & long-term vaults',
          targetSection: 'warehousing',
          externalUrl: 'https://dcmpackersmovers.com/warehouse-storage-services/',
          icon: Warehouse,
        },
        {
          id: 'supply-chain',
          name: 'Supply Chain',
          desc: 'Commercial distribution, freight management & 3PL',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/supply-chain/',
          icon: Boxes,
        },
        {
          id: 'exim-cargo',
          name: 'Exim Cargo',
          desc: 'Export-import port forwarding & bonded trucking',
          targetSection: 'services',
          externalUrl: 'https://dcmpackersmovers.com/exim-cargo/',
          icon: Container,
        },
      ],
    },
  ];

  // Main Desktop Navigation Items (Exact structure: How It Works, Warehousing, Why DCM, About DCM, Contact Us)
  const navLinks = [
    { id: 'process', label: 'How It Works' },
    { id: 'warehousing', label: 'Warehousing' },
    { id: 'why-dcm', label: 'Why DCM' },
    { id: 'about', label: 'About DCM' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const isServicesActive =
    activeSection === 'services' ||
    activeSection === 'special-solutions' ||
    activeSection === 'vehicles';

  return (
    <header className="sticky top-0 lg:top-[31px] z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.04)]">
      {/* SINGLE CLEAN, PREMIUM NAVIGATION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Exact DCM Logo with comfortable proportional whitespace */}
          <div
            className="flex items-center cursor-pointer shrink-0 pr-6 lg:pr-8 py-2"
            onClick={() => handleNavClick('hero')}
            title="DCM Packers and Movers - Return to Homepage"
          >
            <DcmLogo size="md" className="transition-transform duration-150 hover:scale-[1.01]" />
          </div>

          {/* CENTER: Main Desktop Navigation (Clean, Spacious, Subtle 3D Liquid-Glass) */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            
            {/* 1. SERVICES DROPDOWN MEGA-MENU BUTTON */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={triggerRef}
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className={`nav-liquid-glass flex items-center gap-1.5 ${
                  isServicesActive || servicesMenuOpen ? 'is-active' : ''
                }`}
                aria-expanded={servicesMenuOpen}
                aria-haspopup="true"
                title="View All DCM Packers & Movers Services"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    servicesMenuOpen ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {/* SERVICES MEGA-MENU CONTAINER */}
              {servicesMenuOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-[840px] xl:w-[920px] z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_45px_-12px_rgba(11,59,138,0.15),0_4px_16px_rgba(15,23,42,0.06)] overflow-hidden">
                    
                    {/* Mega Menu Top Header Bar */}
                    <div className="bg-[#FFFDF5] px-6 py-3.5 border-b border-amber-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-2xs">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-blue-950 block">
                            OUR SERVICES
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            15+ Years of trusted packing, shifting &amp; nationwide logistics
                          </span>
                        </div>
                      </div>

                      {/* Main Services Landing Page Link */}
                      <a
                        href="https://dcmpackersmovers.com/our-services/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-white hover:bg-orange-50/80 border border-orange-200/80 px-3.5 py-1.5 rounded-lg transition-all shadow-2xs hover:shadow-xs group"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* 4 Logical Service Columns (Preserved Grouping per User Instructions) */}
                    <div className="p-6 grid grid-cols-4 gap-5 bg-white">
                      {serviceGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-3">
                          {/* Column Header */}
                          <div className="pb-2 border-b border-slate-100 flex items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-950 block">
                              {group.category}
                            </span>
                          </div>

                          {/* Service Items in Column */}
                          <div className="space-y-1">
                            {group.services.map((service) => {
                              const ItemIcon = service.icon;
                              return (
                                <button
                                  key={service.id}
                                  onClick={() => handleServiceSelect(service)}
                                  className="w-full text-left p-2 rounded-xl hover:bg-slate-50 hover:border-slate-200 border border-transparent transition-all group block cursor-pointer"
                                >
                                  <div className="flex items-start gap-2">
                                    <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-orange-500 group-hover:text-white text-slate-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                      <ItemIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-tight">
                                          {service.name}
                                        </span>
                                        {service.badge && (
                                          <span className="text-[9px] font-extrabold text-orange-700 bg-orange-100/90 px-1.5 py-0.2 rounded leading-none shrink-0">
                                            {service.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-500 leading-snug line-clamp-1 mt-0.5 group-hover:text-slate-700">
                                        {service.desc}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mega Menu Bottom Quick Bar */}
                    <div className="bg-[#FFFDF5] px-6 py-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="font-semibold text-blue-950">Need custom shifting advice?</span>
                        <span className="text-slate-400">|</span>
                        <span>Direct coordination with certified move manager</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={DCM_CONTACT.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold hover:underline"
                        >
                          <span>WhatsApp Desk (+91 9779593495)</span>
                        </a>
                        <button
                          onClick={() => {
                            setServicesMenuOpen(false);
                            onOpenQuoteWizard();
                          }}
                          className="btn-3d-orange h-7.5 px-3 text-xs font-bold"
                        >
                          Instant Estimate
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2-6. REMAINING DESKTOP NAVIGATION ITEMS */}
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-liquid-glass ${isActive ? 'is-active' : ''}`}
                  title={`View ${link.label}`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Action Buttons (Track My Move, Get a Quote, Customer Portal) */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* 1. Track My Move (Secondary Action — Clean Corporate Style) */}
            <button
              onClick={onOpenTracker}
              className="btn-3d-navy h-10 px-3.5 xl:px-4 text-xs font-bold cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              title="Track shipment milestone status"
            >
              <Search className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden xl:inline">Track My Move</span>
              <span className="xl:hidden">Track</span>
            </button>

            {/* 2. Get a Quote (Primary CTA — DCM Orange Accent, Clear Call to Action) */}
            <button
              onClick={onOpenQuoteWizard}
              className="btn-3d-orange h-10 px-4 xl:px-5 text-xs font-bold cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              title="Get a free moving quotation"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 3. Customer Portal (Utility / Account Access — Clean Text / Light Border Button) */}
            <button
              onClick={onOpenCustomerPortal}
              className="btn-3d-white h-10 px-3 xl:px-3.5 text-xs font-bold cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              title="My Bookings, Invoices & Documents"
            >
              <User className="w-3.5 h-3.5 text-blue-900" />
              <span className="hidden 2xl:inline">Customer Portal</span>
            </button>
          </div>

          {/* Mobile Menu Toggle & Fast Action */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQuoteWizard}
              className="btn-3d-orange h-9 px-3 text-xs font-bold"
            >
              Get Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE SLIDE-DOWN DRAWER (Uncluttered, fast access to WhatsApp and Call from inside the menu) */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFFDF5] border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-150 max-h-[85vh] overflow-y-auto">
          {/* Quick Actions in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-amber-200/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteWizard();
              }}
              className="btn-3d-orange h-10 text-xs w-full justify-center"
            >
              Get a Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="btn-3d-navy h-10 text-xs w-full justify-center"
            >
              Track Move
            </button>
          </div>

          <div className="space-y-1 text-sm font-semibold text-slate-700">
            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-amber-200/70 bg-white overflow-hidden">
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="w-full text-left py-2.5 px-3 font-bold text-blue-950 flex items-center justify-between bg-amber-50/50"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-600" />
                  <span>Services (13 Solutions)</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 transition-transform ${
                    mobileServicesExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileServicesExpanded && (
                <div className="p-2 space-y-3 bg-white border-t border-amber-100">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      Catalog Categories
                    </span>
                    <a
                      href="https://dcmpackersmovers.com/our-services/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1"
                    >
                      <span>All Services</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {serviceGroups.map((group, idx) => (
                    <div key={idx} className="space-y-1 pt-1 border-t border-slate-100 first:border-0 first:pt-0">
                      <span className="text-[10px] font-black text-blue-950 block px-2 tracking-wider">
                        {group.category}
                      </span>
                      {group.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full text-left py-1.5 px-2 rounded-lg hover:bg-amber-50 text-xs text-slate-700 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                            <span className="font-medium">{service.name}</span>
                          </div>
                          {service.badge && (
                            <span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-1 py-0.2 rounded">
                              {service.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other Mobile Nav Items */}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-100/50 hover:text-blue-950 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-400">›</span>
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomerPortal();
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-blue-900 font-bold flex items-center justify-between mt-2"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-800" />
                <span>Customer Portal (My Moves)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-800" />
            </button>

            {/* Direct WhatsApp Quick Chat inside Mobile Menu (NOT crowding the top header) */}
            <a
              href={DCM_CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-between mt-2"
            >
              <div className="flex items-center gap-2">
                {/* Official WhatsApp SVG Icon */}
                <svg
                  className="w-4 h-4 text-emerald-600 fill-current shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.761.78 2.79.78 3.182 0 5.768-2.587 5.768-5.766.001-3.187-2.575-5.766-5.767-5.766zm3.374 8.204c-.145.411-.844.789-1.155.83-.312.041-.692.052-2.148-.549-1.748-.72-2.883-2.483-2.97-2.6-.088-.117-.709-.942-.709-1.796 0-.854.449-1.274.608-1.448.16-.174.348-.217.464-.217.116 0 .232.001.334.006.107.006.251-.041.392.298.145.348.494 1.204.537 1.292.043.087.072.189.014.305-.058.116-.087.189-.174.29-.087.102-.184.227-.263.305-.088.087-.18.181-.077.357.102.175.455.751.976 1.216.671.597 1.236.782 1.411.87.174.087.276.073.378-.044.102-.116.436-.508.552-.682.116-.174.232-.145.392-.087.16.058 1.016.479 1.19.566.174.087.29.131.334.204.043.072.043.421-.102.832z" />
                </svg>
                <span>WhatsApp Relocation Desk</span>
              </div>
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-semibold">
                Chat Now
              </span>
            </a>
          </div>

          {/* Mobile Footer Call Button */}
          <div className="pt-2 text-xs text-slate-600 flex items-center justify-between border-t border-amber-200/80">
            <span className="flex items-center gap-1 font-medium">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>24x7 Hotline:</span>
            </span>
            <a
              href={`tel:${DCM_CONTACT.primaryPhone.replace(/\s+/g, '')}`}
              className="font-bold text-orange-600 hover:underline"
            >
              {DCM_CONTACT.primaryPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
