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

export interface BackendProvider {
  // Provider Info
  readonly providerName: 'mock' | 'firebase';
  isConfigured(): boolean;

  // Authentication
  getCurrentUser(): Promise<UserProfile | null>;
  loginAsDemoUser(userId: string): Promise<UserProfile>;
  loginWithGoogle(): Promise<UserProfile>;
  loginWithAdminCredentials(username: string, password: string): Promise<UserProfile>;
  logout(): Promise<void>;
  getAllStaffUsers(): Promise<UserProfile[]>;
  updateUserStatus(userId: string, isActive: boolean): Promise<void>;

  // Leads & CRM
  getLeads(): Promise<Lead[]>;
  createLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead>;
  updateLeadStage(leadId: string, stage: Lead['stage']): Promise<void>;

  // Quotations
  getQuotes(): Promise<Quotation[]>;
  getQuoteById(id: string): Promise<Quotation | null>;
  createQuote(quote: Omit<Quotation, 'id' | 'createdAt'>): Promise<Quotation>;
  updateQuoteStatus(quoteId: string, status: Quotation['status']): Promise<void>;
  createChangeRequest(originalQuoteId: string, additionalServicesDesc: string, additionalAmount: number): Promise<Quotation>;

  // Moves & Bookings
  getBookings(): Promise<MoveSpecification[]>;
  getBookingById(bookingId: string): Promise<MoveSpecification | null>;
  createBookingFromQuote(quoteId: string, initialAdvancePaid?: number): Promise<MoveSpecification>;
  updateMoveStage(bookingId: string, newStage: MoveStageKey, notes?: string, staffName?: string): Promise<void>;
  setMoveDelayStatus(bookingId: string, isDelayed: boolean, reason?: string, nextUpdate?: string): Promise<void>;
  assignMoveStaff(bookingId: string, staffData: MoveSpecification['assignedStaff']): Promise<void>;
  completeDigitalPOD(bookingId: string, podData: MoveSpecification['proofOfDelivery']): Promise<void>;
  setCustomerAction(bookingId: string, actionText: string | null): Promise<void>;

  // Surveys
  getSurveys(): Promise<Survey[]>;
  requestSurvey(survey: Omit<Survey, 'id'>): Promise<Survey>;
  assignSurveyor(surveyId: string, surveyorId: string, surveyorName: string): Promise<void>;
  submitSurveyReport(surveyId: string, assessmentNotes: string, photos: string[]): Promise<void>;

  // Payments
  getPaymentsByBooking(bookingId: string): Promise<PaymentTransaction[]>;
  recordPayment(payment: Omit<PaymentTransaction, 'id' | 'paidAt'>): Promise<PaymentTransaction>;

  // Fleet & Facilities
  getVehicles(): Promise<Vehicle[]>;
  getWarehouses(): Promise<Warehouse[]>;

  // Support & Claims
  getSupportTickets(customerId?: string): Promise<SupportTicket[]>;
  createSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<SupportTicket>;
  addTicketMessage(ticketId: string, message: { sender: 'customer' | 'support'; senderName: string; text: string }): Promise<void>;
  updateTicketStatus(ticketId: string, status: SupportTicket['status']): Promise<void>;

  getClaims(customerId?: string): Promise<DamageClaim[]>;
  submitDamageClaim(claim: Omit<DamageClaim, 'id' | 'claimNumber' | 'status' | 'submittedAt'>): Promise<DamageClaim>;
  updateClaimDecision(claimId: string, status: DamageClaim['status'], notes: string, settlementAmount?: number): Promise<void>;

  // Audit Logs
  getAuditLogs(): Promise<AuditLog[]>;
  logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void>;
}
