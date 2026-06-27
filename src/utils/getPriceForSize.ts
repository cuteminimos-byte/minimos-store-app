
import type { PriceTier } from '@/components/ProductForm'; // adjust path


export function getPriceForSize(
  selectedSize: string | null,
  priceTiers: PriceTier[],
  basePrice: number
): number {
  if (!selectedSize || !priceTiers?.length) return basePrice;

  const matchingTier = priceTiers.find(tier =>
    tier.sizes.includes(selectedSize)
  );

  return matchingTier?.price
    ? parseFloat(matchingTier.price)
    : basePrice;
}
