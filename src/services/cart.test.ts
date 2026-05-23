import { describe, expect, it } from "vitest";
import { getVariant, validateCart } from "@/services/cart";

describe("cart helpers", () => {
  it("drops cart lines for missing products or variants", () => {
    const result = validateCart([
      { productId: "sun-burst", variantId: "sun-s-white", quantity: 1 },
      { productId: "missing-product", variantId: "missing-variant", quantity: 1 },
      { productId: "sun-burst", variantId: "missing-variant", quantity: 1 },
    ]);

    expect(result).toEqual([{ productId: "sun-burst", variantId: "sun-s-white", quantity: 1 }]);
  });

  it("clamps quantities to available stock", () => {
    const variant = getVariant("sun-burst", "sun-s-white");
    expect(variant).toBeDefined();

    const result = validateCart([
      { productId: "sun-burst", variantId: "sun-s-white", quantity: 99 },
    ]);

    expect(result).toEqual([
      { productId: "sun-burst", variantId: "sun-s-white", quantity: variant?.stock },
    ]);
  });
});
