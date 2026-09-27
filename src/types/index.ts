/**
 * DCM Packers & Movers — Complete Domain Model & System Types
 */

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'sales_manager'
  | 'operations_manager'
  | 'survey_manager'
  | 'surveyor'
  | 'packing_supervisor'
  | 'packing_staff'
  | 'dispatch_manager'
  | 'delivery_staff'
  | 'accounts'
  | 'customer_support'
  | 'customer';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  serviceArea?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export type MoveType = 'home' | 'office' | 'vehicle' | 'storage' | 'other';

export type PackingPreference = 'dcm_full' | 'customer_full' | 'partial';

export type DeliveryType = 'door_delivery' | 'self_pickup' | 'assisted_delivery';

export type DestinationSetupOption =
  | 'unload_only'
  | 'room_placement'
  | 'unpack_boxes'
  | 'reassemble_furniture'
  | 'full_setup';

export type StorageOption = 'none' | 'short_term' | 'long_term';

export type MoveStageKey =
  | 'booking_confirmed'
  | 'survey_scheduled'
  | 'survey_completed'
  | 'packing_scheduled'
  | 'packing_in_progress'
  | 'packing_completed'
  | 'dismantling_completed'
  | 'loading_in_progress'
  | 'pickup_completed'
  | 'origin_facility_received'
  | 'dispatched'
  | 'in_transit'
  | 'destination_city_reached'
  | 'destination_facility_received'
  | 'delivery_scheduled'
  | 'out_for_delivery'
  | 'delivered'
  | 'unpacking_reassembly'
  | 'pod_completed'
  | 'move_completed';

export interface MoveStageRecord {
  stageKey: MoveStageKey;
  label: string;
  description: string;
  status: 'pending' | 'current' | 'completed' | 'skipped';
  completedAt?: string;
  completedBy?: string;
  location?: string;
  isDelayed?: boolean;
  delayedReason?: string;
  nextExpectedStep?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Appliances' | 'Electronics' | 'Boxes' | 'Fragile' | 'Vehicle' | 'Special';
  quantity: number;
  isFragile: boolean;
  isValuable: boolean;
  specialHandlingNotes?: string;
  packingRequired: 'dcm' | 'customer';
  dismantlingRequired: boolean;
  reassemblyRequired: boolean;
  volumeCft: number; // Cubic feet estimate
  roomPlacement: 'Bedroom' | 'Living Room' | 'Kitchen' | 'Study / Office' | 'Balcony' | 'Storage';
  photos?: string[];
  lifecycleStatus: 'not_packed' | 'packed' | 'loaded' | 'in_transit' | 'delivered' | 'checked';
}

export interface PropertyAccessDetails {
  address: string;
  city: string;
  state: string;
  pincode: string;
  propertyType: 'Apartment' | 'Independent Villa' | 'Gated Community' | 'Commercial Office';
  floorNumber: number;
  hasLift: boolean;
  liftType: 'passenger' | 'service' | 'goods' | 'none';
  stairsCarryRequired: boolean;
  parkingDistanceMeters: number; // Carry distance from truck to elevator/entry
  societyPermissionRequired: boolean;
  societyPermissionStatus?: 'not_required' | 'pending' | 'approved';
  movingTimeRestrictions?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
}

export interface MovePricingBreakdown {
  baseTransportation: number;
  packingCharges: number;
  loadingCharges: number;
  unloadingCharges: number;
  floorCharges: number;
  longCarryCharges: number;
  dismantlingCharges: number;
  reassemblyCharges: number;
  storageCharges: number;
  unpackingCharges: number;
  specialHandlingCharges: number;
  transitInsurance: number;
  subTotal: number;
  discount: number;
  gstAmount: number; // 18% GST standard in Indian Logistics
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
}

export interface DigitalPOD {
  receiverName: string;
  receiverPhone: string;
  receiverRelation: 'Self' | 'Family Member' | 'Colleague' | 'Building Security';
  otpCodeVerified: boolean;
  signatureDataUrl?: string;
  deliveryPhotos: string[];
  itemConditionApproved: boolean;
  customerRemarks?: string;
  completedAt: string;
  deliveryStaffName: string;
}

