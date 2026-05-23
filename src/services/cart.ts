import { type ProductVariant, products } from "@/services/catalog";
import type { CartLine } from "@/types/cart";

export type { CartLine };

export function getVariant(productId: string, variantId: string): ProductVariant | undefined {
  return products
    .find((product) => product.id === productId)
    ?.variants.find((variant) => variant.id === variantId);
}

export function getCartTotal(lines: CartLine[]) {
  return lines.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product?.price ?? 0) * line.quantity;
  }, 0);
}

export function validateCart(lines: CartLine[]) {
  return lines.flatMap((line) => {
    const variant = getVariant(line.productId, line.variantId);
    if (!variant || variant.stock < 1 || line.quantity < 1) return [];
    return [
      {
        ...line,
        quantity: Math.min(line.quantity, variant.stock),
      },
    ];
  });
}
