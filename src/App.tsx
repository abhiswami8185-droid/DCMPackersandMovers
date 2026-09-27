import React, { useState } from 'react';
import { UserRole, MoveType } from './types';
import { EcosystemBar } from './components/navigation/EcosystemBar';
import { PublicNavbar } from './components/navigation/PublicNavbar';
import { HeroSection } from './components/public/HeroSection';
import { ServicesSection } from './components/public/ServicesSection';
import { SpecialSolutionsSection } from './components/public/SpecialSolutionsSection';
import { MoveProcessSection } from './components/public/MoveProcessSection';
import { WarehousingAndVehicleSection } from './components/public/WarehousingAndVehicleSection';
import { WhyDcmSection } from './components/public/WhyDcmSection';
import { ReviewsAndFaqSection } from './components/public/ReviewsAndFaqSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { WhatsAppWidget } from './components/public/WhatsAppWidget';
import { MobileActionBar } from './components/navigation/MobileActionBar';
import { BookingWizard } from './components/public/BookingWizard';
import { TrackMoveView } from './components/public/TrackMoveView';
import { CustomerPortal } from './components/public/CustomerPortal';
import { AdminCommandCenter } from './components/admin/AdminCommandCenter';
import { StaffMobileApp } from './components/staff/StaffMobileApp';
import { LifecycleTourModal } from './components/common/LifecycleTourModal';

export default function App() {
  // Top ecosystem view: 'public' | 'admin' | 'staff'
  const [currentView, setCurrentView] = useState<'public' | 'admin' | 'staff'>('public');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('customer');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Modals & Sub-views on Public
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState(false);
  const [quoteWizardInitialData, setQuoteWizardInitialData] = useState<{
    fromCity?: string;
    toCity?: string;
    movingDate?: string;
    moveType?: MoveType;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }>({});

  const [activePublicSubView, setActivePublicSubView] = useState<'home' | 'tracker' | 'portal'>('home');
  const [trackedBookingId, setTrackedBookingId] = useState('DCM-2026-000123');

  const handleStartEstimate = (initialData: {
    fromCity: string;
    toCity: string;
    movingDate: string;
    moveType: MoveType;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }) => {
    setQuoteWizardInitialData(initialData);
    setIsQuoteWizardOpen(true);
  };

  const handleOpenTracker = (bookingId?: string) => {
    if (bookingId) setTrackedBookingId(bookingId);
    setActivePublicSubView('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomerPortal = () => {
    setActivePublicSubView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    setActivePublicSubView('home');
    setActiveSection(sectionId);
    setTimeout(() => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleBookingCreated = (bookingId: string) => {
    setTrackedBookingId(bookingId);
    setTimeout(() => {
      setActivePublicSubView('tracker');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. Global Ecosystem Bar (Switch between Public, Admin, Staff & Roles) */}
      <EcosystemBar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUserRole={currentUserRole}
        onRoleChange={(role) => setCurrentUserRole(role)}
        onOpenTour={() => setIsTourOpen(true)}
      />

      {/* 2. Main Viewport Rendering Based on Ecosystem Selection */}
      {currentView === 'admin' ? (
        /* Admin Command Center */
        <AdminCommandCenter
          currentUserRole={currentUserRole}
          onExitAdmin={() => setCurrentView('public')}
        />
      ) : currentView === 'staff' ? (
        /* Staff Mobile App (Android / iOS Flutter Simulator) */
        <StaffMobileApp onExitStaffApp={() => setCurrentView('public')} />
      ) : (
        /* Public Customer Website */
        <div className="flex-1 flex flex-col">
          {/* Public Navbar with active indicator */}
          <PublicNavbar
            activeSection={activeSection}
            onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)}
            onOpenTracker={() => handleOpenTracker()}
            onOpenCustomerPortal={handleOpenCustomerPortal}
            onNavigateSection={handleNavigateSection}
          />

          {/* Sub-view rendering on Public site */}
          {activePublicSubView === 'tracker' ? (
            <div className="flex-1">
              <div className="bg-slate-900 text-white py-3 px-4 text-xs font-semibold flex items-center justify-between">
                <span>Currently Viewing: Consignment Live Tracker</span>
                <button
                  onClick={() => setActivePublicSubView('home')}
                  className="text-orange-400 hover:underline"
                >
                  ← Back to Home
                </button>
              </div>
              <TrackMoveView
                initialBookingId={trackedBookingId}
                onClose={() => setActivePublicSubView('home')}
                onOpenCustomerPortal={handleOpenCustomerPortal}
              />
            </div>
          ) : activePublicSubView === 'portal' ? (
            <div className="flex-1">
              <div className="bg-slate-900 text-white py-3 px-4 text-xs font-semibold flex items-center justify-between">
                <span>Currently Viewing: Customer Account &amp; Move Manager</span>
                <button
                  onClick={() => setActivePublicSubView('home')}
                  className="text-orange-400 hover:underline"
                >
                  ← Back to Home
                </button>
              </div>
              <CustomerPortal
                onOpenTrackerForBooking={handleOpenTracker}
                onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)}
              />
            </div>
          ) : (
            /* Home Page Sections */
            <main className="flex-1">
              {/* Hero Section with Quick Estimate Widget */}
              <HeroSection
                onStartEstimate={handleStartEstimate}
                onOpenTracker={() => handleOpenTracker()}
              />

              {/* Services Section */}
              <ServicesSection
                onSelectService={(serviceName) => {
                  setQuoteWizardInitialData({
                    fromCity: 'Mohali',
                    toCity: 'New Delhi',
                  });
                  setIsQuoteWizardOpen(true);
                }}
              />

              {/* Proprietary DCM Special Handling Solutions */}
              <SpecialSolutionsSection onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)} />

              {/* 5-Step Move Process & 4-Layer Packing Formula */}
              <MoveProcessSection onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)} />

              {/* Warehousing & Vehicle Transportation */}
              <WarehousingAndVehicleSection onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)} />

              {/* Why DCM & About DCM */}
              <WhyDcmSection />

              {/* Customer Reviews & Detailed FAQ */}
              <ReviewsAndFaqSection />

              {/* Contact Information & Regional Branch Offices */}
              <ContactSection />
            </main>
          )}

          {/* Master 5-Column Footer */}
          <Footer
            onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)}
            onOpenTracker={() => handleOpenTracker()}
            onOpenCustomerPortal={handleOpenCustomerPortal}
            onOpenAdminPortal={() => setCurrentView('admin')}
            onOpenStaffApp={() => setCurrentView('staff')}
            onNavigateSection={handleNavigateSection}
          />

          {/* Floating WhatsApp Quick Contact Widget */}
          <WhatsAppWidget />

          {/* Sleek Mobile Bottom Fixed Action Bar (Section 22) */}
          <MobileActionBar onOpenQuoteWizard={() => setIsQuoteWizardOpen(true)} />

          {/* Multi-Step Smart Quote & Booking Wizard Modal */}
          <BookingWizard
            isOpen={isQuoteWizardOpen}
            onClose={() => setIsQuoteWizardOpen(false)}
            initialData={quoteWizardInitialData}
            onBookingCreated={handleBookingCreated}
          />
        </div>
      )}

      {/* 18-Step Full Relocation Lifecycle Guided Tour Modal */}
      <LifecycleTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onJumpToView={(view, subView) => {
          setCurrentView(view);
          if (view === 'public' && subView) {
            setActivePublicSubView(subView as any);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
