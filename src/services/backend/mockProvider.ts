import {
  AuditLog,
  DamageClaim,
  InventoryItem,
  Lead,
  MovePricingBreakdown,
  MoveSpecification,
  MoveStageKey,
  MoveStageRecord,
  PaymentTransaction,
  Quotation,
  SupportTicket,
  Survey,
  UserProfile,
  Vehicle,
  Warehouse,
} from '../../types';
import { BackendProvider } from './types';

const INITIAL_STAGES: MoveStageRecord[] = [
  { stageKey: 'booking_confirmed', label: 'Booking Confirmed', description: 'Move slot reserved and booking agreement generated.', status: 'completed', completedAt: '2026-09-21T09:00:00Z', completedBy: 'System' },
  { stageKey: 'survey_scheduled', label: 'Survey Scheduled', description: 'Pre-move inventory & access assessment planned.', status: 'completed', completedAt: '2026-09-21T14:30:00Z', completedBy: 'Priya Mehra (Sales)' },
  { stageKey: 'survey_completed', label: 'Survey Completed', description: '3BHK on-site survey documented with 48 items & volume 420 CFT.', status: 'completed', completedAt: '2026-09-22T11:00:00Z', completedBy: 'Amit Verma (Surveyor)' },
  { stageKey: 'packing_scheduled', label: 'Packing Crew Scheduled', description: 'DCM 4-member packing team assigned for 8:00 AM slot.', status: 'completed', completedAt: '2026-09-23T16:00:00Z', completedBy: 'Rajesh Kumar (Ops)' },
  { stageKey: 'packing_in_progress', label: 'Packing In Progress', description: 'Multi-layer bubble wrap, foam corner guards & cartons applied.', status: 'completed', completedAt: '2026-09-24T09:30:00Z', completedBy: 'Gurpreet Singh (Supervisor)' },
  { stageKey: 'packing_completed', label: 'Packing Completed', description: 'All 48 items tagged, color-coded and checked off.', status: 'completed', completedAt: '2026-09-24T13:00:00Z', completedBy: 'Gurpreet Singh' },
  { stageKey: 'dismantling_completed', label: 'Furniture Dismantling Done', description: 'King size bed & 6-door wardrobe dismantled carefully with screws sealed.', status: 'completed', completedAt: '2026-09-24T14:30:00Z', completedBy: 'Gurpreet Singh' },
  { stageKey: 'loading_in_progress', label: 'Loading Completed', description: 'Secured inside dedicated weather-proof container vehicle DL-01-AX-9912.', status: 'completed', completedAt: '2026-09-24T16:45:00Z', completedBy: 'Gurpreet Singh' },
  { stageKey: 'pickup_completed', label: 'Pickup Completed', description: 'Consignment gate pass signed at Chandigarh origin.', status: 'completed', completedAt: '2026-09-24T17:15:00Z', completedBy: 'Gurpreet Singh' },
  { stageKey: 'origin_facility_received', label: 'Received at Chandigarh Hub', description: 'Weight check, consignment paperwork & seal verification verified.', status: 'completed', completedAt: '2026-09-24T19:00:00Z', location: 'DCM Sector 82 Mohali/Chandigarh Hub' },
  { stageKey: 'dispatched', label: 'Dispatched on Highway', description: 'Container truck departed via NH-44 Grand Trunk Highway towards Delhi.', status: 'completed', completedAt: '2026-09-24T22:00:00Z', location: 'NH-44 Highway Transit' },
  { stageKey: 'in_transit', label: 'In Transit', description: 'Consignment moving smoothly between origin and destination state boundaries.', status: 'current', completedAt: undefined, location: 'En route Panipat bypass' },
  { stageKey: 'destination_city_reached', label: 'Destination City Reached', description: 'Consignment arrived at New Delhi outer perimeter.', status: 'pending', nextExpectedStep: 'Entry to Delhi NCR South Hub' },
  { stageKey: 'destination_facility_received', label: 'Destination Facility Received', description: 'Unloading verification & local route sorting at DCM South Delhi Hub.', status: 'pending' },
  { stageKey: 'delivery_scheduled', label: 'Delivery Slot Scheduled', description: 'Final door delivery confirmed for 10:00 AM morning slot.', status: 'pending' },
  { stageKey: 'out_for_delivery', label: 'Out For Delivery', description: 'Final delivery vehicle en route to Vasant Vihar destination address.', status: 'pending' },
  { stageKey: 'delivered', label: 'Door Delivery Completed', description: 'Boxes and furniture unloaded into residence.', status: 'pending' },
  { stageKey: 'unpacking_reassembly', label: 'Unpacking & Room Placement', description: 'Room-wise placement, unpacking cartons and reassembling beds.', status: 'pending' },
  { stageKey: 'pod_completed', label: 'Digital POD Signed', description: 'Inspection check done, digital signature & condition photos recorded.', status: 'pending' },
  { stageKey: 'move_completed', label: 'Move Successfully Completed', description: 'DCM Safe Move journey completed. Welcome to your new home!', status: 'pending' },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'King Size Storage Bed with Hydraulic Lift', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 65, roomPlacement: 'Bedroom', lifecycleStatus: 'in_transit' },
  { id: 'inv-2', name: 'Memory Foam Mattress (78x72)', category: 'Furniture', quantity: 1, isFragile: false, isValuable: false, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 25, roomPlacement: 'Bedroom', lifecycleStatus: 'in_transit' },
  { id: 'inv-3', name: '65" Samsung OLED Smart TV', category: 'Electronics', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Special wooden crate packing with bubble wrap', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 18, roomPlacement: 'Living Room', lifecycleStatus: 'in_transit' },
  { id: 'inv-4', name: 'L-Shaped 6-Seater Fabric Sofa', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 80, roomPlacement: 'Living Room', lifecycleStatus: 'in_transit' },
  { id: 'inv-5', name: 'Double Door Refrigerator 450L', category: 'Appliances', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Keep upright, bubble & corrugated wrap', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 40, roomPlacement: 'Kitchen', lifecycleStatus: 'in_transit' },
  { id: 'inv-6', name: 'Front Load Washing Machine (8kg)', category: 'Appliances', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Transit bolts installed by DCM crew', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 22, roomPlacement: 'Balcony', lifecycleStatus: 'in_transit' },
  { id: 'inv-7', name: '6-Seater Glass Top Dining Table & Chairs', category: 'Furniture', quantity: 1, isFragile: true, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 55, roomPlacement: 'Living Room', lifecycleStatus: 'in_transit' },
  { id: 'inv-8', name: 'Crockery & Fine China Cartons', category: 'Fragile', quantity: 4, isFragile: true, isValuable: true, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 28, roomPlacement: 'Kitchen', lifecycleStatus: 'in_transit' },
  { id: 'inv-9', name: 'Wardrobe Clothes & Linen Cartons', category: 'Boxes', quantity: 8, isFragile: false, isValuable: false, packingRequired: 'customer', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 64, roomPlacement: 'Bedroom', lifecycleStatus: 'in_transit' },
  { id: 'inv-10', name: 'Study Table & Ergonomic Executive Chair', category: 'Furniture', quantity: 1, isFragile: false, isValuable: false, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 23, roomPlacement: 'Study / Office', lifecycleStatus: 'in_transit' },
];

export class MockBackendProvider implements BackendProvider {
  readonly providerName = 'mock' as const;

  private currentUser: UserProfile | null = null;
  private users: UserProfile[] = [];
  private leads: Lead[] = [];
  private quotes: Quotation[] = [];
  private bookings: MoveSpecification[] = [];
  private surveys: Survey[] = [];
  private payments: PaymentTransaction[] = [];
  private supportTickets: SupportTicket[] = [];
  private claims: DamageClaim[] = [];
  private vehicles: Vehicle[] = [];
  private warehouses: Warehouse[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.initFromStorage();
  }

  isConfigured(): boolean {
    return true;
  }

  private initFromStorage(): void {
    const saved = localStorage.getItem('dcm_mock_database_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.users = parsed.users || [];
        this.leads = parsed.leads || [];
        this.quotes = parsed.quotes || [];
        this.bookings = parsed.bookings || [];
        this.surveys = parsed.surveys || [];
        this.payments = parsed.payments || [];
        this.supportTickets = parsed.supportTickets || [];
        this.claims = parsed.claims || [];
        this.vehicles = parsed.vehicles || [];
        this.warehouses = parsed.warehouses || [];
        this.auditLogs = parsed.auditLogs || [];
        this.currentUser = parsed.currentUser || this.users[0] || null;
        return;
      } catch (err) {
        console.warn('Failed to parse saved DCM mock database, seeding defaults', err);
      }
    }

    this.seedDefaultData();
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        'dcm_mock_database_v1',
        JSON.stringify({
          users: this.users,
          leads: this.leads,
          quotes: this.quotes,
          bookings: this.bookings,
          surveys: this.surveys,
          payments: this.payments,
          supportTickets: this.supportTickets,
          claims: this.claims,
          vehicles: this.vehicles,
          warehouses: this.warehouses,
          auditLogs: this.auditLogs,
          currentUser: this.currentUser,
        })
      );
    } catch (err) {
      console.error('Failed to persist DCM mock database to localStorage', err);
    }
  }

  private seedDefaultData(): void {
    // 1. Staff & Users
    this.users = [
      {
        id: 'usr-admin-1',
        email: 'sunil.admin@dcmpackersmovers.com',
        name: 'Sunil Sharma',
        phone: '+91 98888 11111',
        role: 'super_admin',
        serviceArea: 'All India Head Office',
        isActive: true,
        createdAt: '2026-01-01T00:00:00Z',
      },
      {
        id: 'usr-ops-1',
        email: 'rajesh.ops@dcmpackersmovers.com',
        name: 'Rajesh Kumar',
        phone: '+91 98888 22222',
        role: 'operations_manager',
        serviceArea: 'North India & Highway Transit',
        isActive: true,
        createdAt: '2026-01-05T00:00:00Z',
      },
      {
        id: 'usr-sales-1',
        email: 'priya.sales@dcmpackersmovers.com',
        name: 'Priya Mehra',
        phone: '+91 98888 33333',
        role: 'sales_manager',
        serviceArea: 'Chandigarh Tri-City & Delhi NCR',
        isActive: true,
        createdAt: '2026-01-10T00:00:00Z',
      },
      {
        id: 'usr-survey-1',
        email: 'amit.survey@dcmpackersmovers.com',
        name: 'Amit Verma',
        phone: '+91 98888 44444',
        role: 'surveyor',
        serviceArea: 'Chandigarh / Mohali / Panchkula',
        isActive: true,
        createdAt: '2026-01-15T00:00:00Z',
      },
      {
        id: 'usr-pack-1',
        email: 'gurpreet.pack@dcmpackersmovers.com',
        name: 'Gurpreet Singh',
        phone: '+91 98888 55555',
        role: 'packing_supervisor',
        serviceArea: 'Chandigarh Tri-City',
        isActive: true,
        createdAt: '2026-02-01T00:00:00Z',
      },
      {
        id: 'usr-del-1',
        email: 'manoj.del@dcmpackersmovers.com',
        name: 'Manoj Yadav',
        phone: '+91 98888 66666',
        role: 'delivery_staff',
        serviceArea: 'Delhi NCR Hub',
        isActive: true,
        createdAt: '2026-02-10T00:00:00Z',
      },
      {
        id: 'usr-cust-1',
        email: 'rahul.swami8185@gmail.com',
        name: 'Rahul Swami',
        phone: '+91 98765 43210',
        role: 'customer',
        isActive: true,
        createdAt: '2026-03-01T00:00:00Z',
      },
    ];

    // Default active user is the verified customer
    this.currentUser = this.users[6];

    // 2. Pre-seeded Moves
    const primaryPricing: MovePricingBreakdown = {
      baseTransportation: 18500,
      packingCharges: 4200,
      loadingCharges: 1900,
      unloadingCharges: 1900,
      floorCharges: 800,
      longCarryCharges: 300,
      dismantlingCharges: 1000,
      reassemblyCharges: 1200,
      storageCharges: 0,
      unpackingCharges: 1470,
      specialHandlingCharges: 1750,
      transitInsurance: 2200,
      subTotal: 35220,
      discount: 1760,
      gstAmount: 6022,
      totalAmount: 39482,
      paidAmount: 20000,
      balanceAmount: 19482,
    };

    const primaryMove: MoveSpecification = {
      id: 'move-101',
      bookingId: 'DCM-2026-000123',
      customerId: 'usr-cust-1',
      customerName: 'Rahul Swami',
      customerPhone: '+91 98765 43210',
      customerEmail: 'rahul.swami8185@gmail.com',
      moveType: 'home',
      movingDate: '2026-09-24',
      origin: {
        address: 'House #412, Sector 35-C',
        city: 'Chandigarh',
        state: 'Punjab / UT',
        pincode: '160035',
        propertyType: 'Independent Villa',
        floorNumber: 1,
        hasLift: false,
        liftType: 'none',
        stairsCarryRequired: true,
        parkingDistanceMeters: 25,
        societyPermissionRequired: false,
        societyPermissionStatus: 'approved',
        contactPersonName: 'Rahul Swami',
        contactPersonPhone: '+91 98765 43210',
      },
      destination: {
        address: 'Flat 402, Block B, Silver Palms Heights, Vasant Vihar',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110057',
        propertyType: 'Apartment',
        floorNumber: 4,
        hasLift: true,
        liftType: 'service',
        stairsCarryRequired: false,
        parkingDistanceMeters: 15,
        societyPermissionRequired: true,
        societyPermissionStatus: 'pending',
        movingTimeRestrictions: 'Entry allowed 9:00 AM to 6:00 PM only',
        contactPersonName: 'Anil Swami (Father)',
        contactPersonPhone: '+91 98111 22334',
      },
      packingPreference: 'dcm_full',
      deliveryType: 'door_delivery',
      destinationSetup: 'full_setup',
      storageOption: 'none',
      inventory: INITIAL_INVENTORY,
      pricing: primaryPricing,
      currentStage: 'in_transit',
      stages: INITIAL_STAGES,
      isDelayed: false,
      customerActionRequired: 'Please submit the Society Entry Gate Pass / Move-In NOC before delivery truck arrival.',
      assignedStaff: {
        moveManagerName: 'Vikram Joshi (Senior Move Coordinator)',
        moveManagerPhone: '+91 98888 77777',
        surveyorId: 'usr-survey-1',
        surveyorName: 'Amit Verma',
        packingSupervisorId: 'usr-pack-1',
        packingSupervisorName: 'Gurpreet Singh',
        deliveryLeadId: 'usr-del-1',
        deliveryLeadName: 'Manoj Yadav',
        vehicleId: 'veh-1',
        vehicleNumber: 'DL-01-AX-9912 (Eicher 19ft Container)',
      },
      createdAt: '2026-09-20T10:00:00Z',
      updatedAt: '2026-09-24T22:00:00Z',
    };

    const secondaryMove: MoveSpecification = {
      id: 'move-102',
      bookingId: 'DCM-2026-000124',
      customerId: 'usr-cust-2',
      customerName: 'Amanpreet Kaur',
      customerPhone: '+91 98450 12345',
      customerEmail: 'amanpreet@infotech.com',
      moveType: 'office',
      movingDate: '2026-09-28',
      origin: {
        address: 'Plot 72, Industrial Area Phase 8B',
        city: 'Mohali',
        state: 'Punjab',
        pincode: '160071',
        propertyType: 'Commercial Office',
        floorNumber: 2,
        hasLift: true,
        liftType: 'goods',
        stairsCarryRequired: false,
        parkingDistanceMeters: 10,
        societyPermissionRequired: true,
        societyPermissionStatus: 'approved',
      },
      destination: {
        address: 'Prestige Tech Park, Marathahalli-Sarjapur Outer Ring Rd',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560103',
        propertyType: 'Commercial Office',
        floorNumber: 3,
        hasLift: true,
        liftType: 'service',
        stairsCarryRequired: false,
        parkingDistanceMeters: 20,
        societyPermissionRequired: true,
        societyPermissionStatus: 'approved',
      },
      packingPreference: 'dcm_full',
      deliveryType: 'door_delivery',
      destinationSetup: 'room_placement',
      storageOption: 'short_term',
      storageDays: 14,
      storageFacilityCity: 'Bangalore Whitefield DCM Facility',
      inventory: [
        { id: 'inv-201', name: 'Workstation Modular Partitions (10 bays)', category: 'Furniture', quantity: 10, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 200, roomPlacement: 'Study / Office', lifecycleStatus: 'not_packed' },
        { id: 'inv-202', name: 'Server Rack 42U with Network Switches', category: 'Electronics', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Air-ride suspension transport only', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 45, roomPlacement: 'Study / Office', lifecycleStatus: 'not_packed' },
      ],
      pricing: {
        baseTransportation: 48000,
        packingCharges: 8500,
        loadingCharges: 4000,
        unloadingCharges: 4000,
        floorCharges: 0,
        longCarryCharges: 0,
        dismantlingCharges: 5000,
        reassemblyCharges: 6000,
        storageCharges: 4200,
        unpackingCharges: 3000,
        specialHandlingCharges: 3500,
        transitInsurance: 6500,
        subTotal: 92700,
        discount: 4635,
        gstAmount: 15851,
        totalAmount: 103916,
        paidAmount: 50000,
        balanceAmount: 53916,
      },
      currentStage: 'packing_scheduled',
      stages: INITIAL_STAGES.map((s) => ({
        ...s,
        status: s.stageKey === 'booking_confirmed' || s.stageKey === 'survey_scheduled' || s.stageKey === 'survey_completed' || s.stageKey === 'packing_scheduled' ? 'completed' : 'pending',
      })),
      isDelayed: false,
      assignedStaff: {
        moveManagerName: 'Sunil Sharma (Super Admin)',
        surveyorName: 'Amit Verma',
        packingSupervisorName: 'Gurpreet Singh',
      },
      createdAt: '2026-09-22T14:00:00Z',
      updatedAt: '2026-09-23T11:00:00Z',
    };

    this.bookings = [primaryMove, secondaryMove];

    // 3. Quotes
    this.quotes = [
      {
        id: 'qte-101',
        quoteNumber: 'QTE-DCM-8021',
        customerId: 'usr-cust-1',
        customerName: 'Rahul Swami',
        customerEmail: 'rahul.swami8185@gmail.com',
        customerPhone: '+91 98765 43210',
        moveType: 'home',
        movingDate: '2026-09-24',
        originCity: 'Chandigarh',
        destinationCity: 'New Delhi',
        approxDistanceKm: 250,
        estimatedVolumeCft: 420,
        pricing: primaryPricing,
        includedServices: [
          'Dedicated Weather-proof 19ft Container Vehicle',
          'Professional 4-layer packing (Bubble + Foam + Corrugated sheet + Film)',
          'Complete loading & unloading by trained DCM crew',
          'Furniture dismantling (Bed + 6-door Wardrobe)',
          'Furniture reassembly at New Delhi destination',
          'Room-wise placement of all furniture & cartons',
          'Free transit insurance coverage up to ₹5,00,000',
          'Dedicated Move Coordinator with WhatsApp/Phone support',
          'Digital Proof of Delivery (POD) report',
        ],
        excludedServices: [
          'Electrical appliance installations (AC gas charging / geyser mounting)',
          'Wall drilling / carpentry modifications not related to furniture',
          'Society union / municipal Octroi levies if locally charged',
        ],
        paymentSchedule: {
          advancePercentage: 20,
          advanceDue: 7896,
          loadingPercentage: 60,
          loadingDue: 23689,
          deliveryPercentage: 20,
          deliveryDue: 7897,
        },
        validityDate: '2026-10-15',
        status: 'booked',
        createdAt: '2026-09-20T11:00:00Z',
      },
      {
        id: 'qte-102',
        quoteNumber: 'QTE-DCM-8022',
        customerId: 'usr-lead-99',
        customerName: 'Dr. Vivek Mehra',
        customerEmail: 'dr.vivek@gmail.com',
        customerPhone: '+91 98141 99887',
        moveType: 'home',
        movingDate: '2026-10-05',
        originCity: 'Panchkula',
        destinationCity: 'Mumbai',
        approxDistanceKm: 1450,
        estimatedVolumeCft: 650,
        pricing: {
          baseTransportation: 62000,
          packingCharges: 7500,
          loadingCharges: 3500,
          unloadingCharges: 3500,
          floorCharges: 1200,
          longCarryCharges: 0,
          dismantlingCharges: 2000,
          reassemblyCharges: 2400,
          storageCharges: 0,
          unpackingCharges: 2800,
          specialHandlingCharges: 2500,
          transitInsurance: 8500,
          subTotal: 95900,
          discount: 4795,
          gstAmount: 16398,
          totalAmount: 107503,
          paidAmount: 0,
          balanceAmount: 107503,
        },
        includedServices: [
          'Interstate Container Transport Panchkula to Mumbai',
          'Full Household Packing by DCM certified crew',
          'Transit Insurance coverage ₹10,00,000',
        ],
        excludedServices: ['Local parking toll passes'],
        paymentSchedule: {
          advancePercentage: 20,
          advanceDue: 21500,
          loadingPercentage: 60,
          loadingDue: 64500,
          deliveryPercentage: 20,
          deliveryDue: 21503,
        },
        validityDate: '2026-10-10',
        status: 'sent',
        createdAt: '2026-09-24T08:00:00Z',
      },
    ];

    // 4. Leads
    this.leads = [
      {
        id: 'lead-1',
        name: 'Dr. Vivek Mehra',
        phone: '+91 98141 99887',
        email: 'dr.vivek@gmail.com',
        originCity: 'Panchkula',
        destinationCity: 'Mumbai',
        movingDate: '2026-10-05',
        moveType: 'home',
        approxVolume: '4BHK Villa (650 CFT)',
        stage: 'quote_sent',
        assignedTo: 'Priya Mehra',
        notes: 'Requested video survey for premium teakwood furniture.',
        createdAt: '2026-09-23T10:00:00Z',
      },
      {
        id: 'lead-2',
        name: 'Karan Singhal',
        phone: '+91 97800 55443',
        email: 'karan.singhal@outlook.com',
        originCity: 'Chandigarh',
        destinationCity: 'Hyderabad',
        movingDate: '2026-10-12',
        moveType: 'vehicle',
        approxVolume: 'Hyundai Creta + Royal Enfield 350',
        stage: 'survey_scheduled',
        assignedTo: 'Priya Mehra',
        notes: 'Car condition inspection required before carrier loading.',
        createdAt: '2026-09-24T15:20:00Z',
      },
      {
        id: 'lead-3',
        name: 'Simran Bajaj',
        phone: '+91 99150 88776',
        email: 'simran.bajaj@gmail.com',
        originCity: 'Mohali',
        destinationCity: 'Pune',
        movingDate: '2026-10-18',
        moveType: 'home',
        approxVolume: '2BHK Apartment (280 CFT)',
        stage: 'new',
        assignedTo: 'Priya Mehra',
        notes: 'Inquired about 1 month warehousing in Pune before possession.',
        createdAt: '2026-09-25T11:45:00Z',
      },
    ];

    // 5. Payments
    this.payments = [
      {
        id: 'pay-1',
        bookingId: 'DCM-2026-000123',
        receiptNumber: 'RCPT-2026-891',
        amount: 8000,
        type: 'advance',
        method: 'upi',
        status: 'paid',
        transactionRef: 'UPI/626810239102/HDFC',
        paidAt: '2026-09-21T09:15:00Z',
        notes: 'Booking reservation token advance',
      },
      {
        id: 'pay-2',
        bookingId: 'DCM-2026-000123',
        receiptNumber: 'RCPT-2026-904',
        amount: 12000,
        type: 'milestone',
        method: 'razorpay',
        status: 'paid',
        transactionRef: 'pay_Nz9xL82103Klm',
        paidAt: '2026-09-24T17:00:00Z',
        notes: 'Loading completion milestone payment',
      },
    ];

    // 6. Surveys
    this.surveys = [
      {
        id: 'srv-1',
        bookingOrQuoteId: 'DCM-2026-000123',
        customerName: 'Rahul Swami',
        customerPhone: '+91 98765 43210',
        address: 'House #412, Sector 35-C, Chandigarh',
        type: 'on_site',
        scheduledDate: '2026-09-22',
        scheduledTimeSlot: '11:00 AM - 12:30 PM',
        surveyorId: 'usr-survey-1',
        surveyorName: 'Amit Verma',
        status: 'completed',
        assessmentNotes: 'Wide street, parking access direct to gate. 1st floor staircase wide enough for King mattress. 48 total items verified.',
        estimatedVolumeCft: 420,
        specialRequirements: ['Wooden crate for 65" OLED TV', 'Transit bolts for front-load washer'],
        submittedAt: '2026-09-22T13:00:00Z',
      },
    ];

    // 7. Support Tickets
    this.supportTickets = [
      {
        id: 'tkt-1',
        bookingId: 'DCM-2026-000123',
        customerName: 'Rahul Swami',
        customerEmail: 'rahul.swami8185@gmail.com',
        customerPhone: '+91 98765 43210',
        category: 'Delivery',
        subject: 'Delhi Society Move-In NOC Verification Assistance',
        priority: 'medium',
        status: 'in_progress',
        messages: [
          {
            id: 'msg-1',
            sender: 'customer',
            senderName: 'Rahul Swami',
            text: 'Hello, our society in Vasant Vihar requires driver and vehicle registration details before granting gate entry. Could you provide them?',
            timestamp: '2026-09-25T08:30:00Z',
          },
          {
            id: 'msg-2',
            sender: 'support',
            senderName: 'Vikram Joshi (Move Manager)',
            text: 'Hi Rahul! The container vehicle number is DL-01-AX-9912 driven by Manoj Yadav (Phone: +91 98888 66666). I have also emailed the driver Aadhaar and commercial permit copy to your email for your society secretary.',
            timestamp: '2026-09-25T09:10:00Z',
          },
        ],
        internalNotes: 'Driver permit details provided to customer.',
        createdAt: '2026-09-25T08:30:00Z',
        updatedAt: '2026-09-25T09:10:00Z',
      },
    ];

    // 8. Damage Claims
    this.claims = [
      {
        id: 'clm-1',
        claimNumber: 'CLM-2026-001',
        bookingId: 'DCM-2026-000119',
        customerName: 'Deepak Chopra',
        customerPhone: '+91 98150 11223',
        itemDescription: 'Corner scratch on side study table during staircase unloading.',
        estimatedClaimAmount: 1800,
        photos: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'],
        status: 'under_review',
        adminDecisionNotes: 'Claim under review with carpenter restoration allowance of ₹1,500.',
        submittedAt: '2026-09-22T15:00:00Z',
      },
    ];

    // 9. Vehicles
    this.vehicles = [
      { id: 'veh-1', vehicleNumber: 'DL-01-AX-9912', type: 'Eicher 19ft Container', capacityTons: 6.5, driverName: 'Manoj Yadav', driverPhone: '+91 98888 66666', status: 'on_trip', currentLocationCity: 'NH-44 Highway Transit' },
      { id: 'veh-2', vehicleNumber: 'CH-01-TA-4455', type: 'Tata 407 (14ft)', capacityTons: 3.5, driverName: 'Surinder Pal', driverPhone: '+91 98144 77889', status: 'available', currentLocationCity: 'Chandigarh Hub' },
      { id: 'veh-3', vehicleNumber: 'HR-38-CC-1102', type: 'Special Car Carrier', capacityTons: 12.0, driverName: 'Baldev Singh', driverPhone: '+91 98722 33445', status: 'available', currentLocationCity: 'Delhi NCR Hub' },
    ];

    // 10. Warehouses
    this.warehouses = [
      { id: 'wh-1', name: 'DCM Tri-City Central Facility', city: 'Chandigarh / Mohali', address: 'Plot 314, Industrial Area Phase 9, Mohali', managerName: 'Harpreet Singh', managerPhone: '+91 98888 77112', capacityCft: 85000, occupiedCft: 52000, securityFeatures: ['24x7 CCTV', 'Fire Hydrant & Smoke Sensors', 'Biometric Access', 'Pest Controlled Pallets'], climateControlled: true },
      { id: 'wh-2', name: 'DCM Delhi NCR Logistics Hub', city: 'New Delhi / Gurugram', address: 'Khasra 42/1, Kapashera Border, South Delhi', managerName: 'Vipin Saxena', managerPhone: '+91 98100 88223', capacityCft: 140000, occupiedCft: 98000, securityFeatures: ['24x7 Security Guards', 'Full Perimeter CCTV', 'Weather-proof Ramp Loading'], climateControlled: false },
      { id: 'wh-3', name: 'DCM South India Regional Depot', city: 'Bangalore', address: 'SY No. 88, Hoodi Industrial Area, Whitefield', managerName: 'K. Ramesh', managerPhone: '+91 98450 66778', capacityCft: 95000, occupiedCft: 41000, securityFeatures: ['24x7 CCTV', 'Fire Safety Sprinklers', 'Dedicated Storage Vaults'], climateControlled: true },
    ];

    // 11. Audit Logs
    this.auditLogs = [
      { id: 'aud-1', timestamp: '2026-09-24T22:00:00Z', actorId: 'usr-ops-1', actorName: 'Rajesh Kumar', actorRole: 'operations_manager', action: 'MOVE_STAGE_UPDATED', entityType: 'booking', entityId: 'DCM-2026-000123', details: 'Status updated from DISPATCHED to IN_TRANSIT on NH-44' },
      { id: 'aud-2', timestamp: '2026-09-24T17:05:00Z', actorId: 'usr-admin-1', actorName: 'Sunil Sharma', actorRole: 'super_admin', action: 'PAYMENT_VERIFIED', entityType: 'payment', entityId: 'pay-2', details: 'Milestone loading advance ₹12,000 verified' },
      { id: 'aud-3', timestamp: '2026-09-22T11:00:00Z', actorId: 'usr-survey-1', actorName: 'Amit Verma', actorRole: 'surveyor', action: 'SURVEY_REPORT_SUBMITTED', entityType: 'survey', entityId: 'srv-1', details: 'On-site survey completed: 420 CFT verified' },
    ];
  }

  // --- Auth Methods ---
  async getCurrentUser(): Promise<UserProfile | null> {
    return this.currentUser;
  }

  async loginAsDemoUser(userId: string): Promise<UserProfile> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error('User not found');
    this.currentUser = user;
    this.saveToStorage();
    return user;
  }

  async loginWithGoogle(): Promise<UserProfile> {
    // In mock mode, logs in as the pre-seeded customer
    const user = this.users.find((u) => u.role === 'customer') || this.users[0];
    this.currentUser = user;
    this.saveToStorage();
    return user;
  }

  async loginWithAdminCredentials(username: string, _password?: string): Promise<UserProfile> {
    // Admin login matches staff/admin accounts
    const user = this.users.find((u) => u.email.toLowerCase().includes(username.toLowerCase()) || u.name.toLowerCase().includes(username.toLowerCase()));
    if (!user || user.role === 'customer') {
      // Default to Super Admin if credentials entered
      const admin = this.users.find((u) => u.role === 'super_admin') || this.users[0];
      this.currentUser = admin;
      this.saveToStorage();
      return admin;
    }
    this.currentUser = user;
    this.saveToStorage();
    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.saveToStorage();
  }

  async getAllStaffUsers(): Promise<UserProfile[]> {
    return this.users.filter((u) => u.role !== 'customer');
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<void> {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.isActive = isActive;
      this.saveToStorage();
      await this.logAuditEvent({
        actorId: this.currentUser?.id || 'sys',
        actorName: this.currentUser?.name || 'Admin',
        actorRole: this.currentUser?.role || 'admin',
        action: 'USER_STATUS_CHANGED',
        entityType: 'staff',
        entityId: userId,
        details: `User status changed to ${isActive ? 'ACTIVE' : 'INACTIVE'}`,
      });
    }
  }

  // --- Leads ---
  async getLeads(): Promise<Lead[]> {
    return [...this.leads];
  }

  async createLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    this.saveToStorage();
    return newLead;
  }

  async updateLeadStage(leadId: string, stage: Lead['stage']): Promise<void> {
    const lead = this.leads.find((l) => l.id === leadId);
    if (lead) {
      lead.stage = stage;
      this.saveToStorage();
    }
  }

  // --- Quotes ---
  async getQuotes(): Promise<Quotation[]> {
    return [...this.quotes];
  }

  async getQuoteById(id: string): Promise<Quotation | null> {
    return this.quotes.find((q) => q.id === id || q.quoteNumber === id) || null;
  }

  async createQuote(quoteData: Omit<Quotation, 'id' | 'createdAt'>): Promise<Quotation> {
    const newQuote: Quotation = {
      ...quoteData,
      id: `qte-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.quotes.unshift(newQuote);
    this.saveToStorage();
    await this.logAuditEvent({
      actorId: this.currentUser?.id || 'sys',
      actorName: this.currentUser?.name || 'System',
      actorRole: this.currentUser?.role || 'sales_manager',
      action: 'QUOTE_CREATED',
      entityType: 'quote',
      entityId: newQuote.quoteNumber,
      details: `Quote ${newQuote.quoteNumber} generated for ${newQuote.customerName} (${newQuote.originCity} -> ${newQuote.destinationCity}) Total: ₹${newQuote.pricing.totalAmount}`,
    });
    return newQuote;
  }

  async updateQuoteStatus(quoteId: string, status: Quotation['status']): Promise<void> {
    const quote = this.quotes.find((q) => q.id === quoteId || q.quoteNumber === quoteId);
    if (quote) {
      quote.status = status;
      this.saveToStorage();
      await this.logAuditEvent({
        actorId: this.currentUser?.id || 'sys',
        actorName: this.currentUser?.name || 'Customer',
        actorRole: this.currentUser?.role || 'customer',
        action: 'QUOTE_STATUS_CHANGED',
        entityType: 'quote',
        entityId: quote.quoteNumber,
        details: `Quote status updated to ${status.toUpperCase()}`,
      });
    }
  }

  async createChangeRequest(originalQuoteId: string, additionalServicesDesc: string, additionalAmount: number): Promise<Quotation> {
    const original = await this.getQuoteById(originalQuoteId);
    if (!original) throw new Error('Original quote not found');

    const revNumber = (original.revisionNumber || 1) + 1;
    const newSubTotal = original.pricing.subTotal + additionalAmount;
    const newDiscount = Math.round(newSubTotal * 0.05);
    const newGst = Math.round((newSubTotal - newDiscount) * 0.18);
    const newTotal = newSubTotal - newDiscount + newGst;

    const revisedQuote: Quotation = {
      ...original,
      id: `qte-rev-${Date.now()}`,
      quoteNumber: `${original.quoteNumber}-R${revNumber}`,
      isChangeRequest: true,
      originalQuoteId: original.id,
      revisionNumber: revNumber,
      changeRequestNotes: additionalServicesDesc,
      status: 'change_requested',
      pricing: {
        ...original.pricing,
        subTotal: newSubTotal,
        discount: newDiscount,
        gstAmount: newGst,
        totalAmount: newTotal,
        balanceAmount: newTotal - original.pricing.paidAmount,
      },
      createdAt: new Date().toISOString(),
    };

    this.quotes.unshift(revisedQuote);
    this.saveToStorage();
    return revisedQuote;
  }

  // --- Bookings & Moves ---
  async getBookings(): Promise<MoveSpecification[]> {
    return [...this.bookings];
  }

  async getBookingById(bookingId: string): Promise<MoveSpecification | null> {
    return (
      this.bookings.find(
        (b) => b.bookingId.toLowerCase() === bookingId.toLowerCase() || b.id === bookingId
      ) || null
    );
  }

  async createBookingFromQuote(quoteId: string, initialAdvancePaid: number = 0): Promise<MoveSpecification> {
    const quote = await this.getQuoteById(quoteId);
    if (!quote) throw new Error('Quote not found');

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `DCM-2026-${randomSuffix}`;

    const newBooking: MoveSpecification = {
      id: `move-${Date.now()}`,
      bookingId,
      customerId: quote.customerId || this.currentUser?.id || 'usr-cust-new',
      customerName: quote.customerName,
      customerPhone: quote.customerPhone,
      customerEmail: quote.customerEmail,
      moveType: quote.moveType,
      movingDate: quote.movingDate,
      origin: {
        address: `${quote.originCity} Central Residence`,
        city: quote.originCity,
        state: 'Punjab / UT',
        pincode: '160001',
        propertyType: 'Apartment',
        floorNumber: 2,
        hasLift: true,
        liftType: 'passenger',
        stairsCarryRequired: false,
        parkingDistanceMeters: 20,
        societyPermissionRequired: false,
      },
      destination: {
        address: `${quote.destinationCity} Destination Residence`,
        city: quote.destinationCity,
        state: 'Delhi / NCR',
        pincode: '110001',
        propertyType: 'Apartment',
        floorNumber: 1,
        hasLift: true,
        liftType: 'passenger',
        stairsCarryRequired: false,
        parkingDistanceMeters: 20,
        societyPermissionRequired: true,
        societyPermissionStatus: 'pending',
      },
      packingPreference: 'dcm_full',
      deliveryType: 'door_delivery',
      destinationSetup: 'full_setup',
      storageOption: 'none',
      inventory: INITIAL_INVENTORY.slice(0, 6),
      pricing: {
        ...quote.pricing,
        paidAmount: initialAdvancePaid,
        balanceAmount: quote.pricing.totalAmount - initialAdvancePaid,
      },
      currentStage: 'booking_confirmed',
      stages: INITIAL_STAGES.map((s) => ({
        ...s,
        status: s.stageKey === 'booking_confirmed' ? 'completed' : 'pending',
        completedAt: s.stageKey === 'booking_confirmed' ? new Date().toISOString() : undefined,
      })),
      isDelayed: false,
      customerActionRequired: initialAdvancePaid === 0 ? 'Booking token advance payment pending' : null,
      assignedStaff: {
        moveManagerName: 'Vikram Joshi (Senior Move Coordinator)',
        moveManagerPhone: '+91 98888 77777',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    quote.status = 'booked';
    this.bookings.unshift(newBooking);

    if (initialAdvancePaid > 0) {
      this.payments.unshift({
        id: `pay-${Date.now()}`,
        bookingId: newBooking.bookingId,
        receiptNumber: `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: initialAdvancePaid,
        type: 'advance',
        method: 'upi',
        status: 'paid',
        transactionRef: `UPI/${Date.now()}`,
        paidAt: new Date().toISOString(),
        notes: 'Initial booking advance payment',
      });
    }

    this.saveToStorage();
    await this.logAuditEvent({
      actorId: this.currentUser?.id || 'sys',
      actorName: this.currentUser?.name || 'Customer',
      actorRole: this.currentUser?.role || 'customer',
      action: 'BOOKING_CREATED',
      entityType: 'booking',
      entityId: newBooking.bookingId,
      details: `New booking ${newBooking.bookingId} created for ${newBooking.customerName}`,
    });

    return newBooking;
  }

  async updateMoveStage(bookingId: string, newStage: MoveStageKey, notes?: string, staffName?: string): Promise<void> {
    const booking = await this.getBookingById(bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.currentStage = newStage;
    booking.updatedAt = new Date().toISOString();

    const stageIndex = booking.stages.findIndex((s) => s.stageKey === newStage);
    if (stageIndex >= 0) {
      // Mark all previous stages completed
      for (let i = 0; i <= stageIndex; i++) {
        if (booking.stages[i].status !== 'completed') {
          booking.stages[i].status = 'completed';
          booking.stages[i].completedAt = new Date().toISOString();
          booking.stages[i].completedBy = staffName || this.currentUser?.name || 'Operations';
        }
      }
      booking.stages[stageIndex].status = 'current';
      if (notes) booking.stages[stageIndex].description = notes;
    }

    this.saveToStorage();
    await this.logAuditEvent({
      actorId: this.currentUser?.id || 'staff',
      actorName: staffName || this.currentUser?.name || 'Staff',
      actorRole: this.currentUser?.role || 'operations_manager',
      action: 'MOVE_STAGE_UPDATED',
      entityType: 'booking',
      entityId: booking.bookingId,
      details: `Move stage transitioned to ${newStage.toUpperCase()}${notes ? ': ' + notes : ''}`,
    });
  }

  async setMoveDelayStatus(bookingId: string, isDelayed: boolean, reason?: string, nextUpdate?: string): Promise<void> {
    const booking = await this.getBookingById(bookingId);
    if (!booking) return;

    booking.isDelayed = isDelayed;
    booking.delayReason = reason;
    booking.updatedAt = new Date().toISOString();

    const currentStageRecord = booking.stages.find((s) => s.stageKey === booking.currentStage);
    if (currentStageRecord) {
      currentStageRecord.isDelayed = isDelayed;
      currentStageRecord.delayedReason = reason;
      currentStageRecord.nextExpectedStep = nextUpdate;
    }

    this.saveToStorage();
  }

  async assignMoveStaff(bookingId: string, staffData: MoveSpecification['assignedStaff']): Promise<void> {
    const booking = await this.getBookingById(bookingId);
    if (!booking) return;
    booking.assignedStaff = { ...booking.assignedStaff, ...staffData };
    booking.updatedAt = new Date().toISOString();
    this.saveToStorage();
  }

  async completeDigitalPOD(bookingId: string, podData: MoveSpecification['proofOfDelivery']): Promise<void> {
    const booking = await this.getBookingById(bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.proofOfDelivery = podData;
    booking.currentStage = 'pod_completed';
    booking.updatedAt = new Date().toISOString();

    await this.updateMoveStage(bookingId, 'pod_completed', `Digital POD signed by ${podData?.receiverName}`);
    await this.updateMoveStage(bookingId, 'move_completed', 'Move Completed successfully');
  }

  async setCustomerAction(bookingId: string, actionText: string | null): Promise<void> {
    const booking = await this.getBookingById(bookingId);
    if (booking) {
      booking.customerActionRequired = actionText;
      booking.updatedAt = new Date().toISOString();
      this.saveToStorage();
    }
  }

  // --- Surveys ---
  async getSurveys(): Promise<Survey[]> {
    return [...this.surveys];
  }

  async requestSurvey(surveyData: Omit<Survey, 'id'>): Promise<Survey> {
    const newSurvey: Survey = {
      ...surveyData,
      id: `srv-${Date.now()}`,
    };
    this.surveys.unshift(newSurvey);
    this.saveToStorage();
    return newSurvey;
  }

  async assignSurveyor(surveyId: string, surveyorId: string, surveyorName: string): Promise<void> {
    const survey = this.surveys.find((s) => s.id === surveyId);
    if (survey) {
      survey.surveyorId = surveyorId;
      survey.surveyorName = surveyorName;
      survey.status = 'assigned';
      this.saveToStorage();
    }
  }

  async submitSurveyReport(surveyId: string, assessmentNotes: string, photos: string[]): Promise<void> {
    const survey = this.surveys.find((s) => s.id === surveyId);
    if (survey) {
      survey.assessmentNotes = assessmentNotes;
      survey.photos = photos;
      survey.status = 'completed';
      survey.submittedAt = new Date().toISOString();
      this.saveToStorage();
    }
  }

  // --- Payments ---
  async getPaymentsByBooking(bookingId: string): Promise<PaymentTransaction[]> {
    return this.payments.filter((p) => p.bookingId.toLowerCase() === bookingId.toLowerCase());
  }

  async recordPayment(paymentData: Omit<PaymentTransaction, 'id' | 'paidAt'>): Promise<PaymentTransaction> {
    const newPayment: PaymentTransaction = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      paidAt: new Date().toISOString(),
    };
    this.payments.unshift(newPayment);

    // Update booking balance
    const booking = await this.getBookingById(paymentData.bookingId);
    if (booking) {
      booking.pricing.paidAmount += paymentData.amount;
      booking.pricing.balanceAmount = Math.max(0, booking.pricing.totalAmount - booking.pricing.paidAmount);
      booking.updatedAt = new Date().toISOString();
      if (booking.pricing.balanceAmount === 0 && booking.customerActionRequired?.includes('Payment')) {
        booking.customerActionRequired = null;
      }
    }

    this.saveToStorage();
    await this.logAuditEvent({
      actorId: this.currentUser?.id || 'sys',
      actorName: this.currentUser?.name || 'System',
      actorRole: this.currentUser?.role || 'accounts',
      action: 'PAYMENT_RECORDED',
      entityType: 'payment',
      entityId: newPayment.receiptNumber,
      details: `Payment of ₹${newPayment.amount} recorded for ${newPayment.bookingId} via ${newPayment.method}`,
    });

    return newPayment;
  }

  // --- Fleet & Warehouses ---
  async getVehicles(): Promise<Vehicle[]> {
    return [...this.vehicles];
  }

  async getWarehouses(): Promise<Warehouse[]> {
    return [...this.warehouses];
  }

  // --- Support & Claims ---
  async getSupportTickets(customerId?: string): Promise<SupportTicket[]> {
    if (customerId) {
      return this.supportTickets.filter((t) => t.customerEmail === customerId || t.bookingId === customerId);
    }
    return [...this.supportTickets];
  }

  async createSupportTicket(ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.supportTickets.unshift(newTicket);
    this.saveToStorage();
    return newTicket;
  }

  async addTicketMessage(ticketId: string, message: { sender: 'customer' | 'support'; senderName: string; text: string }): Promise<void> {
    const ticket = this.supportTickets.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.messages.push({
        ...message,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
      ticket.updatedAt = new Date().toISOString();
      this.saveToStorage();
    }
  }

  async updateTicketStatus(ticketId: string, status: SupportTicket['status']): Promise<void> {
    const ticket = this.supportTickets.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
      ticket.updatedAt = new Date().toISOString();
      this.saveToStorage();
    }
  }

  async getClaims(customerId?: string): Promise<DamageClaim[]> {
    if (customerId) {
      return this.claims.filter((c) => c.customerPhone === customerId || c.bookingId === customerId);
    }
    return [...this.claims];
  }

  async submitDamageClaim(claimData: Omit<DamageClaim, 'id' | 'claimNumber' | 'status' | 'submittedAt'>): Promise<DamageClaim> {
    const count = this.claims.length + 1;
    const newClaim: DamageClaim = {
      ...claimData,
      id: `clm-${Date.now()}`,
      claimNumber: `CLM-2026-00${count}`,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    this.claims.unshift(newClaim);
    this.saveToStorage();
    await this.logAuditEvent({
      actorId: this.currentUser?.id || 'sys',
      actorName: this.currentUser?.name || claimData.customerName,
      actorRole: 'customer',
      action: 'CLAIM_SUBMITTED',
      entityType: 'claim',
      entityId: newClaim.claimNumber,
      details: `Damage claim of ₹${newClaim.estimatedClaimAmount} submitted for ${newClaim.bookingId}`,
    });
    return newClaim;
  }

  async updateClaimDecision(claimId: string, status: DamageClaim['status'], notes: string, settlementAmount?: number): Promise<void> {
    const claim = this.claims.find((c) => c.id === claimId || c.claimNumber === claimId);
    if (claim) {
      claim.status = status;
      claim.adminDecisionNotes = notes;
      if (settlementAmount !== undefined) claim.approvedSettlementAmount = settlementAmount;
      if (status === 'settled') claim.settledAt = new Date().toISOString();
      this.saveToStorage();
      await this.logAuditEvent({
        actorId: this.currentUser?.id || 'admin',
        actorName: this.currentUser?.name || 'Claims Manager',
        actorRole: this.currentUser?.role || 'admin',
        action: 'CLAIM_DECISION_UPDATED',
        entityType: 'claim',
        entityId: claim.claimNumber,
        details: `Claim status changed to ${status.toUpperCase()}. Notes: ${notes}`,
      });
    }
  }

  // --- Audit Logs ---
  async getAuditLogs(): Promise<AuditLog[]> {
    return [...this.auditLogs];
  }

  async logAuditEvent(eventData: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> {
    const log: AuditLog = {
      ...eventData,
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    // Keep max 200 logs
    if (this.auditLogs.length > 200) {
      this.auditLogs = this.auditLogs.slice(0, 200);
    }
    this.saveToStorage();
  }
}
