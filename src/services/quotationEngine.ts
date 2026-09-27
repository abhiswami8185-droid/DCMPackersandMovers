import { InventoryItem, MovePricingBreakdown, MoveType, PackingPreference } from '../types';

export interface QuotationCalculationInput {
  moveType: MoveType;
  approxDistanceKm: number;
  originFloor: number;
  originHasLift: boolean;
  destinationFloor: number;
  destinationHasLift: boolean;
  packingPreference: PackingPreference;
  inventory: InventoryItem[];
  originCarryDistanceMeters: number;
  destinationCarryDistanceMeters: number;
  dismantlingItemCount: number;
  reassemblyItemCount: number;
  storageDays?: number;
  requiresSpecialHandling?: boolean;
}

export class QuotationEngine {
  /**
   * Authoritative relocation pricing engine.
   * Works across both Mock and Firebase providers identically.
   */
  static calculate(input: QuotationCalculationInput): MovePricingBreakdown {
    // 1. Calculate total inventory volume in Cubic Feet (CFT)
    const totalVolumeCft = input.inventory.reduce((sum, item) => {
      return sum + (item.volumeCft || 10) * (item.quantity || 1);
    }, 0) || 120; // default minimum move volume if empty

    // 2. Base transportation rate based on distance & volume
    // Local move (< 50km) vs Inter-city / Domestic (> 50km)
    let baseTransportation = 0;
    if (input.approxDistanceKm <= 50) {
      baseTransportation = Math.max(3500, Math.round(totalVolumeCft * 14 + input.approxDistanceKm * 35));
    } else {
      // Long distance domestic relocation: based on truck capacity requirements
      const kmRate = totalVolumeCft > 450 ? 45 : 32;
      baseTransportation = Math.max(8500, Math.round(totalVolumeCft * 18 + input.approxDistanceKm * kmRate));
    }

    // 3. Packing charges (Labour + Material: multi-layer bubble, corrugated rolls, foam sheets, stretch film)
    let packingCharges = 0;
    if (input.packingPreference === 'dcm_full') {
      packingCharges = Math.round(totalVolumeCft * 9.5);
    } else if (input.packingPreference === 'partial') {
      const dcmItemsVolume = input.inventory
        .filter((i) => i.packingRequired === 'dcm')
        .reduce((sum, i) => sum + i.volumeCft * i.quantity, 0);
      packingCharges = Math.round(Math.max(1200, (dcmItemsVolume || totalVolumeCft * 0.4) * 11));
    } else {
      // Customer will pack
      packingCharges = 0;
    }

    // 4. Loading & Unloading Labour charges
    const loadingCharges = Math.max(1500, Math.round(totalVolumeCft * 4.5));
    const unloadingCharges = Math.max(1500, Math.round(totalVolumeCft * 4.5));

    // 5. Floor carry surcharge (if no lift is available)
    let floorCharges = 0;
    if (!input.originHasLift && input.originFloor > 0) {
      floorCharges += input.originFloor * 400;
    }
    if (!input.destinationHasLift && input.destinationFloor > 0) {
      floorCharges += input.destinationFloor * 400;
    }

    // 6. Long carry distance surcharge (beyond standard 30m parking radius)
    let longCarryCharges = 0;
    if (input.originCarryDistanceMeters > 30) {
      longCarryCharges += Math.round((input.originCarryDistanceMeters - 30) * 15);
    }
    if (input.destinationCarryDistanceMeters > 30) {
      longCarryCharges += Math.round((input.destinationCarryDistanceMeters - 30) * 15);
    }

    // 7. Dismantling & Reassembly charges (per item e.g. Bed, Wardrobe, Dining table)
    const dismantlingCharges = input.dismantlingItemCount * 500;
    const reassemblyCharges = input.reassemblyItemCount * 600;

    // 8. Storage charges (DCM secure warehousing: approx ₹45/day per 100 CFT)
    let storageCharges = 0;
    if (input.storageDays && input.storageDays > 0) {
      const dailyStorageRate = Math.max(150, Math.round((totalVolumeCft / 100) * 45));
      storageCharges = dailyStorageRate * input.storageDays;
    }

    // 9. Unpacking charges
    const unpackingCharges = input.packingPreference === 'dcm_full' ? Math.round(totalVolumeCft * 3.5) : 0;

    // 10. Special handling (pianos, heavy safes, fragile luxury artwork)
    const fragileCount = input.inventory.filter((i) => i.isFragile).length;
    const specialHandlingCharges = (input.requiresSpecialHandling ? 1500 : 0) + fragileCount * 250;

    // 11. Transit Insurance (Approx 1.5% of estimated goods valuation, minimum ₹800)
    const estimatedGoodsValuation = totalVolumeCft * 350;
    const transitInsurance = Math.max(800, Math.round(estimatedGoodsValuation * 0.015));

    // 12. Subtotal
    const subTotal =
      baseTransportation +
      packingCharges +
      loadingCharges +
      unloadingCharges +
      floorCharges +
      longCarryCharges +
      dismantlingCharges +
      reassemblyCharges +
      storageCharges +
      unpackingCharges +
      specialHandlingCharges +
      transitInsurance;

    // 13. Transparent festive / corporate promotional discount (5%)
    const discount = Math.round(subTotal * 0.05);

    // 14. Standard Indian Logistics Goods & Services Tax (GST 18%)
    const taxableAmount = subTotal - discount;
    const gstAmount = Math.round(taxableAmount * 0.18);

    // 15. Total Amount
    const totalAmount = taxableAmount + gstAmount;

    return {
      baseTransportation,
      packingCharges,
      loadingCharges,
      unloadingCharges,
      floorCharges,
      longCarryCharges,
      dismantlingCharges,
      reassemblyCharges,
      storageCharges,
      unpackingCharges,
      specialHandlingCharges,
      transitInsurance,
      subTotal,
      discount,
      gstAmount,
      totalAmount,
      paidAmount: 0,
      balanceAmount: totalAmount,
    };
  }
}
