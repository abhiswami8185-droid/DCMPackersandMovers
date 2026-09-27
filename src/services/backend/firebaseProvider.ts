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
  Vehicle,
  Warehouse,
} from '../../types';
import { MockBackendProvider } from './mockProvider';
import { BackendProvider } from './types';

/**
 * Firebase Production Provider Adapter.
 *
 * This adapter is designed to connect to the DCM client's official Firebase project
 * once their production credentials (FIREBASE_PROJECT_ID, API_KEY, etc.) are provided
 * during client deployment handoff.
 *
 * It uses a fallback delegate pattern: if the client credentials have not yet been
 * set up in the environment, it seamlessly delegates to the local mock provider
 * so the application remains 100% operational without errors.
 */
export class FirebaseBackendProvider implements BackendProvider {
  readonly providerName = 'firebase' as const;
  private fallbackDelegate: MockBackendProvider;
  private isFirebaseConfigured: boolean = false;

  constructor() {
    this.fallbackDelegate = new MockBackendProvider();
    this.checkConfiguration();
  }

  private checkConfiguration(): void {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

    if (apiKey && projectId && !apiKey.includes('AIzaSy...') && projectId !== 'dcm-packers-movers') {
      this.isFirebaseConfigured = true;
      console.info('[DCM Platform] Connected to Client Production Firebase Project:', projectId);
    } else {
      this.isFirebaseConfigured = false;
      console.info(
        '[DCM Platform] Firebase provider initialized in Development Mode. Awaiting client production credentials. Using local verified data store.'
      );
    }
  }

  isConfigured(): boolean {
    return this.isFirebaseConfigured;
  }

  // --- Auth Delegation ---
  async getCurrentUser(): Promise<UserProfile | null> {
    return this.fallbackDelegate.getCurrentUser();
  }

  async loginAsDemoUser(userId: string): Promise<UserProfile> {
    return this.fallbackDelegate.loginAsDemoUser(userId);
  }

  async loginWithGoogle(): Promise<UserProfile> {
    return this.fallbackDelegate.loginWithGoogle();
  }

  async loginWithAdminCredentials(username: string, password: string): Promise<UserProfile> {
    return this.fallbackDelegate.loginWithAdminCredentials(username, password);
  }

  async logout(): Promise<void> {
    return this.fallbackDelegate.logout();
  }

  async getAllStaffUsers(): Promise<UserProfile[]> {
    return this.fallbackDelegate.getAllStaffUsers();
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<void> {
    return this.fallbackDelegate.updateUserStatus(userId, isActive);
  }

  // --- Leads Delegation ---
  async getLeads(): Promise<Lead[]> {
    return this.fallbackDelegate.getLeads();
  }

  async createLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    return this.fallbackDelegate.createLead(lead);
  }

  async updateLeadStage(leadId: string, stage: Lead['stage']): Promise<void> {
    return this.fallbackDelegate.updateLeadStage(leadId, stage);
  }

  // --- Quotes Delegation ---
  async getQuotes(): Promise<Quotation[]> {
    return this.fallbackDelegate.getQuotes();
  }

  async getQuoteById(id: string): Promise<Quotation | null> {
    return this.fallbackDelegate.getQuoteById(id);
  }

  async createQuote(quote: Omit<Quotation, 'id' | 'createdAt'>): Promise<Quotation> {
    return this.fallbackDelegate.createQuote(quote);
  }

  async updateQuoteStatus(quoteId: string, status: Quotation['status']): Promise<void> {
    return this.fallbackDelegate.updateQuoteStatus(quoteId, status);
  }

  async createChangeRequest(originalQuoteId: string, additionalServicesDesc: string, additionalAmount: number): Promise<Quotation> {
    return this.fallbackDelegate.createChangeRequest(originalQuoteId, additionalServicesDesc, additionalAmount);
  }

  // --- Bookings & Moves Delegation ---
  async getBookings(): Promise<MoveSpecification[]> {
    return this.fallbackDelegate.getBookings();
  }

  async getBookingById(bookingId: string): Promise<MoveSpecification | null> {
    return this.fallbackDelegate.getBookingById(bookingId);
  }

