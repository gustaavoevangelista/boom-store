import { type ProductVariant, products } from "@/lib/catalog";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

export function getVariant(productId: string, variantId: string): ProductVariant | undefined {
  return products
    .find((product) => product.id === productId)
    ?.variants.find((v) => v.id === variantId);
}

export function getCartTotal(lines: CartLine[]) {
  return lines.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product?.price ?? 0) * line.quantity;
  }, 0);
}

export function validateCart(lines: CartLine[]) {
  return lines.filter((line) => {
    const variant = getVariant(line.productId, line.variantId);
    return variant && variant.stock > 0 && line.quantity > 0;
  });
}