export interface MoveSpecification {
  id: string;
  bookingId: string; // e.g. DCM-2026-000123
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  moveType: MoveType;
  movingDate: string;
  origin: PropertyAccessDetails;
  destination: PropertyAccessDetails;
  packingPreference: PackingPreference;
  deliveryType: DeliveryType;
  destinationSetup: DestinationSetupOption;
  storageOption: StorageOption;
  storageDays?: number;
  storageFacilityCity?: string;
  inventory: InventoryItem[];
  pricing: MovePricingBreakdown;
  currentStage: MoveStageKey;
  stages: MoveStageRecord[];
  isDelayed: boolean;
  delayReason?: string;
  customerActionRequired?: string | null;
  assignedStaff: {
    moveManagerName?: string;
    moveManagerPhone?: string;
    surveyorId?: string;
    surveyorName?: string;
    packingSupervisorId?: string;
    packingSupervisorName?: string;
    deliveryLeadId?: string;
    deliveryLeadName?: string;
    vehicleId?: string;
    vehicleNumber?: string;
  };
  proofOfDelivery?: DigitalPOD;
  createdAt: string;
  updatedAt: string;
}

export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'change_requested' | 'rejected' | 'booked';

export interface Quotation {
  id: string;
  quoteNumber: string; // e.g. QTE-DCM-8021
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  moveType: MoveType;
  movingDate: string;
  originCity: string;
  destinationCity: string;
  approxDistanceKm: number;
  estimatedVolumeCft: number;
  pricing: MovePricingBreakdown;
  includedServices: string[];
  excludedServices: string[];
  paymentSchedule: {
    advancePercentage: number;
    advanceDue: number;
    loadingPercentage: number;
    loadingDue: number;
    deliveryPercentage: number;
    deliveryDue: number;
  };
  validityDate: string;
  status: QuoteStatus;
  isChangeRequest?: boolean;
  originalQuoteId?: string;
  revisionNumber?: number;
  changeRequestNotes?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  originCity: string;
  destinationCity: string;
  movingDate: string;
  moveType: MoveType;
  approxVolume: string;
  stage: 'new' | 'contacted' | 'qualified' | 'survey_scheduled' | 'survey_completed' | 'quote_sent' | 'negotiation' | 'confirmed' | 'lost';
  assignedTo?: string;
  notes: string;
  createdAt: string;
}

export interface Survey {
  id: string;
  bookingOrQuoteId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  type: 'on_site' | 'video' | 'photo';
  scheduledDate: string;
  scheduledTimeSlot: string;
  surveyorId?: string;
  surveyorName?: string;
  status: 'requested' | 'assigned' | 'scheduled' | 'completed' | 'cancelled';
  assessmentNotes?: string;
  estimatedVolumeCft?: number;
  specialRequirements?: string[];
  photos?: string[];
  submittedAt?: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  receiptNumber: string;
  amount: number;
  type: 'advance' | 'milestone' | 'pre_delivery' | 'final';
  method: 'upi' | 'card' | 'net_banking' | 'razorpay' | 'cash_on_delivery';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  transactionRef: string;
  paidAt: string;
  notes?: string;
}

export interface SupportTicket {
  id: string;
  bookingId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: 'Booking' | 'Payment' | 'Pickup' | 'Packing' | 'Tracking' | 'Delivery' | 'Damage' | 'Other';
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messages: Array<{
    id: string;
    sender: 'customer' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }>;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DamageClaim {
  id: string;
  claimNumber: string; // e.g. CLM-2026-004
  bookingId: string;
  customerName: string;
  customerPhone: string;
  itemDescription: string;
  estimatedClaimAmount: number;
  photos: string[];
  status: 'submitted' | 'under_review' | 'investigation' | 'decision' | 'settled' | 'rejected';
  adminDecisionNotes?: string;
  approvedSettlementAmount?: number;
  submittedAt: string;
  settledAt?: string;
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: 'Tata 407 (14ft)' | 'Eicher 17ft Closed Container' | 'Eicher 19ft Container' | 'Tata 22ft Dedicated Truck' | 'Special Car Carrier';
  capacityTons: number;
  driverName: string;
  driverPhone: string;
  status: 'available' | 'on_trip' | 'maintenance';
  currentLocationCity: string;
}

export interface Warehouse {
  id: string;
  name: string;
  city: string;
  address: string;
  managerName: string;
  managerPhone: string;
  capacityCft: number;
  occupiedCft: number;
  securityFeatures: string[];
  climateControlled: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'booking' | 'quote' | 'payment' | 'survey' | 'lead' | 'claim' | 'staff' | 'service';
  entityId: string;
  details: string;
}
