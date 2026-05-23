import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "@/components/product/product-card";
import { CartProvider } from "@/components/store/cart-provider";
import { dictionaries } from "@/config/i18n";
import { products } from "@/services/catalog";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, ...rest } = props;
    return <span {...rest} />;
  },
}));

describe("ProductCard", () => {
  it("links t-shirt products to the product page for variant selection", () => {
    render(
      <CartProvider locale="pt">
        <ProductCard product={products[0]} locale="pt" dictionary={dictionaries.pt} />
      </CartProvider>,
    );

    expect(
      screen.getByRole("link", {
        name: dictionaries.pt.product.chooseVariant,
      }),
    ).toHaveAttribute("href", "/pt/product/sun-burst-tee");
  });
});
