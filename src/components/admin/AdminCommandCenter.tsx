import React, { useState, useEffect } from 'react';
import {
  AuditLog,
  DamageClaim,
  Lead,
  MoveSpecification,
  MoveStageKey,
  PaymentTransaction,
  Quotation,
  SupportTicket,
  Survey,
  UserProfile,
  UserRole,
  Vehicle,
  Warehouse,
} from '../../types';
import { backend } from '../../services/backend';
import { AdminThemeProvider } from './theme/AdminThemeContext';
import { AdminSidebar, AdminTabKey } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { DashboardTab } from './tabs/DashboardTab';
import { MovesTab } from './tabs/MovesTab';
import { LeadsTab } from './tabs/LeadsTab';
import { QuotesTab } from './tabs/QuotesTab';
import { SurveysTab } from './tabs/SurveysTab';
import { PaymentsTab } from './tabs/PaymentsTab';
import { FleetTab } from './tabs/FleetTab';
import { WarehousesTab } from './tabs/WarehousesTab';
import { SupportTab } from './tabs/SupportTab';
import { ClaimsTab } from './tabs/ClaimsTab';
import { StaffTab } from './tabs/StaffTab';
import { AuditTab } from './tabs/AuditTab';

interface AdminCommandCenterProps {
  currentUserRole: UserRole;
  onExitAdmin: () => void;
}

const TAB_TITLES: Record<AdminTabKey, string> = {
  dashboard: 'Command Dashboard Overview',
  moves: 'Move Lifecycle Operations',
  leads: 'Leads & CRM Pipeline',
  quotes: 'Quotations & Pricing Engine',
  surveys: 'Pre-Move Surveys & Access',
  payments: 'Payments & Billing Ledger',
  fleet: 'Fleet Management & Telemetry',
  warehouses: 'Warehousing & Storage Vaults',
  support: 'Support Desk Tickets',
  claims: 'Transit Insurance Claims',
  staff: 'Staff & Role-Based Access (RBAC)',
  audit: 'Security Audit Trail',
};

const AdminCommandCenterInner: React.FC<AdminCommandCenterProps> = ({
  currentUserRole,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Operational Data State
  const [bookings, setBookings] = useState<MoveSpecification[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotes, setQuotes] = useState<Quotation[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [staffUsers, setStaffUsers] = useState<UserProfile[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [claims, setClaims] = useState<DamageClaim[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Selected Booking for Deep Move Specification View
  const [selectedBooking, setSelectedBooking] = useState<MoveSpecification | null>(null);

  const loadAllData = async () => {
    try {
      const b = await backend.getBookings();
      setBookings(b);
      if (b.length > 0 && !selectedBooking) {
        setSelectedBooking(b[0]);
      }
      const l = await backend.getLeads();
      setLeads(l);
      const q = await backend.getQuotes();
      setQuotes(q);
      const s = await backend.getSurveys();
      setSurveys(s);
      const u = await backend.getAllStaffUsers();
      setStaffUsers(u);
      const v = await backend.getVehicles();
      setVehicles(v);
      const w = await backend.getWarehouses();
      setWarehouses(w);
      const al = await backend.getAuditLogs();
      setAuditLogs(al);
      const t = await backend.getSupportTickets();
      setTickets(t);
      const c = await backend.getClaims();
      setClaims(c);

      if (b.length > 0) {
        const p = await backend.getPaymentsByBooking(b[0].bookingId);
        setPayments(p);
      }
    } catch (err) {
      console.error('Error loading DCM Admin data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Action Handlers
  const handleStageTransition = async (bookingId: string, stage: MoveStageKey, notes: string) => {
    await backend.updateMoveStage(bookingId, stage, notes, 'Operations Supervisor');
    const updated = await backend.getBookingById(bookingId);
    setSelectedBooking(updated);
    await loadAllData();
  };

  const handleToggleDelay = async (
    bookingId: string,
    isDelayed: boolean,
    reason?: string,
    nextUpdate?: string
  ) => {
    await backend.setMoveDelayStatus(bookingId, isDelayed, reason, nextUpdate);
    const updated = await backend.getBookingById(bookingId);
    setSelectedBooking(updated);
    await loadAllData();
  };

  const handleUpdateClaim = async (
    claimId: string,
    status: DamageClaim['status'],
    notes: string,
    amount: number
  ) => {
    await backend.updateClaimDecision(claimId, status, notes, amount);
    await loadAllData();
  };

  const handleToggleUserActive = async (userId: string, currentActive: boolean) => {
    await backend.updateUserStatus(userId, !currentActive);
    await loadAllData();
  };

  const counts = {
    moves: bookings.length,
    leads: leads.length,
    quotes: quotes.length,
    surveys: surveys.length,
    fleet: vehicles.length,
    warehouses: warehouses.length,
    support: tickets.length,
    claims: claims.length,
    staff: staffUsers.length,
    audit: auditLogs.length,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 1. Admin Left Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setMobileSidebarOpen(false);
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        counts={counts}
        currentUserRole={currentUserRole}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Professional Admin Bar */}
        <AdminTopBar
          activeTabTitle={TAB_TITLES[activeTab]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentUserRole={currentUserRole}
          onExitAdmin={onExitAdmin}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Tab Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardTab
                bookings={bookings}
                leads={leads}
                onSelectMove={(b) => {
                  setSelectedBooking(b);
                  setActiveTab('moves');
                }}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'moves' && (
              <MovesTab
                bookings={bookings}
                selectedBooking={selectedBooking}
                onSelectBooking={setSelectedBooking}
                onUpdateStage={handleStageTransition}
                onToggleDelay={handleToggleDelay}
              />
            )}

            {activeTab === 'leads' && (
              <LeadsTab leads={leads} />
            )}

            {activeTab === 'quotes' && (
              <QuotesTab quotes={quotes} />
            )}

            {activeTab === 'surveys' && (
              <SurveysTab surveys={surveys} />
            )}

            {activeTab === 'payments' && (
              <PaymentsTab payments={payments} />
            )}

            {activeTab === 'fleet' && (
              <FleetTab vehicles={vehicles} />
            )}

            {activeTab === 'warehouses' && (
              <WarehousesTab warehouses={warehouses} />
            )}

            {activeTab === 'support' && (
              <SupportTab tickets={tickets} />
            )}

            {activeTab === 'claims' && (
              <ClaimsTab
                claims={claims}
                onUpdateClaim={handleUpdateClaim}
              />
            )}

            {activeTab === 'staff' && (
              <StaffTab
                staffUsers={staffUsers}
                onToggleActive={handleToggleUserActive}
              />
            )}

            {activeTab === 'audit' && (
              <AuditTab auditLogs={auditLogs} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export const AdminCommandCenter: React.FC<AdminCommandCenterProps> = (props) => {
  return (
    <AdminThemeProvider>
      <AdminCommandCenterInner {...props} />
    </AdminThemeProvider>
  );
};