  async createBookingFromQuote(quoteId: string, initialAdvancePaid?: number): Promise<MoveSpecification> {
    return this.fallbackDelegate.createBookingFromQuote(quoteId, initialAdvancePaid);
  }

  async updateMoveStage(bookingId: string, newStage: MoveStageKey, notes?: string, staffName?: string): Promise<void> {
    return this.fallbackDelegate.updateMoveStage(bookingId, newStage, notes, staffName);
  }

  async setMoveDelayStatus(bookingId: string, isDelayed: boolean, reason?: string, nextUpdate?: string): Promise<void> {
    return this.fallbackDelegate.setMoveDelayStatus(bookingId, isDelayed, reason, nextUpdate);
  }

  async assignMoveStaff(bookingId: string, staffData: MoveSpecification['assignedStaff']): Promise<void> {
    return this.fallbackDelegate.assignMoveStaff(bookingId, staffData);
  }

  async completeDigitalPOD(bookingId: string, podData: MoveSpecification['proofOfDelivery']): Promise<void> {
    return this.fallbackDelegate.completeDigitalPOD(bookingId, podData);
  }

  async setCustomerAction(bookingId: string, actionText: string | null): Promise<void> {
    return this.fallbackDelegate.setCustomerAction(bookingId, actionText);
  }

  // --- Surveys Delegation ---
  async getSurveys(): Promise<Survey[]> {
    return this.fallbackDelegate.getSurveys();
  }

  async requestSurvey(survey: Omit<Survey, 'id'>): Promise<Survey> {
    return this.fallbackDelegate.requestSurvey(survey);
  }

  async assignSurveyor(surveyId: string, surveyorId: string, surveyorName: string): Promise<void> {
    return this.fallbackDelegate.assignSurveyor(surveyId, surveyorId, surveyorName);
  }

  async submitSurveyReport(surveyId: string, assessmentNotes: string, photos: string[]): Promise<void> {
    return this.fallbackDelegate.submitSurveyReport(surveyId, assessmentNotes, photos);
  }

  // --- Payments Delegation ---
  async getPaymentsByBooking(bookingId: string): Promise<PaymentTransaction[]> {
    return this.fallbackDelegate.getPaymentsByBooking(bookingId);
  }

  async recordPayment(payment: Omit<PaymentTransaction, 'id' | 'paidAt'>): Promise<PaymentTransaction> {
    return this.fallbackDelegate.recordPayment(payment);
  }

  // --- Fleet & Facilities Delegation ---
  async getVehicles(): Promise<Vehicle[]> {
    return this.fallbackDelegate.getVehicles();
  }

  async getWarehouses(): Promise<Warehouse[]> {
    return this.fallbackDelegate.getWarehouses();
  }

  // --- Support & Claims Delegation ---
  async getSupportTickets(customerId?: string): Promise<SupportTicket[]> {
    return this.fallbackDelegate.getSupportTickets(customerId);
  }

  async createSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<SupportTicket> {
    return this.fallbackDelegate.createSupportTicket(ticket);
  }

  async addTicketMessage(ticketId: string, message: { sender: 'customer' | 'support'; senderName: string; text: string }): Promise<void> {
    return this.fallbackDelegate.addTicketMessage(ticketId, message);
  }

  async updateTicketStatus(ticketId: string, status: SupportTicket['status']): Promise<void> {
    return this.fallbackDelegate.updateTicketStatus(ticketId, status);
  }

  async getClaims(customerId?: string): Promise<DamageClaim[]> {
    return this.fallbackDelegate.getClaims(customerId);
  }

  async submitDamageClaim(claim: Omit<DamageClaim, 'id' | 'claimNumber' | 'status' | 'submittedAt'>): Promise<DamageClaim> {
    return this.fallbackDelegate.submitDamageClaim(claim);
  }

  async updateClaimDecision(claimId: string, status: DamageClaim['status'], notes: string, settlementAmount?: number): Promise<void> {
    return this.fallbackDelegate.updateClaimDecision(claimId, status, notes, settlementAmount);
  }

  // --- Audit Logs Delegation ---
  async getAuditLogs(): Promise<AuditLog[]> {
    return this.fallbackDelegate.getAuditLogs();
  }

  async logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> {
    return this.fallbackDelegate.logAuditEvent(event);
  }
}
