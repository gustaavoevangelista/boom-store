import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartPageClient } from "@/components/cart/cart-page-client";
import { CartProvider } from "@/components/store/cart-provider";
import { dictionaries } from "@/config/i18n";

describe("CartPageClient", () => {
  it("renders checkout as a disabled button when the cart is empty", () => {
    render(
      <CartProvider locale="pt">
        <CartPageClient locale="pt" dictionary={dictionaries.pt} />
      </CartProvider>,
    );

    expect(
      screen.getByRole("button", {
        name: dictionaries.pt.cart.checkout,
      }),
    ).toBeDisabled();
  });
});
