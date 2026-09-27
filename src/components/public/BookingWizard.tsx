import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Building,
  Home,
  Truck,
  Package,
  Layers,
  Wrench,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Clock,
  Sparkles,
  Plus,
  Minus,
} from 'lucide-react';
import {
  DeliveryType,
  DestinationSetupOption,
  InventoryItem,
  MovePricingBreakdown,
  MoveType,
  PackingPreference,
  PropertyAccessDetails,
} from '../../types';
import { QuotationEngine } from '../../services/quotationEngine';
import { backend } from '../../services/backend';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    fromCity?: string;
    toCity?: string;
    movingDate?: string;
    moveType?: MoveType;
  };
  onBookingCreated: (bookingId: string) => void;
}

const COMMON_INVENTORY_PRESETS: Array<Omit<InventoryItem, 'id' | 'lifecycleStatus'>> = [
  { name: 'King Size Storage Bed', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 65, roomPlacement: 'Bedroom' },
  { name: 'Queen Size Wooden Bed', category: 'Furniture', quantity: 1, isFragile: false, isValuable: false, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 50, roomPlacement: 'Bedroom' },
  { name: '3-Seater Living Room Sofa', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 45, roomPlacement: 'Living Room' },
  { name: 'L-Shaped 6-Seater Sofa Set', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 80, roomPlacement: 'Living Room' },
  { name: '55"-65" Smart LED TV', category: 'Electronics', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Special wooden crate with bubble wrap', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 18, roomPlacement: 'Living Room' },
  { name: 'Double Door Refrigerator (350-450L)', category: 'Appliances', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Upright transport with corrugated board', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 40, roomPlacement: 'Kitchen' },
  { name: 'Automatic Washing Machine (Front/Top Load)', category: 'Appliances', quantity: 1, isFragile: true, isValuable: true, specialHandlingNotes: 'Transit bolts supplied by DCM', packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 22, roomPlacement: 'Balcony' },
  { name: '6-Seater Dining Table & Chairs', category: 'Furniture', quantity: 1, isFragile: true, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 55, roomPlacement: 'Living Room' },
  { name: '4-Door Wooden Wardrobe', category: 'Furniture', quantity: 1, isFragile: false, isValuable: true, packingRequired: 'dcm', dismantlingRequired: true, reassemblyRequired: true, volumeCft: 75, roomPlacement: 'Bedroom' },
  { name: 'Crockery & Kitchenware Cartons', category: 'Fragile', quantity: 4, isFragile: true, isValuable: true, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 32, roomPlacement: 'Kitchen' },
  { name: 'Clothes & Linen Box Cartons', category: 'Boxes', quantity: 6, isFragile: false, isValuable: false, packingRequired: 'customer', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 48, roomPlacement: 'Bedroom' },
  { name: 'Study Table & Office Chair', category: 'Furniture', quantity: 1, isFragile: false, isValuable: false, packingRequired: 'dcm', dismantlingRequired: false, reassemblyRequired: false, volumeCft: 25, roomPlacement: 'Study / Office' },
];

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  initialData,
  onBookingCreated,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6; // Compacted into 6 rich, logical wizard screens

  // Form State
  const [moveType, setMoveType] = useState<MoveType>(initialData?.moveType || 'home');
  const [movingDate, setMovingDate] = useState(initialData?.movingDate || '2026-10-05');

  // Customer Contact
  const [customerName, setCustomerName] = useState('Rahul Swami');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerEmail, setCustomerEmail] = useState('rahul.swami8185@gmail.com');

  // Origin Property
  const [origin, setOrigin] = useState<PropertyAccessDetails>({
    address: 'House #412, Sector 35-C',
    city: initialData?.fromCity || 'Chandigarh',
    state: 'Punjab / UT',
    pincode: '160035',
    propertyType: 'Independent Villa',
    floorNumber: 1,
    hasLift: false,
    liftType: 'none',
    stairsCarryRequired: true,
    parkingDistanceMeters: 20,
    societyPermissionRequired: false,
    movingTimeRestrictions: '',
  });

  // Destination Property
  const [destination, setDestination] = useState<PropertyAccessDetails>({
    address: 'Flat 402, Block B, Silver Palms Heights, Vasant Vihar',
    city: initialData?.toCity || 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110057',
    propertyType: 'Apartment',
    floorNumber: 4,
    hasLift: true,
    liftType: 'service',
    stairsCarryRequired: false,
    parkingDistanceMeters: 15,
    societyPermissionRequired: true,
    movingTimeRestrictions: '9:00 AM - 6:00 PM',
  });

  // Service preferences
  const [packingPreference, setPackingPreference] = useState<PackingPreference>('dcm_full');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('door_delivery');
  const [destinationSetup, setDestinationSetup] = useState<DestinationSetupOption>('full_setup');

  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    COMMON_INVENTORY_PRESETS.slice(0, 7).map((p, idx) => ({
      ...p,
      id: `wiz-inv-${idx + 1}`,
      lifecycleStatus: 'not_packed',
    }))
  );

  // Dismantling & Reassembly specifics
  const [dismantleBed, setDismantleBed] = useState(true);
  const [dismantleWardrobe, setDismantleWardrobe] = useState(true);
  const [dismantleDining, setDismantleDining] = useState(true);
  const [reassembleAtDest, setReassembleAtDest] = useState(true);

  // Storage
  const [needsStorage, setNeedsStorage] = useState(false);
  const [storageDays, setStorageDays] = useState(7);

  // Pricing calculation
  const calculatedPricing: MovePricingBreakdown = React.useMemo(() => {
    const approxDist =
      origin.city.toLowerCase().includes('chandigarh') && destination.city.toLowerCase().includes('delhi')
        ? 250
        : origin.city.toLowerCase().includes('delhi') && destination.city.toLowerCase().includes('bangalore')
        ? 2100
        : 350;

    const dismantlingCount = (dismantleBed ? 1 : 0) + (dismantleWardrobe ? 1 : 0) + (dismantleDining ? 1 : 0);
    const reassemblyCount = reassembleAtDest ? dismantlingCount : 0;

    return QuotationEngine.calculate({
      moveType,
      approxDistanceKm: approxDist,
      originFloor: origin.floorNumber,
      originHasLift: origin.hasLift,
      destinationFloor: destination.floorNumber,
      destinationHasLift: destination.hasLift,
      packingPreference,
      inventory,
      originCarryDistanceMeters: origin.parkingDistanceMeters,
      destinationCarryDistanceMeters: destination.parkingDistanceMeters,
      dismantlingItemCount: dismantlingCount,
      reassemblyItemCount: reassemblyCount,
      storageDays: needsStorage ? storageDays : 0,
      requiresSpecialHandling: inventory.some((i) => i.isFragile),
    });
  }, [
    origin,
    destination,
    moveType,
    packingPreference,
    inventory,
    dismantleBed,
    dismantleWardrobe,
    dismantleDining,
    reassembleAtDest,
    needsStorage,
    storageDays,
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddPresetItem = (preset: (typeof COMMON_INVENTORY_PRESETS)[0]) => {
    const existingIndex = inventory.findIndex((i) => i.name === preset.name);
    if (existingIndex >= 0) {
      const updated = [...inventory];
      updated[existingIndex].quantity += 1;
      setInventory(updated);
    } else {
      setInventory([
        ...inventory,
        {
          ...preset,
          id: `wiz-inv-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
          lifecycleStatus: 'not_packed',
        },
      ]);
    }
  };

  const handleUpdateItemQty = (id: string, delta: number) => {
    setInventory((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as InventoryItem[]
    );
  };

  const handleConfirmBooking = async (payAdvance: boolean) => {
    setIsSubmitting(true);
    try {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const bookingId = `DCM-2026-${randomSuffix}`;

      // Create authoritative quote first
      const quote = await backend.createQuote({
        quoteNumber: `QTE-DCM-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: 'usr-cust-1',
        customerName,
        customerEmail,
        customerPhone,
        moveType,
        movingDate,
        originCity: origin.city,
        destinationCity: destination.city,
        approxDistanceKm: 250,
        estimatedVolumeCft: inventory.reduce((s, i) => s + i.volumeCft * i.quantity, 0),
        pricing: calculatedPricing,
        includedServices: [
          'Weather-proof Container Transport',
          'Professional 4-layer DCM Packing',
          'Loading & Unloading by Certified Crew',
          'Furniture Dismantling & Reassembly',
          'Transit Insurance Coverage up to ₹5,00,000',
          'Dedicated Move Manager with WhatsApp updates',
          'Room-wise placement at destination',
        ],
        excludedServices: ['Wall drilling for TVs/mirrors', 'Electrical appliance AC installation'],
        paymentSchedule: {
          advancePercentage: 20,
          advanceDue: Math.round(calculatedPricing.totalAmount * 0.2),
          loadingPercentage: 60,
          loadingDue: Math.round(calculatedPricing.totalAmount * 0.6),
          deliveryPercentage: 20,
          deliveryDue: Math.round(calculatedPricing.totalAmount * 0.2),
        },
        validityDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        status: 'booked',
      });

      const initialAdvance = payAdvance ? Math.round(calculatedPricing.totalAmount * 0.2) : 0;
      const booking = await backend.createBookingFromQuote(quote.id, initialAdvance);

      setGeneratedBookingId(booking.bookingId);
      setIsSubmitting(false);
      onBookingCreated(booking.bookingId);
    } catch (err) {
      console.error('Failed to create booking', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 font-extrabold">
              {currentStep}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>DCM Smart Move &amp; Quotation Engine</span>
                <span className="text-[11px] font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">
                  Step {currentStep} of {totalSteps}
                </span>
              </h2>
              <p className="text-xs text-blue-200">
                Authoritative relocation estimate with item-level accuracy &amp; zero hidden charges.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-orange-500 h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Wizard Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {generatedBookingId ? (
            /* Booking Confirmation Success Screen */
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-blue-950">Move Booking Confirmed!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Your move has been reserved with DCM Packers &amp; Movers. A Move Coordinator has been assigned to your booking.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono font-bold text-orange-600 text-sm">{generatedBookingId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Moving Date:</span>
                  <span className="font-bold text-slate-800">{movingDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-800">{origin.city} → {destination.city}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-200 pt-2">
                  <span className="text-slate-700 font-bold">Total Fixed Estimate:</span>
                  <span className="font-bold text-blue-950 text-base">₹{calculatedPricing.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  onClick={onClose}
                  className="btn-3d-orange px-6 py-2.5 text-sm"
                >
                  Track This Move Now
                </button>
              </div>
            </div>
          ) : currentStep === 1 ? (
            /* STEP 1: Move Type & Locations */
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 1 — Move Type &amp; Moving Date</h3>
                <p className="text-xs text-slate-500">Select what you are moving and your preferred schedule.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'home', icon: Home, label: 'Household Shifting', desc: '1BHK, 2BHK, 3BHK, Villa' },
                  { id: 'office', icon: Building, label: 'Office Relocation', desc: 'Desks, Servers, Partitions' },
                  { id: 'vehicle', icon: Truck, label: 'Vehicle Carrier', desc: 'Cars & Bikes' },
                  { id: 'storage', icon: Package, label: 'Storage & Warehouse', desc: 'Secure monthly warehousing' },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = moveType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setMoveType(type.id as MoveType)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-blue-900 bg-blue-50/70 ring-2 ring-blue-900/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-900' : 'text-slate-500'}`} />
                      <div className="font-bold text-xs text-slate-900">{type.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{type.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origin City</label>
                  <input
                    type="text"
                    value={origin.city}
                    onChange={(e) => setOrigin({ ...origin, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                    placeholder="Chandigarh"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    value={destination.city}
                    onChange={(e) => setDestination({ ...destination, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                    placeholder="New Delhi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Moving Date</label>
                  <input
                    type="date"
                    value={movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 2 ? (
            /* STEP 2: Property Access & Floor Details (Sections 22, Step 4 & 5) */
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 2 — Pickup &amp; Destination Property Access</h3>
                <p className="text-xs text-slate-500">Floor level, lift availability and carry distance determine labour planning.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Pickup Access */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-950 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <span>Pickup Property ({origin.city})</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Floor Level</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={origin.floorNumber}
                        onChange={(e) => setOrigin({ ...origin, floorNumber: Number(e.target.value) })}
                        className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        <option value={0}>Ground Floor</option>
                        <option value={1}>1st Floor</option>
                        <option value={2}>2nd Floor</option>
                        <option value={3}>3rd Floor</option>
                        <option value={4}>4th Floor or higher</option>
                      </select>
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer ml-2">
                        <input
                          type="checkbox"
                          checked={origin.hasLift}
                          onChange={(e) => setOrigin({ ...origin, hasLift: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Lift Available?</span>
                      </label>
                    </div>
                  </div>

                  {origin.hasLift && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Lift Type</label>
                      <select
                        value={origin.liftType}
                        onChange={(e) => setOrigin({ ...origin, liftType: e.target.value as any })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        <option value="passenger">Passenger Lift</option>
                        <option value="service">Service / Goods Lift</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Truck Parking to Entry Distance: {origin.parkingDistanceMeters}m
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={origin.parkingDistanceMeters}
                      onChange={(e) => setOrigin({ ...origin, parkingDistanceMeters: Number(e.target.value) })}
                      className="w-full accent-orange-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Close (&lt;20m)</span>
                      <span>Moderate (50m)</span>
                      <span>Far (100m+)</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={origin.societyPermissionRequired}
                      onChange={(e) => setOrigin({ ...origin, societyPermissionRequired: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span>Society / Gated Community NOC Required</span>
                  </label>
                </div>

                {/* Destination Access */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-blue-950 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <span>Destination Property ({destination.city})</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Floor Level</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={destination.floorNumber}
                        onChange={(e) => setDestination({ ...destination, floorNumber: Number(e.target.value) })}
                        className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        <option value={0}>Ground Floor</option>
                        <option value={1}>1st Floor</option>
                        <option value={2}>2nd Floor</option>
                        <option value={3}>3rd Floor</option>
                        <option value={4}>4th Floor or higher</option>
                      </select>
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer ml-2">
                        <input
                          type="checkbox"
                          checked={destination.hasLift}
                          onChange={(e) => setDestination({ ...destination, hasLift: e.target.checked })}
                          className="rounded text-blue-600"
                        />
                        <span>Lift Available?</span>
                      </label>
                    </div>
                  </div>

                  {destination.hasLift && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Lift Type</label>
                      <select
                        value={destination.liftType}
                        onChange={(e) => setDestination({ ...destination, liftType: e.target.value as any })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        <option value="service">Service / Goods Lift</option>
                        <option value="passenger">Passenger Lift</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Truck Parking to Entry Distance: {destination.parkingDistanceMeters}m
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={destination.parkingDistanceMeters}
                      onChange={(e) => setDestination({ ...destination, parkingDistanceMeters: Number(e.target.value) })}
                      className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Close (&lt;20m)</span>
                      <span>Moderate (50m)</span>
                      <span>Far (100m+)</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={destination.societyPermissionRequired}
                      onChange={(e) => setDestination({ ...destination, societyPermissionRequired: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span>Destination Society NOC Required</span>
                  </label>
                </div>
              </div>
            </div>
          ) : currentStep === 3 ? (
            /* STEP 3: Packing & Dismantling Options (Sections 23, 24, 25, 26, 27) */
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 3 — Packing &amp; Furniture Handling Preferences</h3>
                <p className="text-xs text-slate-500">Configure who packs and who dismantles &amp; reassembles furniture.</p>
              </div>

              {/* Who Packs Goods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Who will pack the goods? (Section 23)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'dcm_full', label: 'DCM packs everything', desc: '4-layer bubble, foam & cartons by certified team' },
                    { id: 'partial', label: 'DCM packs selected items', desc: 'Fragile/electronics by DCM, clothes by customer' },
                    { id: 'customer_full', label: 'Customer packs everything', desc: 'Goods ready in cartons before DCM truck arrives' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackingPreference(p.id as PackingPreference)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        packingPreference === p.id
                          ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-900/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{p.label}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dismantling & Reassembly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="font-bold text-xs uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-orange-500" />
                    <span>Dismantling at Origin (Section 24)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dismantleBed}
                        onChange={(e) => setDismantleBed(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Bed Dismantling (King / Queen with storage)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dismantleWardrobe}
                        onChange={(e) => setDismantleWardrobe(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Wardrobe Dismantling (3 or 4-door modular)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dismantleDining}
                        onChange={(e) => setDismantleDining(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Dining Table Glass &amp; Leg Disassembly</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="font-bold text-xs uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <span>Reassembly at Destination (Section 25)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Reassembly is strictly managed as a distinct service from dismantling.
                  </p>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reassembleAtDest}
                      onChange={(e) => setReassembleAtDest(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>DCM crew should reassemble furniture at destination</span>
                  </label>
                </div>
              </div>

              {/* Delivery Type (Section 26) */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Delivery Type (Section 26)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('door_delivery')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === 'door_delivery'
                        ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-900/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Door Delivery (Standard)</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Direct transport into destination residence</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('self_pickup')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryType === 'self_pickup'
                        ? 'border-blue-900 bg-blue-50/80 ring-2 ring-blue-900/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Self Pickup at DCM Warehouse</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Collect from approved city facility</div>
                  </button>
                </div>
              </div>
            </div>
          ) : currentStep === 4 ? (
            /* STEP 4: Inventory Selection (Sections 28, 29) */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 4 — Move Inventory &amp; Room-wise Placement</h3>
                  <p className="text-xs text-slate-500">
                    Add your major furniture and boxes. Volume in CFT is calculated in real-time.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500">Total Volume: </span>
                  <span className="text-sm font-black text-blue-950">
                    {inventory.reduce((sum, i) => sum + i.volumeCft * i.quantity, 0)} CFT
                  </span>
                </div>
              </div>

              {/* Quick Add Presets */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-700">Quick-Add Common Items:</span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_INVENTORY_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPresetItem(p)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:border-orange-500 hover:text-orange-600 transition-colors shadow-2xs"
                    >
                      <Plus className="w-3 h-3 text-orange-500" />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Inventory Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-semibold sticky top-0">
                    <tr>
                      <th className="py-2 px-3">Item Name</th>
                      <th className="py-2 px-3">Room Placement</th>
                      <th className="py-2 px-3 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {item.name}
                          {item.isFragile && (
                            <span className="ml-1.5 text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                              Fragile
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <select
                            value={item.roomPlacement}
                            onChange={(e) => {
                              const updated = inventory.map((i) =>
                                i.id === item.id ? { ...i, roomPlacement: e.target.value as any } : i
                              );
                              setInventory(updated);
                            }}
                            className="bg-transparent border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700"
                          >
                            <option value="Bedroom">Bedroom</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Study / Office">Study / Office</option>
                            <option value="Balcony">Balcony</option>
                          </select>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateItemQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateItemQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right text-slate-500 font-mono">
                          {item.volumeCft * item.quantity} CFT
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : currentStep === 5 ? (
            /* STEP 5: Storage & Contact Details */
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 5 — Optional Storage &amp; Customer Contact</h3>
                <p className="text-xs text-slate-500">Provide contact details to receive your official quotation document.</p>
              </div>

              {/* Warehousing Option (Section 43) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">Need DCM Secure Storage / Warehousing?</div>
                      <div className="text-[11px] text-slate-500">24x7 CCTV, climate-controlled, pest-free storage vault</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsStorage}
                      onChange={(e) => setNeedsStorage(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                {needsStorage && (
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700">Duration (Days):</span>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={storageDays}
                      onChange={(e) => setStorageDays(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                    />
                    <span className="text-xs text-slate-500">at ₹45/day per 100 CFT</span>
                  </div>
                )}
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (+91)</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-semibold focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* STEP 6: Transparent Quotation & Confirmation (Section 33) */
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Step 6 — Transparent Quotation Breakdown</h3>
                <p className="text-xs text-slate-500">
                  Every rupee accounted for. Certified pricing with zero hidden surcharges on moving day.
                </p>
              </div>

              {/* Line-item transparent invoice */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 font-semibold text-slate-600">
                  <span>Service Component</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700">
                  <span>Weather-proof Container Transportation ({origin.city} → {destination.city})</span>
                  <span className="font-mono">₹{calculatedPricing.baseTransportation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700">
                  <span>Professional 4-Layer Packing ({packingPreference === 'dcm_full' ? 'Full DCM' : 'Custom'})</span>
                  <span className="font-mono">₹{calculatedPricing.packingCharges.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700">
                  <span>Loading &amp; Unloading Certified Labour</span>
                  <span className="font-mono">₹{(calculatedPricing.loadingCharges + calculatedPricing.unloadingCharges).toLocaleString()}</span>
                </div>
                {calculatedPricing.floorCharges > 0 && (
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>Staircase / Non-lift Floor Carry Surcharge</span>
                    <span className="font-mono">₹{calculatedPricing.floorCharges.toLocaleString()}</span>
                  </div>
                )}
                {calculatedPricing.dismantlingCharges > 0 && (
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>Furniture Dismantling Charges</span>
                    <span className="font-mono">₹{calculatedPricing.dismantlingCharges.toLocaleString()}</span>
                  </div>
                )}
                {calculatedPricing.reassemblyCharges > 0 && (
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>Furniture Reassembly at Destination</span>
                    <span className="font-mono">₹{calculatedPricing.reassemblyCharges.toLocaleString()}</span>
                  </div>
                )}
                {calculatedPricing.storageCharges > 0 && (
                  <div className="flex justify-between py-1 text-slate-700">
                    <span>Secure Warehousing Storage ({storageDays} days)</span>
                    <span className="font-mono">₹{calculatedPricing.storageCharges.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-slate-700">
                  <span>Transit Insurance &amp; Risk Protection</span>
                  <span className="font-mono">₹{calculatedPricing.transitInsurance.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-500">
                  <span>Promotional Festive Discount (5%)</span>
                  <span className="font-mono text-emerald-600">-₹{calculatedPricing.discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Standard Logistics GST (18%)</span>
                  <span className="font-mono">₹{calculatedPricing.gstAmount.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-blue-900 pt-2 flex justify-between text-sm sm:text-base font-black text-blue-950">
                  <span>Total All-Inclusive Quotation</span>
                  <span className="font-mono text-orange-600">₹{calculatedPricing.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Schedule breakdown */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs">
                <div className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>DCM Fair Payment Milestone Schedule:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800">20% Booking Token:</span> ₹{Math.round(calculatedPricing.totalAmount * 0.2).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">60% On Loading:</span> ₹{Math.round(calculatedPricing.totalAmount * 0.6).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">20% On Delivery:</span> ₹{Math.round(calculatedPricing.totalAmount * 0.2).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleConfirmBooking(true)}
                  className="btn-3d-orange py-3 px-6 text-sm flex-1 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pay ₹{Math.round(calculatedPricing.totalAmount * 0.2).toLocaleString()} Advance &amp; Book Move</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleConfirmBooking(false)}
                  className="btn-3d-navy py-3 px-6 text-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Save Quote &amp; Book Later</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        {!generatedBookingId && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="btn-3d-navy text-xs px-5 py-2 inline-flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
